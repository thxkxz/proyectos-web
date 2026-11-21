"""Integra el recorte con el fondo: contorno con desenfoque natural y 'light wrap' cálido.

Uso: integrar.py entrada.png salida.png
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1:3]
im = Image.open(src).convert("RGBA")
pad = 80
lienzo = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
lienzo.paste(im, (pad, pad))
im = lienzo

a = np.asarray(im.getchannel("A")).astype(np.float32) / 255
rgb = np.asarray(im.convert("RGB")).astype(np.float32)

# 1) Contorno: borde más blando, como el desenfoque de una lente (no un corte de tijera).
a_img = Image.fromarray((a * 255).astype(np.uint8))
a_suave = np.asarray(a_img.filter(ImageFilter.GaussianBlur(4.5))).astype(np.float32) / 255
# Se conserva el interior sólido; el ablandamiento solo actúa hacia afuera y en la franja del borde.
a_final = np.maximum(a_suave * 0.92, np.where(a > 0.98, np.minimum(a, a_suave + 0.25), 0))

# Desenfoque leve del color solo en la franja del contorno (profundidad de campo).
franja = np.asarray(Image.fromarray(((a < 0.99) & (a > 0.01)).astype(np.uint8) * 255)
                    .filter(ImageFilter.MaxFilter(15)).filter(ImageFilter.GaussianBlur(6))).astype(np.float32)[..., None] / 255
rgb_blur = np.asarray(Image.fromarray(rgb.astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.2))).astype(np.float32)
rgb = rgb * (1 - franja) + rgb_blur * franja

# 2) Light wrap: la luz cálida del fondo envuelve los bordes de la comida.
luz_fondo = np.array([120, 62, 34], np.float32)          # ámbar ahumado del fondo
interior = np.asarray(Image.fromarray((a > 0.5).astype(np.uint8) * 255).filter(ImageFilter.GaussianBlur(28))).astype(np.float32) / 255
borde = np.clip(1 - interior, 0, 1)[..., None] * (a[..., None] > 0.01)
envoltura = borde ** 1.4 * 0.55
rgb = rgb * (1 - envoltura) + (rgb * 0.45 + luz_fondo * 0.55) * envoltura

out = np.dstack([np.clip(rgb, 0, 255), np.clip(a_final, 0, 1) * 255]).astype(np.uint8)
res = Image.fromarray(out, "RGBA")
res = res.crop(res.getbbox())
res.save(dst)
print("ok", res.size)
