"""Gradación de color 'apetitosa' para la hamburguesa recortada (RGBA)."""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1:3]
im = Image.open(src).convert("RGBA")
alpha = im.getchannel("A")
rgb = np.asarray(im.convert("RGB")).astype(np.float32) / 255

# 1) Balance: quitar el verde de la luz del local y calentar.
rgb[..., 0] *= 1.025
rgb[..., 1] *= 0.975
rgb[..., 2] *= 0.955

# 2) Trabajo por tono en HSV.
hsv = np.asarray(Image.fromarray((np.clip(rgb, 0, 1) * 255).astype(np.uint8)).convert("HSV")).astype(np.float32)
h, s, v = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255

def banda(c, ancho):
    d = np.abs((h - c + 180) % 360 - 180)
    return np.clip(1 - d / ancho, 0, 1)

amarillo_verde = banda(62, 22)      # salsa/queso que se ve verdoso
dorado = banda(36, 16)              # pan y papas
rojo = banda(8, 18)                 # carne
verde = banda(100, 25)              # lechuga

# Salsa: llevar el tono verdoso hacia crema cálido sin volverla amarilla.
h = h - amarillo_verde * 14 * (1 - s * 0.5)
# Pan y papas: más saturados y un poco más tostados.
s = s * (1 + dorado * 0.12)
v = v * (1 - dorado * 0.07)
# Carne: más rica y profunda.
s = s * (1 + rojo * 0.22)
v = v * (1 - rojo * 0.10)
# Lechuga: fresca, sin pasarse.
s = s * (1 + verde * 0.18)

# Vibrance general: sube más lo que está apagado.
s = np.clip(s + (1 - s) * s * 0.12, 0, 1)

hsv = np.stack([(h % 360) * 255 / 360, s * 255, np.clip(v, 0, 1) * 255], -1).astype(np.uint8)
rgb = np.asarray(Image.fromarray(hsv, "HSV").convert("RGB")).astype(np.float32) / 255

# 3) Curva en S suave: sombras más profundas, luces con brillo.
rgb = np.clip(rgb, 0, 1)
rgb = rgb ** 1.08
rgb = rgb + 0.12 * (rgb - 0.5) * (1 - np.abs(2 * rgb - 1))
rgb = np.clip(rgb, 0, 1)

out = Image.fromarray((rgb * 255).astype(np.uint8))
# 4) Claridad (contraste local) + nitidez fina.
out = out.filter(ImageFilter.UnsharpMask(radius=30, percent=28, threshold=0))
out = out.filter(ImageFilter.UnsharpMask(radius=2, percent=70, threshold=2))
out.putalpha(alpha)
out.save(dst)
print("ok")
