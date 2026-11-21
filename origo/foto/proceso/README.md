# Proceso de edición de fotos de producto

Scripts de Python que convierten una foto tomada en el local en el recorte que usan las piezas de `foto/`.
Corren en un entorno virtual con `rembg[cpu]`, `torch` y `Pillow`.

| Paso | Script           | Qué hace                                                                                 |
|------|------------------|------------------------------------------------------------------------------------------|
| 1    | `quitar_papa.py` | Borra un elemento de la foto original (la papa larga) y rellena con IA (LaMa, inpainting) |
| 1b   | `arreglar_pan.py`| Reconstruye la tapa del pan con LaMa: quita el machucón y el borde roto                   |
| 2    | `recortar.py`    | Quita el fondo con IA (modelo BiRefNet vía rembg)                                         |
| 3    | `limpiar.py`     | Elimina restos del mantel rojo/blanco en bordes y huecos                                  |
| 4    | `color.py`       | Gradación apetitosa: quita el tinte verde de la luz, pan tostado, carne y papas con más vida |
| 5    | `bordes.py`      | Silueta pareja, borde suave homogéneo, quita el filo de color del mantel y mide el eje del pan |
| 4b   | `color_v2.py`    | Variante de color para fotos con luz cálida: dora el pan de abajo y da vida a la carne      |
| 6    | `montar_papas.py`| Asienta una hamburguesa sin papas sobre la pila de papas de La Brasa, con sombra de contacto |

Ejemplo para la primera foto de La Brasa (con papas):

```bash
python quitar_papa.py la-brasa.jpg recorte-previo.png big-lama.pt sin-papa.jpg mascara.png
python arreglar_pan.py sin-papa.jpg big-lama.pt pan-ok.jpg mascara-pan.png
python recortar.py pan-ok.jpg cut.png birefnet-general
python limpiar.py cut.png limpio.png
python color.py limpio.png color.png
python bordes.py color.png final.png
```

Foto actual de La Brasa (sin papas, luz cálida). Primero se amplía el recorte 2.6x con 60 px de margen
transparente para que `bordes.py` trabaje a la misma escala que la foto anterior:

```bash
python recortar.py la-brasa-3.jpg cut.png birefnet-general
# ampliar 2.6x + margen de 60 px -> cut-x.png
python color_v2.py cut-x.png color.png
python bordes.py color.png bordes.png
python montar_papas.py bordes.png final-primera-foto.png montaje.png
```

El resultado se guarda como `assets/<plato>-recorte.webp`. `bordes.py` imprime el desfase del eje del pan,
que se usa en el `translateX` de la pieza HTML para que el pan quede centrado.

`quitar_papa.py` y `arreglar_pan.py` tienen coordenadas propias de esta foto (polígonos de la papa y del pan). Con otra foto hay que
ajustar la máscara. El modelo LaMa (`big-lama.pt`) se descarga de
github.com/enesmsahin/simple-lama-inpainting (releases).
