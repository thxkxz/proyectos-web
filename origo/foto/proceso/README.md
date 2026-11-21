# Proceso de edición de fotos de producto

Scripts de Python que convierten una foto tomada en el local en el recorte que usan las piezas de `foto/`.
Corren en un entorno virtual con `rembg[cpu]`, `torch` y `Pillow`.

| Paso | Script           | Qué hace                                                                                 |
|------|------------------|------------------------------------------------------------------------------------------|
| 1    | `quitar_papa.py` | Borra un elemento de la foto original (la papa larga) y rellena con IA (LaMa, inpainting) |
| 2    | `recortar.py`    | Quita el fondo con IA (modelo BiRefNet vía rembg)                                         |
| 3    | `limpiar.py`     | Elimina restos del mantel rojo/blanco en bordes y huecos                                  |
| 4    | `color.py`       | Gradación apetitosa: quita el tinte verde de la luz, pan tostado, carne y papas con más vida |
| 5    | `bordes.py`      | Silueta pareja, borde suave homogéneo, quita el filo de color del mantel y mide el eje del pan |

Ejemplo para La Brasa:

```bash
python quitar_papa.py la-brasa.jpg recorte-previo.png big-lama.pt sin-papa.jpg mascara.png
python recortar.py sin-papa.jpg cut.png birefnet-general
python limpiar.py cut.png limpio.png
python color.py limpio.png color.png
python bordes.py color.png final.png
```

El resultado se guarda como `assets/<plato>-recorte.webp`. `bordes.py` imprime el desfase del eje del pan,
que se usa en el `translateX` de la pieza HTML para que el pan quede centrado.

`quitar_papa.py` tiene coordenadas propias de esta foto (el polígono de la papa). Con otra foto hay que
ajustar la máscara. El modelo LaMa (`big-lama.pt`) se descarga de
github.com/enesmsahin/simple-lama-inpainting (releases).
