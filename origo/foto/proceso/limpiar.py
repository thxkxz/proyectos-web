"""Limpia restos del mantel rojo/blanco en el recorte y aplica un ajuste cálido."""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1:3]
im = Image.open(src).convert("RGBA")
a = np.asarray(im).astype(np.float32)
r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]

# 1) Píxeles de mantel: rojo/rosado con azul por encima del verde (la comida es naranja/amarilla).
mantel = (r > g + 55) & (b > g + 8) & (r > 140)
# En la zona de las papas (debajo del pan) el mantel aparece en sombra: umbral más amplio.
filas = np.arange(a.shape[0])[:, None]
zona_papas = filas > int(a.shape[0] * 0.57)
mantel |= zona_papas & (r > g + 30) & (b > g - 2) & (r > 80)
# Rojo del mantel en sombra entre papas: verde bajo y algo de azul (la papa casi no tiene azul).
mantel |= zona_papas & (r > g + 65) & (g < 100) & (b > 25)
mantel_img = Image.fromarray((mantel * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))
mantel = np.asarray(mantel_img) > 0

# Mantel blanco que se cuela por huecos: muy claro y casi sin saturación, cerca del borde.
borde_ext = np.asarray(Image.fromarray((al < 250).astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(25))) > 0
blanco = (r > 215) & (g > 205) & (b > 200) & borde_ext

al = np.where(mantel | blanco, 0, al)

# 2) Contraer y suavizar el borde 2 px para quitar el halo.
alpha = Image.fromarray(al.astype(np.uint8)).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.6))
al = np.asarray(alpha).astype(np.float32)

# 3) Despill: en la franja del borde, neutralizar tonos rosados residuales.
franja = np.asarray(Image.fromarray((al < 250).astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(9))) > 0
rosado = franja & (r > g + 25) & (b > g - 5)
r = np.where(rosado, g * 1.18, r)
b = np.where(rosado, g * 0.62, b)

# 4) Ajuste cálido suave para que la comida entone con la luz de brasa.
r = r * 1.04 + 4
g = g * 1.00
b = b * 0.90
rgb = np.clip(np.stack([r, g, b], -1), 0, 255)
# Contraste leve alrededor del medio tono.
rgb = np.clip((rgb - 128) * 1.07 + 128, 0, 255)

out = np.dstack([rgb, al]).astype(np.uint8)
res = Image.fromarray(out, "RGBA")
res = res.crop(res.getbbox())
res.save(dst)
print("ok", res.size)
