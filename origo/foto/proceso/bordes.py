"""Silueta más pareja: quita picos pequeños del recorte y unifica la suavidad del borde."""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1:3]
im = Image.open(src).convert("RGBA")
a = im.getchannel("A")

# Apertura morfológica: elimina salientes finas (pelusas de lechuga, bordes dentados).
binaria = a.point(lambda p: 255 if p > 110 else 0)
abierta = binaria.filter(ImageFilter.MinFilter(13)).filter(ImageFilter.MaxFilter(13))
# Cierre: rellena muescas pequeñas hacia adentro.
cerrada = abierta.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.MinFilter(9))
# Borde suave y homogéneo en toda la silueta.
suave = cerrada.filter(ImageFilter.GaussianBlur(2.2))

# Nunca agregar opacidad donde el recorte original no tenía comida.
final = np.minimum(np.asarray(suave), np.asarray(a.filter(ImageFilter.MaxFilter(5))))
# Descontaminar el borde: el contorno trae color del mantel. Se reemplaza por el color
# del interior inmediato (promedio ponderado de la zona sólida cercana).
rgb = np.asarray(im.convert("RGB")).astype(np.float32)
interior = Image.fromarray(((final > 250) * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(17))
w = np.asarray(interior.filter(ImageFilter.GaussianBlur(14))).astype(np.float32)[..., None] / 255
num = np.stack([np.asarray(Image.fromarray((rgb[..., c] * (np.asarray(interior)[..., ] / 255)).astype(np.uint8))
                .filter(ImageFilter.GaussianBlur(14))).astype(np.float32) for c in range(3)], -1)
color_interior = num / np.maximum(w, 1e-3)
franja = np.asarray(Image.fromarray(((final < 250) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(19))) > 0
franja &= final > 0
peso = np.where(franja[..., None] & (w > 0.02), 0.8, 0.0)
rgb = rgb * (1 - peso) + color_interior * peso
im = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))

im.putalpha(Image.fromarray(final.astype(np.uint8)))
im = im.crop(im.getbbox())
im.save(dst)

# Eje del pan: centro horizontal de las filas superiores (tapa del pan).
al = np.asarray(im.getchannel("A")) > 128
filas = al[: int(al.shape[0] * 0.2)]
xs = [np.nonzero(f)[0] for f in filas if f.any()]
centro_pan = np.mean([(x.min() + x.max()) / 2 for x in xs])
print("ok", im.size, "centro_pan_x", round(centro_pan), "desfase_px", round(centro_pan - im.width / 2))
