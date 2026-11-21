"""Gradación para fotos con luz cálida (sin tinte verde): pan de abajo dorado, carne con vida."""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1:3]
im = Image.open(src).convert("RGBA")
alpha = im.getchannel("A")
rgb = np.asarray(im.convert("RGB")).astype(np.float32) / 255
H = rgb.shape[0]

hsv = np.asarray(Image.fromarray((rgb * 255).astype(np.uint8)).convert("HSV")).astype(np.float32)
h, s, v = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255

def banda(c, ancho):
    d = np.abs((h - c + 180) % 360 - 180)
    return np.clip(1 - d / ancho, 0, 1)

filas = (np.arange(H)[:, None] / H)
pan_abajo = np.clip((filas - 0.72) / 0.05, 0, 1)          # franja inferior de la hamburguesa
# Peso continuo (sin cortes bruscos) para no manchar la miga.
pan_claro = banda(42, 30) * np.clip((0.55 - s) / 0.25, 0, 1) * np.clip((v - 0.40) / 0.25, 0, 1)

# Pan de abajo: de blanco pálido a miga dorada.
s = s + 0.24 * pan_abajo * pan_claro
v = v * (1 - 0.10 * pan_abajo * pan_claro)
h = h - 4 * pan_abajo * pan_claro
# Pan de arriba y tostados: un punto más de dorado.
s = s * (1 + banda(36, 16) * 0.08)
# Carne: más profunda.
rojo = banda(15, 22)
s = s * (1 + rojo * 0.18)
v = v * (1 - rojo * 0.08)
# Lechuga: ya viene viva; solo un toque.
s = s * (1 + banda(85, 25) * 0.05)
s = np.clip(s, 0, 1)

hsv = np.stack([(h % 360) * 255 / 360, s * 255, np.clip(v, 0, 1) * 255], -1).astype(np.uint8)
rgb = np.asarray(Image.fromarray(hsv, "HSV").convert("RGB")).astype(np.float32) / 255

# Bajar un poco las luces quemadas del sol y dar curva en S suave.
rgb = np.where(rgb > 0.85, 0.85 + (rgb - 0.85) * 0.6, rgb)
rgb = rgb ** 1.05
rgb = np.clip(rgb + 0.10 * (rgb - 0.5) * (1 - np.abs(2 * rgb - 1)), 0, 1)

out = Image.fromarray((rgb * 255).astype(np.uint8))
out = out.filter(ImageFilter.UnsharpMask(radius=12, percent=22, threshold=0))
out.putalpha(alpha)
out.save(dst)
print("ok")
