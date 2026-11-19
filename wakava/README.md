# Wakava Café Restobar — Landing Page

Landing page estática para **Wakava Café Restobar**, Turbaco, Bolívar, Colombia.
Construida con HTML5 semántico, CSS puro (tokens de diseño en `:root`) y JavaScript vanilla.
Sin frameworks, sin dependencias externas.

---

## Datos del cliente

| Campo | Valor |
|---|---|
| Nombre | Wakava Café Restobar |
| Ubicación | Turbaco, Bolívar, Colombia |
| WhatsApp | +57 300 6967608 |
| Enlace wa.me | `https://wa.me/573006967608` |
| Instagram | CONFIRMAR handle real con el cliente |
| Calificación Google | 4.6 estrellas |
| Tipo de negocio | Café de especialidad + restobar |

---

## Estructura de archivos

```
cliente-02/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Todos los estilos (tokens + componentes)
├── js/
│   └── main.js         # Comportamientos: WhatsApp, menú, filtro de carta, nav activa
├── assets/             # Carpeta para fotos reales del cliente
│   └── .gitkeep
├── DESIGN.md           # Fuente de verdad del sistema visual (no tocar sin autorización)
└── README.md           # Este archivo
```

---

## Secciones de la landing

| ID de sección | Descripción |
|---|---|
| `#inicio` | Hero con imagen de fondo, chip de rating 4.6, H1 y CTAs |
| `#prueba-social` | Franja de rating Google (4.6 estrellas, +200 reseñas) |
| `#carta` | Menú con tabs por categoría y tarjetas de plato |
| `#galeria` | Cuadrícula de 8 fotos del ambiente del local |
| `#ubicacion` | Dirección, horario, mapa de Google Maps y botones de contacto |

---

## Categorías de la carta

| Categoría | `data-cat` | Platos incluidos |
|---|---|---|
| Café de Especialidad | `cafe` | Espresso Wakava, Capuchino de la Casa, Cold Brew del Día, Café con Leche Turbaco |
| Desayunos | `desayunos` | Desayuno Wakava, Tostadas con Aguacate, Changua de la Abuela, Calentado Costeño |
| Almuerzos | `almuerzos` | Bandeja Wakava, Pollo a la Plancha, Cazuela de Mariscos, Arroz con Pollo Turbaco |
| Bebidas | `bebidas` | Limonada de Coco, Jugo Natural del Día, Michelada Wakava, Chocolate Caliente |
| Postres | `postres` | Torta de Queso, Pudín de Pan, Brownie con Helado, Arroz con Leche |

**IMPORTANTE:** Todos los nombres, descripciones y precios son ejemplos plausibles.
Confirmar la carta real con el cliente antes de publicar.

---

## Redes sociales

| Red | Estado | Enlace |
|---|---|---|
| WhatsApp | Activo | `https://wa.me/573006967608` |
| Instagram | CONFIRMAR | `https://www.instagram.com/REEMPLAZAR_INSTAGRAM_WAKAVA/` |

El handle de Instagram de Wakava no ha sido confirmado por el cliente.
Buscar `REEMPLAZAR_INSTAGRAM_WAKAVA` en `index.html` y reemplazarlo cuando se confirme.

---

## Tokens de color principales

Los colores están definidos en el bloque `:root` de `css/styles.css`:

| Token | Hex | Uso |
|---|---|---|
| `--color-roast` | `#3D2314` | Texto principal, fondo del footer |
| `--color-cream` | `#FAF5EC` | Fondo principal del sitio (nunca blanco puro) |
| `--color-terra` | `#C4613A` | Acento principal: botones, precios, detalles |
| `--color-olive` | `#6B7C5A` | Segundo color: eyebrows, badges, frescura |
| `--color-sand` | `#D4BFA0` | Paneles, fondos alternos, separadores |
| `--color-whatsapp` | `#25D366` | FAB y botones de WhatsApp |

### Fondos por sección

| Sección | Token de fondo |
|---|---|
| Body | `--color-cream` (`#FAF5EC`) |
| Prueba social | `--color-sand-light` (`#E8D9C2`) |
| Carta / Menú | `--color-cream-deep` (`#EAE0CB`) |
| Galería | `--color-sand-bg` (`#F0E8D8`) |
| Ubicación | `--color-cream-warm` (`#F3EBD8`) |
| Footer | `--color-roast` (`#3D2314`) |

---

## Fuentes

```html
<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

- **DM Serif Display** — Títulos H1–H3, logotipo, frases destacadas
- **Plus Jakarta Sans** — Cuerpo, UI, etiquetas, precios

---

## IDs de WhatsApp (requeridos por main.js)

Estos 6 IDs deben existir en `index.html` exactamente como aparecen.
`main.js` los actualiza dinámicamente con el número `573006967608`:

| ID | Sección |
|---|---|
| `header-whatsapp-link` | Botón CTA en el header |
| `mobile-whatsapp-link` | Menú móvil hamburguesa |
| `hero-whatsapp-link` | CTA secundario del hero |
| `carta-whatsapp-link` | CTA al final de la sección de carta |
| `footer-whatsapp-link` | Botón en la sección de ubicación |
| `fab-whatsapp-link` | Botón flotante verde (FAB) |

Para cambiar el número, editar únicamente `CONFIG.whatsappNumber` en `js/main.js`.

---

## Instrucciones: reemplazo de imágenes placeholder

Todas las imágenes son placeholders de `loremflickr.com` marcadas con el texto
`REEMPLAZAR con foto real` en el atributo `alt`.

### Pasos para reemplazar con fotos reales

1. Descargar las fotos del cliente en la mayor resolución posible.
2. Aplicar ajuste de temperatura cálida en Lightroom (+10–15). No sobreeditar.
3. Recortar a las dimensiones del tipo de imagen:
   - Hero: 1920×1080px mínimo (WebP preferido)
   - Tarjetas de plato: 800×600px (proporción 4:3)
   - Galería (celdas normales): 900×900px (cuadrado)
   - Galería (celda destacada): 1200×900px
4. Exportar en WebP (calidad 80–85%). Tener fallback JPEG.
5. Nombrar descriptivamente: `cafe-espresso-01.webp`, `galeria-interior-01.webp`, etc.
6. Colocar en `assets/` con subcarpetas: `menu/`, `galeria/`, `hero/`.
7. Reemplazar la URL de loremflickr en el atributo `src` de cada `<img>`.
8. Actualizar el texto del atributo `alt` eliminando la parte `— REEMPLAZAR con foto real`.
9. Quitar el comentario `<!-- REEMPLAZAR -->` del bloque correspondiente en el HTML.

### Tabla de imágenes a reemplazar

| Tipo | Archivo sugerido | Lock placeholder |
|---|---|---|
| Hero | `assets/hero/hero-wakava-01.webp` | lock=51 |
| Espresso | `assets/menu/cafe-espresso-01.webp` | lock=61 |
| Capuchino | `assets/menu/cafe-capuchino-01.webp` | lock=62 |
| Cold Brew | `assets/menu/cafe-coldbrew-01.webp` | lock=63 |
| Café con Leche | `assets/menu/cafe-conleche-01.webp` | lock=64 |
| Desayuno Wakava | `assets/menu/desayuno-wakava-01.webp` | lock=71 |
| Tostadas aguacate | `assets/menu/desayuno-tostadas-01.webp` | lock=72 |
| Changua | `assets/menu/desayuno-changua-01.webp` | lock=73 |
| Calentado | `assets/menu/desayuno-calentado-01.webp` | lock=74 |
| Bandeja Wakava | `assets/menu/almuerzo-bandeja-01.webp` | lock=81 |
| Pollo Plancha | `assets/menu/almuerzo-pollo-01.webp` | lock=82 |
| Cazuela Mariscos | `assets/menu/almuerzo-cazuela-01.webp` | lock=83 |
| Arroz con Pollo | `assets/menu/almuerzo-arroz-01.webp` | lock=84 |
| Limonada Coco | `assets/menu/bebida-limonada-01.webp` | lock=91 |
| Jugo Natural | `assets/menu/bebida-jugo-01.webp` | lock=92 |
| Michelada | `assets/menu/bebida-michelada-01.webp` | lock=93 |
| Chocolate | `assets/menu/bebida-chocolate-01.webp` | lock=94 |
| Torta de Queso | `assets/menu/postre-cheesecake-01.webp` | lock=101 |
| Pudin de Pan | `assets/menu/postre-pudin-01.webp` | lock=102 |
| Brownie | `assets/menu/postre-brownie-01.webp` | lock=103 |
| Arroz con Leche | `assets/menu/postre-arroz-01.webp` | lock=104 |
| Galería 1 (destacada) | `assets/galeria/interior-01.webp` | lock=111 |
| Galería 2 | `assets/galeria/barista-01.webp` | lock=112 |
| Galería 3 | `assets/galeria/ambiente-manana-01.webp` | lock=113 |
| Galería 4 | `assets/galeria/platos-01.webp` | lock=114 |
| Galería 5 | `assets/galeria/latte-art-01.webp` | lock=115 |
| Galería 6 | `assets/galeria/desayuno-mesa-01.webp` | lock=116 |
| Galería 7 | `assets/galeria/postre-cafe-01.webp` | lock=117 |
| Galería 8 | `assets/galeria/mesa-madera-01.webp` | lock=118 |

---

## Instrucciones: reemplazo del embed de mapa

1. Ir a `maps.google.com`.
2. Buscar la dirección exacta de Wakava Café Restobar en Turbaco.
3. Hacer clic en "Compartir" y luego en "Insertar mapa".
4. Copiar únicamente el valor del atributo `src` del iframe generado.
5. En `index.html`, buscar el `<iframe class="location__map"` y reemplazar su atributo `src`.

---

## Checklist de personalización antes del lanzamiento

- [ ] Confirmar handle de Instagram de Wakava y reemplazar `REEMPLAZAR_INSTAGRAM_WAKAVA`
- [ ] Confirmar dirección exacta del local y actualizar en sección ubicación y footer
- [ ] Confirmar horario real por día y actualizar la tabla de horarios
- [ ] Confirmar número real de reseñas en Google (actualmente "+200 reseñas")
- [ ] Confirmar carta real: nombres, descripciones y precios de todos los platos
- [ ] Reemplazar todas las imágenes loremflickr con fotos reales del local
- [ ] Reemplazar el embed del mapa con las coordenadas reales de Wakava
- [ ] Reemplazar la OG image placeholder con imagen de 1200×630px de Wakava
- [ ] Verificar que el número `573006967608` está correcto en los 6 IDs de WhatsApp
- [ ] Probar navegación completa por teclado (Tab, Enter, Escape en menú móvil)
- [ ] Probar en Chrome, Firefox, Safari iOS y Samsung Internet
- [ ] Verificar `prefers-reduced-motion` desactiva todas las animaciones
- [ ] Lighthouse: Performance mayor a 90, Accessibility mayor a 95, SEO mayor a 90

---

## Convenciones técnicas

- Sin frameworks ni dependencias externas
- Mobile-first con breakpoints: 480px, 640px, 768px, 900px, 1024px
- Nomenclatura BEM ligera: `.bloque__elemento--modificador`
- WCAG 2.1 Nivel AA: contraste mínimo 4.5:1, foco visible, aria-label en iconos decorativos
- `prefers-reduced-motion` desactiva todas las animaciones
- `loading="lazy"` en todas las imágenes excepto la imagen destacada de la galería
- Smooth scroll con compensación de altura del header sticky
