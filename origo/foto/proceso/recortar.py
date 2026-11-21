import sys
from PIL import Image
from rembg import new_session, remove

src, dst, modelo = sys.argv[1:4]
img = Image.open(src).convert("RGB")
out = remove(img, session=new_session(modelo), post_process_mask=True)
out.save(dst)
print("ok", modelo, out.size)
