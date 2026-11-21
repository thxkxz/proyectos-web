"""Reconstruye la tapa del pan con LaMa: quita el machucón y el borde roto."""
import sys
import numpy as np
import torch
from PIL import Image, ImageDraw, ImageFilter

foto, modelo, salida, salida_mascara = sys.argv[1:5]
img = Image.open(foto).convert("RGB")

# Polígonos en coordenadas de la foto original (3024x4032).
MACHUCON = [(945, 1160), (1000, 1060), (1225, 1068), (1550, 1085), (1655, 1135),
            (1655, 1262), (1500, 1328), (1225, 1328), (1150, 1300), (1150, 1405),
            (1050, 1405), (940, 1300)]
BORDE_ROTO = [(1090, 1398), (1480, 1428), (1480, 1490), (1090, 1484)]

m = Image.new("L", img.size, 0)
d = ImageDraw.Draw(m)
d.polygon(MACHUCON, fill=255)
d.polygon(BORDE_ROTO, fill=255)
m = m.filter(ImageFilter.MaxFilter(15))
m.save(salida_mascara)

# Zona de trabajo: toda la tapa del pan, con contexto alrededor para que LaMa lea luz y forma.
x0, y0, x1, y1 = 800, 900, 2350, 1900
escala = 0.66
sub = img.crop((x0, y0, x1, y1))
sub_m = m.crop((x0, y0, x1, y1))
w, h = int(sub.width * escala) // 8 * 8, int(sub.height * escala) // 8 * 8
t_img = torch.from_numpy(np.array(sub.resize((w, h), Image.LANCZOS))).permute(2, 0, 1)[None].float() / 255
t_m = (torch.from_numpy(np.array(sub_m.resize((w, h), Image.NEAREST)))[None, None].float() > 127).float()

lama = torch.jit.load(modelo, map_location="cpu").eval()
with torch.no_grad():
    res = lama(t_img, t_m)[0].permute(1, 2, 0).clamp(0, 1).numpy()
relleno = Image.fromarray((res * 255).astype(np.uint8)).resize(sub.size, Image.LANCZOS)

# Recuperar grano fino: LaMa trabaja a menor resolución, se suma el ruido del pan original.
ruido = np.array(sub).astype(np.float32) - np.array(sub.filter(ImageFilter.GaussianBlur(3))).astype(np.float32)
ruido_pan = np.roll(ruido, (140, -260), axis=(0, 1))  # textura tomada de una zona sana de la tapa
relleno = Image.fromarray(np.clip(np.array(relleno).astype(np.float32) + ruido_pan * 0.6, 0, 255).astype(np.uint8))

sub.paste(relleno, (0, 0), sub_m.filter(ImageFilter.GaussianBlur(6)))
img.paste(sub, (x0, y0))
img.save(salida, quality=96)
print("ok")
