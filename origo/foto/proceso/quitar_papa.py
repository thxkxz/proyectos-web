"""Borra la papa larga de la foto original y rellena con LaMa (inpainting)."""
import sys
import numpy as np
import torch
from PIL import Image, ImageDraw, ImageFilter

foto, recorte, modelo, salida, salida_mascara = sys.argv[1:6]

img = Image.open(foto).convert("RGB")
W, H = img.size
alpha = np.asarray(Image.open(recorte))[..., 3] > 100

# Máscara de la papa larga
mask = np.zeros((H, W), bool)
# Tramo libre: debajo de la pila de papas, todo lo recortado a la derecha es la papa larga.
filas = np.arange(H)[:, None]
cols = np.arange(W)[None, :]
mask |= alpha & (filas > 2690) & (cols > 1880)
# Tramo de unión: detrás del extremo de la papa horizontal de adelante.
m = Image.new("L", (W, H), 0)
ImageDraw.Draw(m).polygon(
    [(2132, 2482), (2215, 2488), (2318, 2605), (2312, 2705), (2140, 2705), (2152, 2640), (2150, 2560)],
    fill=255)
mask |= np.asarray(m) > 0
mask_img = Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(41))
mask_img.save(salida_mascara)

# Recorte de trabajo alrededor de la papa (LaMa rinde mejor a resolución moderada).
x0, y0, x1, y1 = 1600, 2250, 2700, 3900
escala = 0.6
sub = img.crop((x0, y0, x1, y1))
sub_m = mask_img.crop((x0, y0, x1, y1))
w, h = int(sub.width * escala) // 8 * 8, int(sub.height * escala) // 8 * 8
t_img = torch.from_numpy(np.asarray(sub.resize((w, h), Image.LANCZOS))).permute(2, 0, 1)[None].float() / 255
t_m = (torch.from_numpy(np.asarray(sub_m.resize((w, h), Image.NEAREST)))[None, None].float() > 127).float()

lama = torch.jit.load(modelo, map_location="cpu").eval()
with torch.no_grad():
    res = lama(t_img, t_m)[0].permute(1, 2, 0).clamp(0, 1).numpy()
relleno = Image.fromarray((res * 255).astype(np.uint8)).resize(sub.size, Image.LANCZOS)

# Pegar solo dentro de la máscara (con borde suave) para conservar la resolución original fuera.
suave = sub_m.filter(ImageFilter.GaussianBlur(4))
sub.paste(relleno, (0, 0), suave)
img.paste(sub, (x0, y0))
img.save(salida, quality=96)
print("ok")
