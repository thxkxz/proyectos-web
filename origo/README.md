# Origo · Ahumaditos al barril

Piezas gráficas de la marca: menú y fotos de producto. Todo se diseña en HTML/CSS y se exporta a PNG.

## Estructura

```
origo/
  menu/
    index.html        Menú (1080x1350, formato 4:5 de Instagram)
    exportar.js       Genera los PNG del menú
    export/           menu-origo.png y menu-origo@2x.png
  foto/
    la-brasa.html     Foto de La Brasa con fondo de marca (?variante=limpia sin texto)
    exportar.js       Genera los PNG de la foto
    export/           Variante post y limpia, en 1x y 2x
  assets/
    barril.png              Ilustración del barril (fondo del logo)
    la-brasa-recorte.webp   Hamburguesa recortada, sin fondo
  _fuente/            Archivos originales: diseño de Claude Design y fotos sin editar
```

## Paleta

| Uso        | Color     |
|------------|-----------|
| Fondo      | `#090909` |
| Texto      | `#FFE6CC` |
| Precios    | `#FFB703` |
| Acento     | `#FF5A1F` |
| Pie        | `#2A0F0A` |

Fuentes: New Rocker (titulares, precios) y Germania One (textos), desde Google Fonts.

## Cambiar un precio o un plato

1. Editar el texto en `menu/index.html` (cada plato es un `<li class="plato">`).
2. Desde la carpeta `menu/`, correr `node exportar.js`.

Exportar necesita Playwright: `npm i -D playwright && npx playwright install chromium`.
