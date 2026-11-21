"""Monta una hamburguesa recortada sobre las papas de otra foto.

Uso: montar_papas.py hamburguesa.png papas_fuente.png salida.png
- hamburguesa.png: recorte RGBA (ya con color y bordes)
- papas_fuente.png: recorte final de La Brasa (1858x1857) del que se toman las papas
"""
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ham_p, papas_p, dst = sys.argv[1:4]
ham = Image.open(ham_p).convert("RGBA")
ham = ham.crop(ham.getbbox())
fuente = Image.open(papas_p).convert("RGBA")
W, H = fuente.size

# 1) Capa de papas: lo que está debajo del pan de abajo en la foto de origen.
m = Image.new("L", (W, H), 0)
d = ImageDraw.Draw(m)
d.rectangle((0, 1095, W, H), fill=255)          # pila de papas
d.rectangle((1300, 1040, W, H), fill=255)       # papas que asoman a la derecha
d.rectangle((0, 1000, 130, H), fill=255)        # papas del borde izquierdo
m = m.filter(ImageFilter.GaussianBlur(10))
a = np.asarray(fuente.getchannel("A")).astype(np.float32) * np.asarray(m).astype(np.float32) / 255
papas = fuente.copy()
papas.putalpha(Image.fromarray(a.astype(np.uint8)))

# 2) Escalar la hamburguesa: su tapa debe medir lo que medía la tapa de La Brasa (~1320 px).
ah = np.asarray(ham.getchannel("A")) > 128
fila_tapa = int(ah.shape[0] * 0.10)
xs = np.nonzero(ah[fila_tapa])[0]
escala = 1320 / (xs.max() - xs.min())
fila_base = int(ah.shape[0] * 0.90)
xs = np.nonzero(ah[fila_base])[0]
centro_pan = (xs.max() + xs.min()) / 2
ham = ham.resize((round(ham.width * escala), round(ham.height * escala)), Image.LANCZOS)
ham = ham.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=1))

# 3) Posición: base del pan nuevo apoyada en la pila (centro x≈760, base y≈1155).
cx, base = 905, 1250
x = round(cx - centro_pan * escala)
y = round(base - ham.height)

# Lienzo que contiene ambas capas.
izq, arr = min(0, x), min(0, y)
der, abj = max(W, x + ham.width), max(H, y + ham.height)
lienzo = Image.new("RGBA", (der - izq, abj - arr), (0, 0, 0, 0))
lienzo.alpha_composite(papas, (-izq, -arr))

# 4) Sombra de contacto del pan sobre las papas (multiplica, solo donde hay papas).
sombra = Image.new("L", lienzo.size, 0)
ds = ImageDraw.Draw(sombra)
ancho = 1100
ds.ellipse((cx - izq - ancho * 0.62, base - arr - 120, cx - izq + ancho * 0.62, base - arr + 70), fill=200)
sombra = sombra.filter(ImageFilter.GaussianBlur(45))
arr_l = np.asarray(lienzo).astype(np.float32)
k = 1 - np.asarray(sombra).astype(np.float32)[..., None] / 255 * 0.75
arr_l[..., :3] *= k
lienzo = Image.fromarray(np.clip(arr_l, 0, 255).astype(np.uint8))

lienzo.alpha_composite(ham, (x - izq, y - arr))
lienzo = lienzo.crop(lienzo.getbbox())
lienzo.save(dst)

al = np.asarray(lienzo.getchannel("A")) > 128
filas = al[: int(al.shape[0] * 0.15)]
c = np.mean([(np.nonzero(f)[0].min() + np.nonzero(f)[0].max()) / 2 for f in filas if f.any()])
print("ok", lienzo.size, "escala", round(escala, 2), "desfase_pan_pct", round((c - lienzo.width / 2) / lienzo.width * 100, 2))
