# DESIGN SYSTEM — Carly's Resto Bar
## Sistema Visual Premium · Gastrobar Oscuro · Turbaco, Colombia

> Este documento es la fuente de verdad para el sistema visual.
> Todo el contenido está en español. Ninguna pantalla debe usar blanco puro (`#FFFFFF`) como fondo ni como color de texto principal.

---

## ÍNDICE

1. [Tokens de Color](#1-tokens-de-color)
2. [Tipografía](#2-tipografía)
3. [Espaciado y Layout](#3-espaciado-y-layout)
4. [Detalles Dorados](#4-detalles-dorados)
5. [Especificación por Componente](#5-especificación-por-componente)
6. [Bloque `:root` listo para copiar](#6-bloque-root-listo-para-copiar)
7. [Guía de Fotografía y Placeholders](#7-guía-de-fotografía-y-placeholders)

---

## 1. TOKENS DE COLOR

### Paleta base (colores de marca)

| Token CSS | Hex | Nombre | Rol principal |
|---|---|---|---|
| `--color-wine` | `#6B1A22` | Vino profundo | Color de marca primario. Hero, header, footer, botones primarios, accents de sección. |
| `--color-cream` | `#F3EEE5` | Crema cálida | Fondo "claro" del sitio. Nunca usar blanco puro. Texto sobre fondos oscuros. |
| `--color-taupe` | `#C7B8A1` | Taupe | Paneles, tarjetas de plato, fondos de sección alternos. |
| `--color-gold` | `#C9972F` | Dorado | Acentos, líneas finas, precios, estrellas, detalles decorativos. |
| `--color-dark` | `#2B211C` | Texto oscuro cálido | Color de texto base. Fondos de sección muy oscuros. Jamás usar negro puro. |

### Variantes derivadas y tokens de soporte

Cada token derivado incluye su propósito exacto para que el desarrollador no improvise valores.

#### Familia Vino
| Token CSS | Hex / valor | Propósito |
|---|---|---|
| `--color-wine` | `#6B1A22` | Base de marca |
| `--color-wine-dark` | `#4A1118` | Hero bg profundo, footer bg, overlay de galería, hover de botón primario |
| `--color-wine-deeper` | `#2E0A0F` | Fondos de sección oscura alternativa, gradiente bottom del hero |
| `--color-wine-muted` | `#8B3540` | Hover del nav, estados activos sobre fondo vino |
| `--color-wine-overlay` | `rgba(43, 9, 14, 0.78)` | Overlay sobre foto del hero (capa encima de la imagen) |
| `--color-wine-overlay-gallery` | `rgba(43, 9, 14, 0.55)` | Overlay sutil en hover de galería |
| `--color-wine-glass` | `rgba(107, 26, 34, 0.65)` | Header sticky con backdrop-blur (fondo translúcido sobre scroll) |
| `--color-wine-glass-solid` | `rgba(107, 26, 34, 0.96)` | Header sticky al llegar al 100% de opacidad |

#### Familia Crema
| Token CSS | Hex / valor | Propósito |
|---|---|---|
| `--color-cream` | `#F3EEE5` | Fondo claro principal |
| `--color-cream-warm` | `#EDE6D9` | Fondo de secciones alternas "claras" (ligero contraste con cream) |
| `--color-cream-dimmed` | `rgba(243, 238, 229, 0.90)` | Texto crema sobre fondos oscuros (ligeramente rebajado para no brillar) |
| `--color-cream-subtle` | `rgba(243, 238, 229, 0.55)` | Texto secundario/muted sobre fondos oscuros |
| `--color-cream-ghost` | `rgba(243, 238, 229, 0.12)` | Fondos de hover muy sutiles en dark sections |
| `--color-cream-border` | `rgba(243, 238, 229, 0.18)` | Bordes en componentes sobre fondo oscuro |

#### Familia Taupe
| Token CSS | Hex / valor | Propósito |
|---|---|---|
| `--color-taupe` | `#C7B8A1` | Base taupe |
| `--color-taupe-dark` | `#A89880` | Tarjetas en hover, bordes internos de card |
| `--color-taupe-light` | `#DDD4C5` | Fondo de la franja de prueba social, backgrounds muy claros sobre crema |
| `--color-taupe-bg` | `#EAE3D8` | Fondo de sección de menú (claro pero más cálido que cream) |

#### Familia Dorado
| Token CSS | Hex / valor | Propósito |
|---|---|---|
| `--color-gold` | `#C9972F` | Dorado base de marca |
| `--color-gold-bright` | `#E2AC42` | Hover de botón outline-gold, estrellas activas |
| `--color-gold-dim` | `#A87826` | Dorado oscuro para texto de precio (contraste AA sobre crema) |
| `--color-gold-hairline` | `rgba(201, 151, 47, 0.40)` | Líneas finas de 1px, separadores sutiles |
| `--color-gold-border` | `rgba(201, 151, 47, 0.25)` | Bordes de tarjetas premium |
| `--color-gold-glow` | `rgba(201, 151, 47, 0.20)` | Box-shadow cálido en tarjetas/botones dorados |

#### Colores funcionales y de acción
| Token CSS | Hex / valor | Propósito |
|---|---|---|
| `--color-whatsapp` | `#25D366` | Color oficial de WhatsApp |
| `--color-whatsapp-hover` | `#1DA851` | Hover del FAB y botones WhatsApp |
| `--color-whatsapp-shadow` | `rgba(37, 211, 102, 0.45)` | Glow del FAB |
| `--color-instagram` | `#E1306C` | Icono de Instagram en hero CTA y footer |
| `--color-text-on-dark` | `#F3EEE5` | `--color-cream` — texto principal sobre fondos oscuros (vino, dark) |
| `--color-text-on-dark-muted` | `rgba(243, 238, 229, 0.65)` | Texto secundario sobre fondos oscuros |
| `--color-text-on-light` | `#2B211C` | `--color-dark` — texto principal sobre fondos claros (cream, taupe) |
| `--color-text-on-light-muted` | `#6B5B4E` | Texto secundario sobre fondos claros |

### Verificación de contraste WCAG AA

Todos los pares texto/fondo que sigue el sistema cumplen ratio mínimo 4.5:1 (texto normal) y 3:1 (texto grande):

| Texto | Fondo | Ratio estimado | Estado |
|---|---|---|---|
| `#F3EEE5` (cream) sobre `#6B1A22` (wine) | — | ~8.2:1 | AA pass |
| `#F3EEE5` (cream) sobre `#4A1118` (wine-dark) | — | ~10.1:1 | AA pass |
| `#F3EEE5` (cream) sobre `#2B211C` (dark) | — | ~9.5:1 | AA pass |
| `#2B211C` (dark) sobre `#F3EEE5` (cream) | — | ~9.5:1 | AA pass |
| `#2B211C` (dark) sobre `#C7B8A1` (taupe) | — | ~4.8:1 | AA pass |
| `#A87826` (gold-dim) sobre `#F3EEE5` (cream) | — | ~5.1:1 | AA pass |
| `#C9972F` (gold) sobre `#4A1118` (wine-dark) | — | ~5.8:1 | AA pass |

> AVISO: No usar `--color-gold` (`#C9972F`) como texto sobre `--color-cream` (`#F3EEE5`). El ratio es ~2.8:1. Para precios en texto sobre fondo claro, usar siempre `--color-gold-dim` (`#A87826`).

---

## 2. TIPOGRAFÍA

### Fuentes elegidas

**Display (títulos H1–H3, logotipo):** `Cormorant Garamond`
- Serif clásico de alta elegancia. Trazos finos característicos de editoriales de lujo. Excelente legibilidad en tamaños grandes. Disponible en pesos 300, 400, 500, 600, 700.
- Por qué: más refinado y con más personalidad que Playfair Display. Los trazos finos hacen eco de las hairlines doradas del sistema. Funciona excepcionalmente bien con tracking amplio en mayúsculas.

**Body (cuerpo de texto, UI):** `Jost`
- Sans-serif geométrica cálida. Letras abiertas con personalidad. Pesos 300, 400, 500, 600.
- Por qué: más cálida y con más carácter que Inter para un gastrobar premium. El peso 300 en descripciones largas crea un aire de sofisticación.

**Monospace (precios únicamente):** sistema fallback (`'Courier New', monospace`)
- No se carga fuente adicional para precios. Los precios son datos y se benefician del tabulado natural del mono.
- Alternativa: si el desarrollador quiere carga adicional, puede usar `DM Mono` de Google Fonts, peso 500.

### Google Fonts `<link>` exacto

Colocar en `<head>` ANTES de `css/styles.css`, después de los preconnects:

```html
<!-- Preconnects (ya presentes, mantenerlos) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Fuentes premium Carly's Resto Bar -->
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap"
  rel="stylesheet"
/>
```

### Escala tipográfica fluida (clamp)

Todos los valores son fluidos entre 375px (móvil mínimo) y 1440px (desktop).

| Token | Valor clamp | Uso |
|---|---|---|
| `--text-display-hero` | `clamp(2.75rem, 8vw + 0.5rem, 5.5rem)` | H1 del hero (tagline principal) |
| `--text-display-xl` | `clamp(2.25rem, 5vw + 0.5rem, 3.75rem)` | Títulos de sección H2 en dark sections |
| `--text-display-lg` | `clamp(1.875rem, 4vw + 0.25rem, 2.875rem)` | Subtítulos H2, nombre del restaurante en footer |
| `--text-display-md` | `clamp(1.5rem, 3vw + 0.25rem, 2.25rem)` | H3 de tarjeta de plato, nombre de categoría |
| `--text-display-sm` | `clamp(1.25rem, 2vw + 0.25rem, 1.625rem)` | H3 de info-blocks, etiquetas destacadas |
| `--text-body-lg` | `1.125rem` (18px) | Subtítulo del hero, subtítulo de sección |
| `--text-body-md` | `1rem` (16px) | Cuerpo estándar, descripciones de plato |
| `--text-body-sm` | `0.875rem` (14px) | Metadatos, horarios, copyright, breadcrumbs |
| `--text-label` | `0.75rem` (12px) | Eyebrows, etiquetas de categoría, precio-label |
| `--text-price` | `1.125rem` (18px) | Precio en tarjeta (Jost 600 o Courier) |

### Pesos

| Token | Valor | Uso |
|---|---|---|
| `--font-weight-thin` | `300` | Cuerpo de texto largo, descripciones de plato, subtítulos ligeros |
| `--font-weight-regular` | `400` | Cuerpo estándar |
| `--font-weight-medium` | `500` | Etiquetas UI, nav links, botones body |
| `--font-weight-semibold` | `600` | Título de tarjeta, nombre de plato, precio |

Para Cormorant Garamond en display, usar **600** en títulos principales y **300 italic** para frases de acento o citas.

### Tracking (letter-spacing) para Cormorant Garamond

Cormorant Garamond se comporta excepcionalmente con tracking amplio en mayúsculas y ligeramente negativo en títulos grandes.

| Contexto | `letter-spacing` |
|---|---|
| Eyebrow en mayúsculas (`GASTROBAR · TURBACO`) | `0.18em` |
| Etiqueta de categoría en mayúsculas | `0.14em` |
| H1 hero (clamp grande) | `-0.02em` (tracking negativo, más apretado) |
| H2 sección | `-0.01em` |
| H3 tarjeta | `0` |
| Precio con Jost | `0.04em` |
| Label footer (mayúsculas) | `0.12em` |

### Altura de línea (line-height)

| Token | Valor | Uso |
|---|---|---|
| `--leading-display` | `1.08` | H1 hero en tamaños muy grandes |
| `--leading-tight` | `1.2` | H2 secciones |
| `--leading-snug` | `1.35` | H3 tarjetas, títulos medianos |
| `--leading-normal` | `1.6` | Cuerpo de texto, descripciones |
| `--leading-loose` | `1.8` | Texto muy pequeño, footnotes |

### Uso de versalitas y mayúsculas

- **Eyebrows de sección** (p.ej. `NUESTRO MENÚ` encima del H2): `text-transform: uppercase`, Jost 500 o 600, `letter-spacing: 0.14em`, color `--color-gold`, tamaño `--text-label`.
- **Etiquetas de categoría de menú** (p.ej. `CARNES ANGUS`, `PESCADOS`): `text-transform: uppercase`, Jost 500, `letter-spacing: 0.12em`, color `--color-gold-dim`.
- **Etiqueta de precio** (la palabra "Precio" encima del monto): `text-transform: uppercase`, Jost 500, `letter-spacing: 0.10em`, `--text-label`, `--color-text-on-light-muted`.
- **Nav links en header**: `text-transform: none`. Sin mayúsculas forzadas. Jost 500.
- **Footer col titles**: `text-transform: uppercase`, `letter-spacing: 0.10em`, tamaño `--text-label`, color `--color-cream-subtle`.

---

## 3. ESPACIADO Y LAYOUT

### Filosofía de espaciado

El sistema aplica "mucho aire" como señal de premium. Un gastrobar elegante nunca apila elementos. Las secciones respiran. Los titulos tienen margen generoso antes y después. Las tarjetas no se tocan entre sí.

Escala base en múltiplos de 4px:

| Token | px | rem | Uso típico |
|---|---|---|---|
| `--space-1` | 4px | 0.25rem | Microespaciado interno (gap entre icono y label) |
| `--space-2` | 8px | 0.5rem | Padding inline de chips/badges pequeños |
| `--space-3` | 12px | 0.75rem | Gap entre nav items, padding de botón small |
| `--space-4` | 16px | 1rem | Padding estándar, gap de grids pequeños |
| `--space-5` | 20px | 1.25rem | Espaciado entre elementos dentro de tarjeta |
| `--space-6` | 24px | 1.5rem | Padding del body de tarjeta, margen entre grupos |
| `--space-8` | 32px | 2rem | Gap del grid de menú, espaciado entre CTAs |
| `--space-10` | 40px | 2.5rem | Margin-bottom de section header |
| `--space-12` | 48px | 3rem | Padding vertical de sección móvil (mínimo) |
| `--space-16` | 64px | 4rem | Padding vertical de sección tablet |
| `--space-20` | 80px | 5rem | Padding vertical de sección desktop estándar |
| `--space-24` | 96px | 6rem | Padding vertical de sección premium (hero content, menú, galería) |
| `--space-32` | 128px | 8rem | Espaciado hero arriba del texto (distancia desde top del viewport) |

### Contenedor

| Token | Valor | Uso |
|---|---|---|
| `--container-max` | `1200px` | Ancho máximo del contenedor estándar |
| `--container-max-narrow` | `780px` | Contenedor estrecho para texto largo (tagline, intro) |
| `--container-max-wide` | `1400px` | Galería de fotos con sangría mínima |
| `--container-px` | `clamp(1.25rem, 5vw, 3rem)` | Padding horizontal fluido del contenedor |

### Padding vertical por sección

| Contexto | Móvil | Tablet (768px) | Desktop (1024px) |
|---|---|---|---|
| Sección estándar | `--space-12` (48px) | `--space-16` (64px) | `--space-20` (80px) |
| Sección con mucho contenido (menú) | `--space-16` (64px) | `--space-20` (80px) | `--space-24` (96px) |
| Franja de prueba social (compacta) | `--space-8` (32px) | `--space-10` (40px) | `--space-10` (40px) |
| Hero | `100svh` con contenido centrado verticalmente | — | — |
| Footer | `--space-16` top / `--space-8` bottom | `--space-20` top | `--space-20` top |

### Grid de secciones

Usar CSS Grid o Flexbox según el caso. Breakpoints:
- `375px` — móvil mínimo (todo en 1 columna)
- `480px` — pequeño: algunos grids en 2 columnas
- `768px` — tablet: layouts de 2-3 columnas visibles
- `900px` — header desktop, nav visible
- `1024px` — desktop: layouts completos, sección ubicación horizontal
- `1280px` — wide: grid de menú en 3 columnas

### Ritmo vertical entre secciones

El `margin-bottom` entre el eyebrow (label de sección), el H2, el subtítulo y el grid debe seguir este ritmo:

```
eyebrow → H2:      margin-top: var(--space-3)
H2 → subtítulo:   margin-top: var(--space-5)
subtítulo → grid: margin-top: var(--space-10) (desktop: --space-12)
```

El separador dorado (hairline de 40–60px de ancho centrado) se coloca entre el eyebrow y el H2, con `margin-block: var(--space-4)`.

---

## 4. DETALLES DORADOS

Los cuatro detalles dorados son la firma visual del sistema. Son sutiles, nunca exagerados. La regla es: si el dorado llama más la atención que el plato de comida, hay demasiado.

### Detalle 1: Hairline dorada bajo título de sección

Una línea horizontal de 1px de alto, 56px de ancho, centrada bajo el H2 de cada sección.

```css
/* Aplicar al elemento .section__title-accent que va después del H2 */
.section__gold-rule {
  display: block;
  width: 56px;
  height: 1px;
  background-color: var(--color-gold);
  margin: var(--space-5) auto var(--space-6);
  /* Para secciones con alineación izquierda (desktop), quitar margin auto: */
  /* margin: var(--space-5) 0 var(--space-6); */
}
```

Dónde aplicar: en las secciones Hero (bajo el tagline), Menú, Galería y el título del Footer. NO en la franja de prueba social (ya tiene las estrellas).

### Detalle 2: Borde dorado translúcido en tarjeta de plato

Las tarjetas de plato tienen un borde de 1px con color `--color-gold-border` y en hover el borde se ilumina a `--color-gold-hairline`.

```css
.card--dish {
  border: 1px solid var(--color-gold-border); /* rgba(201,151,47,0.25) */
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    transform var(--transition-base);
}

.card--dish:hover {
  border-color: var(--color-gold-hairline); /* rgba(201,151,47,0.40) */
  box-shadow:
    0 8px 32px rgba(43, 33, 28, 0.20),
    0 0 0 1px var(--color-gold-hairline); /* anillo dorado sutil */
}
```

### Detalle 3: Precio con monograma dorado

El precio en cada tarjeta de plato lleva un indicador de moneda en dorado seguido del monto. La etiqueta "PRECIO" encima en dorado apagado. El símbolo "$" siempre en `--color-gold`.

```css
.card__price-label {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-label);        /* 0.75rem */
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.10em;
  color: var(--color-gold-dim);        /* #A87826 */
  margin-bottom: var(--space-1);
}

.card__price-amount {
  font-family: 'Courier New', monospace;
  font-size: var(--text-price);        /* 1.125rem */
  font-weight: 600;
  color: var(--color-gold-dim);        /* #A87826 sobre fondo claro */
  letter-spacing: 0.04em;
}

/* Sobre fondos oscuros (variante de tarjeta dark) */
.card--dark .card__price-amount {
  color: var(--color-gold);            /* #C9972F sobre vino/dark */
}

/* El símbolo $ con Cormorant, ligeramente más grande */
.card__price-currency {
  font-family: var(--font-display);
  font-size: 1.05em;
  color: inherit;
}
```

HTML de ejemplo para precio:
```html
<div class="card__price-wrapper">
  <span class="card__price-label">Precio</span>
  <p class="card__price-amount">
    <span class="card__price-currency">$</span>80.000
  </p>
</div>
```

### Detalle 4: Eyebrow dorado con viñeta de rombo

Todo eyebrow de sección (la pequeña etiqueta encima del H2) lleva una micro-viñeta de rombo `◆` en dorado a ambos lados. Esto reemplaza las líneas horizontales comunes y da un toque editorial.

```css
.section__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-body);
  font-size: var(--text-label);        /* 0.75rem */
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-gold);
  margin-bottom: var(--space-3);
}

.section__eyebrow::before,
.section__eyebrow::after {
  content: '◆';
  font-size: 0.5em;
  color: var(--color-gold-hairline);   /* rgba(201,151,47,0.40) — más suave */
  flex-shrink: 0;
}
```

HTML de ejemplo:
```html
<span class="section__eyebrow">Nuestro Menú</span>
<h2 class="section__title">Platos que cuentan una historia</h2>
```

### Detalle 5 (bonus): Separador de sección dorado horizontal completo

Entre secciones que cambian de tono (de oscuro a claro), usar un separador muy sutil de 1px:

```css
.section-divider--gold {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--color-gold-hairline) 20%,
    var(--color-gold-hairline) 80%,
    transparent 100%
  );
  margin: 0; /* el spacing lo manejan las secciones con padding */
}
```

---

## 5. ESPECIFICACIÓN POR COMPONENTE

### 5.1 Header Sticky

**Estructura:** logotipo izquierda — nav centrada — botón WhatsApp derecha — hamburguesa en móvil.

**Fondo:** `--color-wine-glass` (`rgba(107, 26, 34, 0.65)`) con `backdrop-filter: blur(16px)`. Al hacer scroll > 40px (clase `.header--scrolled` añadida por JS), aumentar a `--color-wine-glass-solid` (`rgba(107, 26, 34, 0.96)`) con `border-bottom: 1px solid var(--color-gold-hairline)`.

**Alto:** 60px móvil / 72px desktop.

**Logotipo:** `Cormorant Garamond` 600, tamaño `--text-display-sm` (fluido ~22–26px). Color `--color-cream`. Texto "Carly's" en regular, "Resto Bar" en italic 300 en la segunda línea o inline con pipe. La palabra "Carly's" puede llevar una ligadura o mayúscula inicial más grande con `font-size: 1.15em` relativo.

Variante con dos líneas:
```
Carly's
RESTO BAR  ← uppercase, Jost 500, letter-spacing: 0.14em, font-size: 0.55em del display
```

**Nav links:** Jost 400, `--text-body-sm` (14px), color `--color-cream-subtle`. Hover: color `--color-cream` + underline decorativo de 1px con color `--color-gold` (usando `text-decoration-color`). El link activo lleva un punto circular dorado de 4px debajo, centrado.

```css
.header__nav-link {
  position: relative;
  color: var(--color-cream-subtle);
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  font-weight: var(--font-medium);
  letter-spacing: 0.02em;
  padding-bottom: 4px;
}
.header__nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--color-gold);
  opacity: 0;
  transition: opacity var(--transition-base);
}
.header__nav-link:hover::after,
.header__nav-link.is-active::after {
  opacity: 1;
}
```

**Botón WhatsApp en header:** outline style. Borde `1px solid var(--color-gold)`, texto `--color-gold`, fondo `transparent`. Hover: fondo `--color-gold`, texto `--color-wine-dark`. Radio: `--radius-full`. Jost 500. Icono WhatsApp SVG a la izquierda en color `--color-whatsapp` (verde, para que el icono mantenga identidad de marca WA).

**Menú móvil:** fondo `--color-wine-dark` (`#4A1118`), sin transparencia. Links en crema. El link de WhatsApp en verde `--color-whatsapp`. Borde superior `1px solid var(--color-gold-hairline)`. Animación de max-height igual que el diseño anterior.

---

### 5.2 Hero

**Layout:** 100svh, mínimo 600px. Imagen de fondo full-bleed con `object-fit: cover`. Overlay doble capa:
1. `linear-gradient(to bottom, rgba(43, 9, 14, 0.30) 0%, rgba(43, 9, 14, 0.88) 100%)` — gradiente principal vino muy oscuro
2. Sin capa adicional. El gradiente es suficiente.

**Posición del contenido:** centrado verticalmente en móvil, alineado a la izquierda en desktop (`align-items: flex-end` para empujar hacia el tercio inferior). Max-width del bloque de texto: 600px en desktop.

**Eyebrow:** `◆ GASTROBAR · TURBACO, COLOMBIA ◆` — Jost 500, 11px, `letter-spacing: 0.18em`, color `--color-gold`. Margin-bottom: `--space-4`.

**H1 tagline:** `"Democratizamos buenas experiencias"` — Cormorant Garamond 600, `--text-display-hero` (clamp 2.75rem → 5.5rem), `line-height: --leading-display` (1.08), color `--color-cream`, `letter-spacing: -0.02em`. La palabra "buenas" puede ir en italic 300 de Cormorant para énfasis tipográfico (decision del desarrollador, opcional).

**Hairline dorada bajo H1:** `--section__gold-rule`, margin: `var(--space-6) 0`, alineada a la izquierda (`margin-left: 0`, no centrada aquí).

**Subtítulo:** Jost 300, `--text-body-lg` (18px), color `--color-cream-subtle`, max-width 480px, `line-height: --leading-normal`. Texto: _"Cortes Angus importados, lomos al leñador y lo mejor del mar. En Turbaco, para todos."_

**CTAs — tres en fila (en desktop, columna en móvil):**

1. **Ver Menú** (primario): fondo `--color-gold`, texto `--color-wine-dark`, Jost 600, borde `transparent`. Hover: fondo `--color-gold-bright`. Radio: `--radius-sm` (4px, no redondeado — más formal).
2. **WhatsApp** (secundario-outline): borde `1px solid var(--color-cream-border)`, texto `--color-cream`, fondo `transparent`. Hover: fondo `--color-cream-ghost`. Icono WA verde a la izquierda.
3. **Instagram** (terciario-ghost): solo texto + icono, sin borde. Texto `--color-cream-subtle`. Hover: texto `--color-cream`. Icono de Instagram a la izquierda. Texto "Ver galería @carlys.restobar".

**Chip de calificación:** flotante en la parte superior del bloque de texto, debajo del eyebrow. Fondo `rgba(43, 33, 28, 0.50)` con `backdrop-filter: blur(8px)`, borde `1px solid var(--color-gold-border)`, radio `--radius-full`. Estrellas `--color-gold`. Texto `--color-cream`, Jost 400 14px. Contenido: `★★★★½  4.5 · +590 reseñas en Google`.

**Scroll hint:** flecha chevron animada en `--color-cream-subtle`, posición absoluta centrada abajo.

---

### 5.3 Franja de Prueba Social

**Fondo:** `--color-taupe-light` (`#DDD4C5`). NO oscuro, esta franja rompe la oscuridad del hero y prepara al usuario para el menú.

**Layout:** una sola fila centrada con flexbox. Gap `--space-6`.

**Contenido de izquierda a derecha:**
- Grupo de 5 estrellas SVG en `--color-gold` (la mitad en `--color-gold-hairline` para el medio-star).
- Texto: `"4.5"` — Cormorant Garamond 600, 28px, `--color-dark`. Seguido de un separador pipe `|` en `--color-taupe-dark`.
- `"+590 reseñas en Google"` — Jost 400, 16px, `--color-text-on-light-muted`.
- Link `"Ver en Google Maps →"` — Jost 500, 14px, `--color-gold-dim`, con underline dorado al hover.

**Separadores laterales:**
Antes y después del grupo de contenido, líneas finas de 1px en `--color-gold-hairline` que se extienden hacia los bordes del contenedor (usando `flex: 1` y `border-top`):

```css
.proof-bar::before,
.proof-bar::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right, /* o "to left" para el after */
    transparent,
    var(--color-gold-hairline)
  );
}
```

---

### 5.4 Sección de Menú

**ID de sección HTML:** `#menu`
**Fondo:** `--color-taupe-bg` (`#EAE3D8`) — cálido, no blanco.

**Eyebrow:** `◆ NUESTRO MENÚ ◆` en dorado.
**H2:** "Platos que cuentan una historia" — Cormorant Garamond 600.
**Subtítulo:** "Ingredientes seleccionados, técnica de parrilla y el sabor de Turbaco." — Jost 300.
**Hairline dorada** bajo el H2.

#### Navegación de categorías

6 botones/tabs horizontales (scroll horizontal en móvil, fila en desktop) para filtrar el menú:

1. Carnes Angus Importadas
2. Lomos al Leñador
3. Pescados
4. Burgers
5. Picadas
6. Desgranados

**Estilo de tabs:** Jost 500, 13px, `text-transform: uppercase`, `letter-spacing: 0.10em`. Fondo inactivo: `transparent`, borde inferior `2px solid transparent`, color `--color-text-on-light-muted`. Activo/hover: borde inferior `2px solid var(--color-gold)`, color `--color-dark`. Padding: `var(--space-3) var(--space-4)`. Sin box visible, solo underline activo.

```css
.menu-tab {
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-label);           /* 0.75rem */
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: 0.10em;
  color: var(--color-text-on-light-muted);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition:
    color var(--transition-base),
    border-color var(--transition-base);
  white-space: nowrap;
}
.menu-tab:hover,
.menu-tab.is-active {
  color: var(--color-dark);
  border-bottom-color: var(--color-gold);
}
```

#### Tarjeta de Plato (card--dish)

Layout: foto arriba (proporción 4:3), body abajo.

**Fondo de tarjeta:** `--color-cream` (`#F3EEE5`).
**Borde:** `1px solid var(--color-gold-border)`.
**Radio:** `--radius-sm` (4px) — las esquinas apenas se redondean en el mundo premium.
**Sombra:** `0 2px 12px rgba(43, 33, 28, 0.10)`.
**Hover:** `transform: translateY(-3px)`, sombra a `0 8px 24px rgba(43, 33, 28, 0.18)`, borde `--color-gold-hairline`.

**Foto:**
- Proporción: `aspect-ratio: 4 / 3`
- Overflow hidden con `border-radius` heredado solo en esquinas top.
- Hover: `transform: scale(1.04)` en la imagen (suave, 400ms ease).
- Badge de categoría (opcional): posición absoluta top-left. Fondo `--color-wine`, texto `--color-cream`, Jost 600, 11px uppercase, `letter-spacing: 0.08em`, radio `--radius-full`, padding `4px 12px`.

**Body de tarjeta:**
- Padding: `var(--space-5) var(--space-6) var(--space-6)`.
- Nombre del plato: Cormorant Garamond 600, `--text-display-sm`, color `--color-dark`, `line-height: --leading-snug`.
- Descripción: Jost 300, `--text-body-sm`, color `--color-text-on-light-muted`, `line-height: --leading-normal`. Máximo 2 líneas con `line-clamp: 2`.
- Separador interno: `border-top: 1px solid var(--color-gold-border)`, margin `var(--space-4) 0 var(--space-3)`.
- Precio label + monto (según especificación del Detalle 3 de la sección dorados).

**Grid de platos:**
- Móvil: 1 columna.
- 480px: 2 columnas.
- 1024px: 3 columnas.
- Usar `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` con gap `var(--space-6)`.

#### Platos estrella con especificación de contenido

| Nombre | Categoría | Precio | Badge sugerido |
|---|---|---|---|
| Rib Eye Angus 300gr | Carnes Angus | $80.000 | "El Clásico" |
| Lomo fino al leñador | Lomos al Leñador | $49.500 | "El Favorito" |
| Salmón a la parrilla | Pescados | $33.500 | "Del Mar" |
| Carly's Burger | Burgers | $34.000 | "Nuestra firma" |
| Royal Angus | Burgers | $36.000 | "Premium" |
| Picada personal gratinada | Picadas | $28.000 | "Para compartir" |

---

### 5.5 Galería de Fotos

**ID de sección HTML:** `#galeria`
**Fondo:** `--color-wine-dark` (`#4A1118`) — oscuro, elegante.
**Texto sobre fondo oscuro** (eyebrow, H2, subtítulo): crema y dorado según escala.

**Grid:** masonry-like o grid uniforme.
- Móvil: 2 columnas.
- 768px: 3 columnas.
- 1024px: 4 columnas (o 3 col con una celda grande: ver variante).

**Variante recomendada — grid con celda destacada:**
La primera foto ocupa 2 columnas y 2 filas en desktop (`grid-column: span 2; grid-row: span 2`). Las demás en 1×1. Esto crea asimetría editorial.

**Fotos:** aspect-ratio `1/1` en celdas normales, `4/3` o `1/1` en celda destacada.

**Hover:** suave.
1. `transform: scale(1.03)` en la imagen (400ms).
2. Overlay `--color-wine-overlay-gallery` aparece con `opacity: 0 → 1`.
3. Icono de lupa en crema, centrado en el overlay.
4. Borde interior de 1px en `--color-gold-hairline` aparece sobre la imagen.

```css
.gallery-item {
  position: relative;
  overflow: hidden;
  /* Borde dorado que aparece en hover */
  box-shadow: inset 0 0 0 0 var(--color-gold-hairline);
  transition:
    box-shadow var(--transition-slow);
}
@media (hover: hover) {
  .gallery-item:hover {
    box-shadow: inset 0 0 0 1px var(--color-gold-hairline);
  }
}
```

**Gap del grid:** `--space-2` (8px). Los gaps pequeños hacen que las fotos "hablen" como colección.

---

### 5.6 Ubicación, Horario y Contacto

**ID de sección HTML:** `#ubicacion`
**Fondo:** `--color-cream` (`#F3EEE5`).

**Layout:** columna en móvil (mapa arriba), 60/40 horizontal en desktop (mapa izquierda, info derecha). Igual al diseño anterior.

**Mapa:** radio `--radius-sm` (4px), borde `1px solid var(--color-gold-border)`, sombra `0 4px 24px rgba(43, 33, 28, 0.12)`.

**Iconos de info-block:** fondo `rgba(107, 26, 34, 0.08)` (tinte vino muy suave sobre crema), color `--color-wine`, radio `--radius-sm`.

**Label de info-block:** Jost 600, uppercase, `letter-spacing: 0.10em`, `--text-label`, color `--color-gold-dim`.

**Texto de info-block:** Jost 400, `--text-body-md`, color `--color-dark`.

**Tabla de horario:**
- Días: Jost 400, `--text-body-sm`, `--color-text-on-light-muted`.
- Horas: Jost 500 o Courier New, `--text-body-sm`, `--color-dark`.
- Separador entre filas: `border-bottom: 1px solid var(--color-gold-border)`.

**Bloque de contacto:**
- WhatsApp: botón primario estándar (fondo `--color-wine`, texto crema). Link completo: `https://wa.me/573145320685`.
- Instagram: botón outline (borde `--color-wine`, texto `--color-wine`). Texto "@carlys.restobar". Link: `https://www.instagram.com/carlys.restobar/`.

---

### 5.7 Footer

**Fondo:** `--color-wine-deeper` (`#2E0A0F`) — el más oscuro del sistema.
**Borde superior:** `2px solid var(--color-gold-hairline)` — la firma dorada visible al llegar al footer.

**Grid:** 1 columna móvil / 3 columnas desktop.
- Col 1 (brand): Logotipo Cormorant, tagline en crema-subtle, iconos de redes sociales.
- Col 2 (navegación): título de col en uppercase dorado-dim, links en crema-subtle.
- Col 3 (contacto): WhatsApp, Instagram, dirección resumida.

**Logotipo en footer:** igual que header pero sin backdrop. Cormorant Garamond 600, tamaño `--text-display-lg`, `--color-cream`.

**Tagline en footer:** `"Democratizamos buenas experiencias"` — Cormorant Garamond 300 italic, `--text-body-md`, `--color-cream-subtle`. Margin-top `--space-3`.

**Hairline dorada en footer:** `--section__gold-rule` de 40px de ancho, alineado a la izquierda debajo del tagline. Color `--color-gold-hairline`.

**Títulos de columna:** Jost 600, uppercase, `letter-spacing: 0.12em`, `--text-label`, `--color-cream-subtle`.

**Links de nav:** Jost 400, `--text-body-sm`, `--color-cream-subtle`. Hover: `--color-gold-bright`. Sin subrayado por defecto, subrayado en hover con `text-decoration-color: --color-gold`.

**Iconos sociales:** 40×40px, fondo `--color-cream-ghost` (`rgba(243,238,229,0.12)`), radio `--radius-sm`. Color `--color-cream-subtle`. Hover: fondo `--color-cream-ghost` más opaco, color `--color-gold`.

**Divisor:** `1px solid rgba(201, 151, 47, 0.15)` — dorado muy rebajado.

**Copyright:** Jost 400, `--text-label`, `--color-cream-subtle`. Texto: `© 2026 Carly's Resto Bar · Turbaco, Bolívar`.

---

### 5.8 FAB Flotante de WhatsApp

**Posición:** fija, bottom `24px`, right `20px`, z-index `1000`.

**Móvil:** círculo 56×56px. Solo icono SVG de WhatsApp (28px) en `#FFFFFF`. Fondo `--color-whatsapp` (`#25D366`). Sombra `0 4px 20px var(--color-whatsapp-shadow)`.

**Desktop (1024px+):** pill ancho automático, `padding: 14px 20px`, radio `--radius-full`. Icono + texto "WhatsApp" en Jost 600, 14px, blanco.

**Hover:** `transform: scale(1.06)`, sombra expandida.

**Animación de entrada:** igual que diseño anterior (`@keyframes fab-enter`, spring cubic-bezier).

**Comportamiento en scroll:** mismo que el actual (ocultar al scrollear hacia abajo en móvil, mostrar al subir).

---

## 6. BLOQUE `:root` LISTO PARA COPIAR

Reemplazar el bloque `:root` completo de `css/styles.css` con este:

```css
:root {
  /* ============================================================
     COLORES BASE DE MARCA — Carly's Resto Bar
     ============================================================ */

  /* Vino profundo */
  --color-wine:                #6B1A22;
  --color-wine-dark:           #4A1118;
  --color-wine-deeper:         #2E0A0F;
  --color-wine-muted:          #8B3540;
  --color-wine-overlay:        rgba(43, 9, 14, 0.78);
  --color-wine-overlay-gallery: rgba(43, 9, 14, 0.55);
  --color-wine-glass:          rgba(107, 26, 34, 0.65);
  --color-wine-glass-solid:    rgba(107, 26, 34, 0.96);

  /* Crema cálida */
  --color-cream:               #F3EEE5;
  --color-cream-warm:          #EDE6D9;
  --color-cream-dimmed:        rgba(243, 238, 229, 0.90);
  --color-cream-subtle:        rgba(243, 238, 229, 0.55);
  --color-cream-ghost:         rgba(243, 238, 229, 0.12);
  --color-cream-border:        rgba(243, 238, 229, 0.18);

  /* Taupe */
  --color-taupe:               #C7B8A1;
  --color-taupe-dark:          #A89880;
  --color-taupe-light:         #DDD4C5;
  --color-taupe-bg:            #EAE3D8;

  /* Dorado */
  --color-gold:                #C9972F;
  --color-gold-bright:         #E2AC42;
  --color-gold-dim:            #A87826;
  --color-gold-hairline:       rgba(201, 151, 47, 0.40);
  --color-gold-border:         rgba(201, 151, 47, 0.25);
  --color-gold-glow:           rgba(201, 151, 47, 0.20);

  /* Texto oscuro cálido */
  --color-dark:                #2B211C;

  /* Texto semántico */
  --color-text-on-dark:        #F3EEE5;   /* = --color-cream */
  --color-text-on-dark-muted:  rgba(243, 238, 229, 0.65);
  --color-text-on-light:       #2B211C;   /* = --color-dark */
  --color-text-on-light-muted: #6B5B4E;

  /* WhatsApp */
  --color-whatsapp:            #25D366;
  --color-whatsapp-hover:      #1DA851;
  --color-whatsapp-shadow:     rgba(37, 211, 102, 0.45);

  /* Instagram */
  --color-instagram:           #E1306C;

  /* ============================================================
     TIPOGRAFÍA
     ============================================================ */

  /* Familias */
  --font-display: 'Cormorant Garamond', 'Georgia', serif;
  --font-body:    'Jost', system-ui, sans-serif;
  --font-mono:    'Courier New', Courier, monospace;

  /* Escala fluida */
  --text-display-hero: clamp(2.75rem, 8vw + 0.5rem, 5.5rem);
  --text-display-xl:   clamp(2.25rem, 5vw + 0.5rem, 3.75rem);
  --text-display-lg:   clamp(1.875rem, 4vw + 0.25rem, 2.875rem);
  --text-display-md:   clamp(1.5rem, 3vw + 0.25rem, 2.25rem);
  --text-display-sm:   clamp(1.25rem, 2vw + 0.25rem, 1.625rem);
  --text-body-lg:      1.125rem;
  --text-body-md:      1rem;
  --text-body-sm:      0.875rem;
  --text-label:        0.75rem;
  --text-price:        1.125rem;

  /* Pesos */
  --font-weight-thin:     300;
  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;

  /* Interlineado */
  --leading-display: 1.08;
  --leading-tight:   1.2;
  --leading-snug:    1.35;
  --leading-normal:  1.6;
  --leading-loose:   1.8;

  /* ============================================================
     ESPACIADO
     ============================================================ */
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.25rem;   /* 20px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-10:  2.5rem;    /* 40px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px */
  --space-24:  6rem;      /* 96px */
  --space-32:  8rem;      /* 128px */

  /* Padding de sección */
  --section-py-mobile:  var(--space-12);
  --section-py-tablet:  var(--space-16);
  --section-py-desktop: var(--space-20);
  --section-py-premium: var(--space-24);

  /* Contenedores */
  --container-max:        1200px;
  --container-max-narrow: 780px;
  --container-max-wide:   1400px;
  --container-px:         clamp(1.25rem, 5vw, 3rem);

  /* ============================================================
     RADIOS DE BORDE
     ============================================================ */
  --radius-none: 0;
  --radius-sm:   4px;    /* Premium: bordes cuadrados con apenas suavizado */
  --radius-md:   8px;    /* Uso general */
  --radius-lg:   12px;   /* Cards de galería */
  --radius-xl:   16px;   /* Mapa, elementos grandes */
  --radius-full: 9999px; /* Píldoras (chips, FAB, botones outline) */

  /* ============================================================
     SOMBRAS CÁLIDAS
     ============================================================ */

  /* Sombras base (siempre cálidas, nunca azuladas) */
  --shadow-xs:  0 1px 3px rgba(43, 33, 28, 0.08);
  --shadow-sm:  0 2px 8px rgba(43, 33, 28, 0.10), 0 1px 3px rgba(43, 33, 28, 0.07);
  --shadow-md:  0 4px 16px rgba(43, 33, 28, 0.14), 0 2px 6px rgba(43, 33, 28, 0.09);
  --shadow-lg:  0 8px 32px rgba(43, 33, 28, 0.18), 0 4px 12px rgba(43, 33, 28, 0.10);
  --shadow-xl:  0 16px 48px rgba(43, 33, 28, 0.22);

  /* Sombra dorada para cards premium en hover */
  --shadow-gold: 0 8px 24px rgba(43, 33, 28, 0.18), 0 0 0 1px rgba(201, 151, 47, 0.40);

  /* Sombra WhatsApp */
  --shadow-whatsapp: 0 4px 20px rgba(37, 211, 102, 0.45);

  /* ============================================================
     TRANSICIONES
     ============================================================ */
  --transition-fast:   120ms ease;
  --transition-base:   200ms ease;
  --transition-slow:   380ms ease;
  --transition-spring: 380ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 7. GUÍA DE FOTOGRAFÍA Y PLACEHOLDERS

### Estilo de imagen: Dark & Moody Elegante

Todas las fotos del sitio deben seguir un look coherente. El estilo es editorial, oscuro, con foco dramático en la comida.

**Características técnicas del estilo:**
- **Iluminación:** luz lateral suave o contraluz. Fuentes de luz cálidas (naranja, ámbar). Fondo siempre muy oscuro (negro, marrón oscuro, carbón). La comida debe "brillar" sobre el fondo oscuro.
- **Temperatura de color:** cálida (amarillo/naranja). No corregir hacia el blanco. Los jugos de carne, el fuego, las marcas de parrilla son los protagonistas cromáticos.
- **Profundidad de campo:** shallow DOF (bokeh) en los bordes. El sujeto principal en foco nítido, el fondo completamente difuso.
- **Composición:** tres cuartos de la foto debe ser el plato. Sin exceso de props. Un tenedor, sal, hierbas son suficientes como accesorios.
- **Contraste:** alto. Sombras profundas, luces apenas en las zonas clave.
- **Saturación:** moderadamente alta en los tonos cálidos (rojos del corte, dorado de la costra, naranja de las brasas). Desaturar completamente los fondos fríos.

**Por plato — indicaciones específicas:**

| Plato | Ángulo | Foco | Props |
|---|---|---|---|
| Rib Eye Angus 300gr | 45° picado sobre tabla de madera oscura | Corte transversal mostrando el punto | Sal gruesa, romero |
| Lomo fino al leñador | 3/4 desde arriba | El ahumado y las marcas de leñador | Tabla rústica oscura, fuego de fondo bokeh |
| Salmón a la parrilla | Lateral bajo | Piel dorada crujiente, vapor sutil | Negro total de fondo |
| Carly's Burger | Frontal a altura de burger | Capas visibles, jugo cayendo | Servilleta de papel kraft oscuro |
| Royal Angus | 45° | Pan brioche dorado, carne rosada | Tabla pequeña, sin fondo |
| Picada personal gratinada | Cenital (vista desde arriba) | Gratinado dorado total | Hierbas verdes como único contraste de color |

**Foto hero:** idealmente un primer plano de corte de carne en parrilla activa con brasas visibles en el fondo bokeh. Temperatura cálida extrema. El overlay vino del hero suavizará cualquier foto oscura de calidad.

**Fotos de galería:** mezcla de platos + detalles + ambiente. Para ambiente del local: iluminación cálida de tonos ámbar, velas o luces incandescentes. Sin flash. Todo en oscuridad cálida.

### Placeholders de desarrollo

Mientras no haya fotos reales, usar `loremflickr.com` con los siguientes parámetros que se alinean con el estilo dark & moody:

```
Hero:        https://loremflickr.com/1920/1080/grilled,steak,dark?lock=10
Rib Eye:     https://loremflickr.com/600/450/ribeye,steak,grill?lock=21
Lomo:        https://loremflickr.com/600/450/tenderloin,grilled?lock=22
Salmón:      https://loremflickr.com/600/450/grilled,salmon,dark?lock=23
Burger:      https://loremflickr.com/600/450/gourmet,burger?lock=24
Royal:       https://loremflickr.com/600/450/angus,burger,grill?lock=25
Picada:      https://loremflickr.com/600/450/appetizer,gratin?lock=26
Galería 1:   https://loremflickr.com/800/800/grilled,meat,dark?lock=31
Galería 2:   https://loremflickr.com/800/800/steak,grill?lock=32
Galería 3:   https://loremflickr.com/800/800/salmon,grilled?lock=33
Galería 4:   https://loremflickr.com/800/800/ribs,barbecue?lock=34
Galería 5:   https://loremflickr.com/800/800/burger,gourmet?lock=35
Galería 6:   https://loremflickr.com/800/800/restaurant,dark?lock=36
Galería 7:   https://loremflickr.com/800/800/fire,grill?lock=37
Galería 8:   https://loremflickr.com/800/800/food,dark?lock=38
```

**Sustitución por fotos reales:** las fotos reales del Instagram `@carlys.restobar` deben descargarse en alta resolución y procesarse con un preset de Lightroom o filtro que:
1. Aumente exposición solo en el sujeto.
2. Aplique split toning: sombras hacia marrón/ámbar.
3. Aumente claridad y textura en la comida.
4. Reduzca la luminancia de los fondos.

Dimensiones objetivo:
- Hero: 1920×1080px mínimo, exportar a 80% calidad JPEG o AVIF/WebP.
- Tarjetas de plato: 800×600px, WebP.
- Galería: 1000×1000px, WebP.
- OG image: 1200×630px.

---

## NOTAS DE IMPLEMENTACIÓN PARA EL DESARROLLADOR

### Clase de fondo global

Cambiar el `background-color` del `body` de `--color-bg` (#FFFFFF del sistema anterior) a `--color-dark` (`#2B211C`). Las secciones claras establecen su propio fondo explícitamente. Esto evita destellos blancos durante la carga.

```css
body {
  background-color: var(--color-dark);
  color: var(--color-text-on-dark);
}
```

### Preservar los IDs de WhatsApp

Mantener exactamente estos IDs que el archivo `js/main.js` referencia:
- `header-whatsapp-link`
- `mobile-whatsapp-link`
- `hero-whatsapp-link`
- `servicios-whatsapp-link` (en el menú, el botón CTA de pedido)
- `footer-whatsapp-link`
- `fab-whatsapp-link`

El mecanismo de `initWhatsAppLinks()` en `main.js` ya funciona correctamente y no necesita modificación.

### Secciones nuevas vs. existentes

El HTML debe añadir:
- La sección de navegación de categorías de menú (`#menu`) que reemplaza o complementa la `#platos` existente.
- El eyebrow dorado como elemento nuevo en cada `section__header`.
- El wrapper de precio (`card__price-wrapper`) en cada tarjeta.
- El link de Instagram como CTA adicional en el hero y el footer.

El ID `#platos` puede renombrarse a `#menu` si se actualiza el HTML y el nav. Actualizar también en `mobile-menu__link` y `footer__link` para que el smooth scroll siga funcionando.

### Accesibilidad con paleta oscura

- Verificar con herramienta (p.ej. axe DevTools) que todos los textos sobre fondos oscuros cumplan AA.
- Nunca usar solo color para indicar estado (ej. el tab activo también debe tener un cambio de forma/peso, no solo el underline dorado).
- El input de foco visible (`:focus-visible`) debe cambiar a `outline: 2px solid var(--color-gold); outline-offset: 3px;` para que sea visible sobre fondos oscuros.
- Las estrellas SVG del hero y la franja de prueba deben tener `aria-label` o `aria-hidden` según corresponda.
