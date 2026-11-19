# DESIGN.md — Wakava Café Restobar
## Sistema Visual · Identidad Teal/Dorado

---

## 1. Concepto de Marca

Wakava Café Restobar es un destino de día completo en Turbaco, Bolívar. Café de mañana, brunch festivo, almuerzos ejecutivos, tardes de cocteles y noches de mariscos. No es una cafetería ni un restaurante clásico — es un espacio que siente el Caribe sin gritarlo. La identidad visual traduce esa tensión: el teal profundo del mar tropical, el dorado de la luz a las cinco de la tarde, la crema cálida de la madera y el lino. Refinado sin ser frío. Caribeño sin ser folclórico.

**Tagline oficial:** El Caribe Aquí  
**Subtítulo de posicionamiento:** Café · Restobar · Turbaco  
**Personalidad de marca:** Sereno, cálido, con carácter propio. El lugar que se siente como descubrimiento.

---

## 2. Paleta de Color

### 2.1 Colores base

| Token CSS | Nombre | Hex | Rol principal |
|---|---|---|---|
| `--color-teal` | Teal profundo | `#1A4A5C` | Fondos dominantes, header, hero, superficies de peso |
| `--color-gold` | Dorado fino | `#C9A84C` | Marcos, líneas divisoras, precios, acentos activos |
| `--color-cream` | Crema cálida | `#F5EFE0` | Fondo claro principal, texto sobre oscuro |
| `--color-petrol` | Verde petróleo | `#1D3D3D` | Footer, menú ejecutivo, fondos alternativos oscuros |

**Regla absoluta:** Nunca `#FFFFFF` puro como fondo. Nunca `#000000` puro como texto. Toda superficie "blanca" usa `--color-cream`. Todo texto "negro" usa `--color-teal` o `--color-petrol`.

### 2.2 Familias derivadas — Teal

```css
--color-teal-900: #0D2530;   /* Sombras profundas, capas base */
--color-teal-800: #122F3D;   /* Hover de superficies teal */
--color-teal-700: #1A4A5C;   /* BASE — color-teal */
--color-teal-600: #205970;   /* Focus rings, bordes activos */
--color-teal-500: #2A7394;   /* Íconos sobre fondo claro, links */
--color-teal-400: #3D90B0;   /* Estados hover en texto teal */
--color-teal-300: #7BBCD0;   /* Placeholders, texto deshabilitado */
--color-teal-200: #B8DCE8;   /* Bordes sutiles sobre crema */
--color-teal-100: #DCF0F7;   /* Fondos de hover muy suaves */
--color-teal-50:  #F0F8FB;   /* Superficies casi invisibles */
```

### 2.3 Familias derivadas — Dorado

```css
--color-gold-900: #5C3D0A;   /* Texto dorado oscuro, sombras doradas */
--color-gold-800: #8A5C12;   /* Dorado profundo */
--color-gold-700: #B08030;   /* Dorado medio */
--color-gold-600: #C9A84C;   /* BASE — color-gold */
--color-gold-500: #D4B86A;   /* Dorado suavizado, badges secundarios */
--color-gold-400: #E0CA8A;   /* Dorado pálido, backgrounds de badge */
--color-gold-300: #ECDAAA;   /* Líneas muy sutiles */
--color-gold-200: #F3E9C8;   /* Fondos dorados casi invisibles */
--color-gold-100: #FAF4E4;   /* Hover sobre crema con tono dorado */
```

### 2.4 Familias derivadas — Crema

```css
--color-cream-950: #2A1E08;  /* Texto oscuro sobre fondos crema */
--color-cream-900: #3D2C0F;  /* Títulos sobre crema */
--color-cream-800: #5A4020;  /* Texto secundario oscuro */
--color-cream-700: #7A5830;  /* Texto terciario */
--color-cream-600: #A07848;  /* Texto meta, etiquetas */
--color-cream-500: #C89A68;  /* Bordes cálidos */
--color-cream-400: #DDBF90;  /* Bordes muy suaves */
--color-cream-300: #EDD9B8;  /* Fondos de tarjeta sobre crema */
--color-cream-200: #F5EFE0;  /* BASE — color-cream */
--color-cream-100: #FAF6EE;  /* Superficies aún más claras */
--color-cream-50:  #FDFAF5;  /* Casi blanco cálido */
```

### 2.5 Familias derivadas — Petróleo

```css
--color-petrol-950: #080F0F;  /* Casi negro profundo */
--color-petrol-900: #0E1D1D;  /* Negro petróleo */
--color-petrol-800: #152828;  /* Fondo muy oscuro */
--color-petrol-700: #1D3D3D;  /* BASE — color-petrol */
--color-petrol-600: #265050;  /* Hover de superficies petróleo */
--color-petrol-500: #306464;  /* Bordes sobre petróleo */
--color-petrol-400: #4A8585;  /* Texto sobre petróleo */
--color-petrol-300: #7AACAC;  /* Texto secundario sobre petróleo */
--color-petrol-200: #AACCCC;  /* Bordes sutiles sobre petróleo */
--color-petrol-100: #D5E8E8;  /* Texto muy tenue sobre petróleo */
```

### 2.6 Colores funcionales

```css
--color-whatsapp:       #25D366;
--color-whatsapp-dark:  #1DA851;
--color-success:        #2D8A5F;
--color-error:          #C84B4B;
--color-overlay-teal:   rgba(26, 74, 92, 0.75);
--color-overlay-petrol: rgba(29, 61, 61, 0.80);
--color-gold-line:      rgba(201, 168, 76, 0.40);  /* Líneas doradas finas */
--color-gold-glow:      rgba(201, 168, 76, 0.20);  /* Sombras doradas */
--color-shadow-dark:    rgba(13, 37, 48, 0.35);
--color-shadow-medium:  rgba(13, 37, 48, 0.20);
--color-shadow-light:   rgba(13, 37, 48, 0.10);
```

---

## 3. Tipografía

### 3.1 Familias

**Display / Títulos principales:** `Playfair Display`  
- Pesos: 700, 900  
- Carácter: serif clásico con modulación de trazo marcada. Evoca menús de restaurante de categoría, hoteles boutique, cultura caribeña culta. Distinta de Cormorant Garamond (Carly's) y DM Serif Display (Wakava viejo).  
- Uso: H1 hero, títulos de sección, nombre del establecimiento en logo.

**Script / Acentos cálidos:** `Dancing Script`  
- Peso: 700  
- Carácter: cursiva manuscrita fluida pero legible. Firma visual para el tagline "El Caribe Aquí", etiquetas especiales, nombres de bebidas.  
- Uso: tagline hero, badges "Especial", etiquetas de carta de cócteles.

**Cuerpo / UI:** `DM Sans`  
- Pesos: 300, 400, 500, 600  
- Carácter: sans humanista con buena legibilidad en pantalla pequeña. Moderna sin ser fría. Sin los defectos de Inter en letra pequeña.  
- Uso: Todo el cuerpo de texto, navegación, botones, precios, metadatos.

### 3.2 Google Fonts — embed único

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
```

### 3.3 Escala tipográfica

```css
/* Display */
--text-display-xl: clamp(3.5rem, 8vw + 1rem, 7rem);    /* H1 hero */
--text-display-lg: clamp(2.5rem, 5vw + 1rem, 4.5rem);  /* H2 secciones */
--text-display-md: clamp(2rem, 3.5vw + 0.5rem, 3rem);  /* H3 subsecciones */
--text-display-sm: clamp(1.5rem, 2.5vw + 0.25rem, 2rem); /* H4 */

/* Script */
--text-script-xl: clamp(2rem, 4vw, 3.5rem);  /* Tagline hero */
--text-script-lg: clamp(1.5rem, 2.5vw, 2.5rem); /* Subtítulo hero */
--text-script-md: clamp(1.125rem, 1.5vw, 1.5rem); /* Badges, etiquetas */

/* Cuerpo */
--text-body-xl:  1.25rem;    /* Lead / intro texto */
--text-body-lg:  1.125rem;   /* Texto principal cómodo */
--text-body-md:  1rem;       /* Texto base */
--text-body-sm:  0.9rem;     /* Texto secundario, captions */
--text-body-xs:  0.8rem;     /* Meta, badges, labels muy pequeños */

/* UI */
--text-ui-nav:   0.875rem;   /* Nav links */
--text-ui-btn:   0.9375rem;  /* Texto botones */
--text-ui-label: 0.75rem;    /* Labels de formulario, tabs */
--text-ui-price: 1.125rem;   /* Precios en cards */
```

### 3.4 Line heights y letter spacing

```css
--lh-tight:   1.1;   /* Títulos display grandes */
--lh-snug:    1.25;  /* Títulos medianos */
--lh-normal:  1.45;  /* Cuerpo de texto */
--lh-relaxed: 1.65;  /* Texto largo, descripciones */

--ls-tight:   -0.03em;  /* Títulos display grandes */
--ls-snug:    -0.015em; /* Títulos medianos */
--ls-normal:  0;        /* Cuerpo */
--ls-wide:    0.05em;   /* Labels uppercase, nav */
--ls-wider:   0.1em;    /* Eyebrows, badges */
--ls-widest:  0.15em;   /* Logotipo, marcas */
```

---

## 4. Espaciado y Layout

### 4.1 Escala de espaciado

```css
--space-1:  0.25rem;   /*  4px */
--space-2:  0.5rem;    /*  8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-5:  1.25rem;   /* 20px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### 4.2 Padding de sección

```css
--section-py: clamp(4rem, 8vw, 7rem);  /* Padding vertical estándar de sección */
--section-px: clamp(1.25rem, 5vw, 3rem); /* Padding horizontal */
```

### 4.3 Contenedor

```css
--container-max:  1200px;
--container-wide: 1440px;
--container-narrow: 768px;
```

### 4.4 Border radius

```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   12px;
--radius-xl:   20px;
--radius-2xl:  32px;
--radius-full: 9999px;
```

---

## 5. Sombras

```css
--shadow-sm:   0 1px 3px var(--color-shadow-light), 0 1px 2px var(--color-shadow-medium);
--shadow-md:   0 4px 12px var(--color-shadow-medium), 0 2px 4px var(--color-shadow-light);
--shadow-lg:   0 10px 30px var(--color-shadow-dark), 0 4px 8px var(--color-shadow-medium);
--shadow-xl:   0 20px 50px var(--color-shadow-dark);
--shadow-gold: 0 4px 20px var(--color-gold-glow), 0 2px 8px var(--color-gold-glow);
--shadow-card: 0 2px 16px var(--color-shadow-medium), 0 1px 4px var(--color-shadow-light);
--shadow-card-hover: 0 8px 32px var(--color-shadow-dark), 0 2px 8px var(--color-shadow-medium);
```

---

## 6. Transiciones y Animaciones

```css
--transition-fast:   150ms ease;
--transition-base:   300ms ease;
--transition-slow:   500ms ease;
--transition-reveal: 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

**Principio:** CSS primero. JS solo para IntersectionObserver y lógica de tabs. Sin GSAP ni librerías de animación externas.

**Scroll reveal:** Clase `.reveal` → `.is-visible` via IntersectionObserver en main.js.
- Estado inicial: `opacity: 0; transform: translateY(24px);`
- Estado visible: `opacity: 1; transform: none;`
- Duración: `var(--transition-reveal)` con delays escalonados en grids.

---

## 7. Detalle de Marca #1 — Marcos Geométricos Dorados

Los marcos son el elemento visual distintivo de Wakava. Evocan los menús físicos de restaurante de categoría con cantoneras doradas. Se implementan con CSS puro usando `::before` y `::after`.

### 7.1 Especificación técnica

El marco forma una "L" dorada en cada esquina del elemento. Cada esquina tiene dos segmentos perpendiculares de `2px` de grosor y `24px` de largo por defecto (variable por tamaño de aplicación).

```css
.frame-gold {
  position: relative;
}

.frame-gold::before,
.frame-gold::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: var(--color-gold);
  border-style: solid;
  pointer-events: none;
  transition: var(--transition-base);
}

/* Esquina superior izquierda — ::before */
.frame-gold::before {
  top: 0;
  left: 0;
  border-width: 2px 0 0 2px;
}

/* Esquina inferior derecha — ::after */
.frame-gold::after {
  bottom: 0;
  right: 0;
  border-width: 0 2px 2px 0;
}
```

Para las 4 esquinas se usa un wrapper `.card__inner` dentro del contenedor. El contenedor `.card--star` tiene los ::before/::after (top-left + bottom-right) y el `.card__inner` tiene los suyos (top-right + bottom-left), creando las 4 esquinas completas.

### 7.2 Variantes de tamaño

```css
--frame-size-sm: 16px;   /* Badges, elementos pequeños */
--frame-size-md: 24px;   /* Cards de platos estándar */
--frame-size-lg: 40px;   /* Bloque hero, secciones grandes */
--frame-thickness: 2px;  /* Grosor de línea estándar */
```

### 7.3 Aplicación

- **Cards de platos estrella:** Marco dorado con 4 esquinas. En hover: `opacity: 1` desde `0.6`, la card se eleva `translateY(-4px)`.
- **Bloque de texto hero:** Marco grande en las 4 esquinas enmarcando el H1 + tagline + CTAs.
- **Tarjetas de carta:** Marco visible solo en hover (transición suave de opacidad).

---

## 8. Detalle de Marca #2 — Líneas Doradas Finas

```css
--divider-gold: 1px solid var(--color-gold-line);  /* rgba(201,168,76,0.40) */
```

Uso:
- Separación entre secciones del footer.
- Borde inferior del header en estado scrolled.
- Borde superior de `.card--dish__footer` (precio + CTA).
- Separador entre columnas de info (menú ejecutivo, horarios).

---

## 9. Componentes — Especificación Detallada

### 9.1 Header

**Estructura:**
```
<header#header>
  ├── .header__brand → logo texto
  ├── <nav>.header__nav → links desktop
  ├── .header__actions → CTA WhatsApp desktop + hamburguesa
  └── #mobile-menu → nav móvil overlay
```

**Estados:**
- **Default (top de página):** `background: transparent`, `backdrop-filter: none`. Logo y nav en crema.
- **Scrolled (scrollY > 60):** Clase `.header--scrolled` añadida por JS. `background: rgba(26,74,92,0.95)`, `backdrop-filter: blur(12px)`, `border-bottom: var(--divider-gold)`.

**Tipografía del logo:**
- "Wakava" — Playfair Display 700, `clamp(1.5rem, 3vw, 2rem)`, crema
- "CAFÉ RESTOBAR" — DM Sans 500, `0.65rem`, letter-spacing `0.2em`, dorado, uppercase, block debajo del nombre

**Nav links desktop:**
- DM Sans 500, `0.875rem`, letter-spacing `0.05em`, uppercase
- Color: `rgba(245,239,224,0.8)` default → `--color-cream` hover
- Indicador activo: línea dorada de `2px` debajo, color dorado
- Clase `.is-active` para la sección en viewport

**Botón WhatsApp header:**
- Fondo dorado `--color-gold`, texto petróleo `--color-petrol`
- `border-radius: var(--radius-full)`, padding `0.4rem 1rem`
- Texto: "Pedir" con ícono WhatsApp SVG
- Oculto en móvil (visible solo desktop)

**Menú móvil overlay:**
- `position: fixed; inset: 0; z-index: 999`
- Fondo: `--color-petrol` opaco
- Links grandes centrados, Playfair Display 700
- Botón cerrar top-right, crema
- Transición: `transform: translateX(100%)` → `translateX(0)`

### 9.2 Hero

**Layout:** Fullscreen `min-height: 100svh`. Columna centrada con texto. Fondo con imagen + overlay.

**Fondo:**
- Imagen: placeholder loremflickr `https://loremflickr.com/1440/900/restaurant,caribbean?lock=1` (REEMPLAZAR con foto real de Wakava)
- Overlay: `linear-gradient(180deg, var(--color-overlay-teal) 0%, rgba(26,74,92,0.85) 100%)`

**Contenido (centrado vertical y horizontal):**
```
[eyebrow Dancing Script] "Turbaco · Bolívar"
[H1 Playfair Display 900] "El Caribe Aquí"
[subtítulo DM Sans 300] "Café · Restobar · Turbaco"
[CTAs: botón dorado + botón ghost]
[scroll indicator]
```

**Eyebrow:** Dancing Script 700, `clamp(1.25rem, 2vw, 1.75rem)`, `--color-gold`, `letter-spacing: 0.02em`. Sin uppercase (la cursiva lo da).

**H1:** Playfair Display 900, `var(--text-display-xl)`, `--color-cream`, `line-height: var(--lh-tight)`, `letter-spacing: var(--ls-tight)`. Texto en dos líneas en móvil, una en desktop.

**Subtítulo:** DM Sans 300, `var(--text-body-lg)`, `rgba(245,239,224,0.8)`, `letter-spacing: var(--ls-wide)`, uppercase.

**CTAs:**
- Primario "Ver Menú": fondo `--color-gold`, texto `--color-petrol`, DM Sans 600, `border-radius: var(--radius-full)`
- Secundario "Pedir por WhatsApp": borde `2px solid rgba(201,168,76,0.6)`, texto crema, ghost. En hover: fondo dorado translúcido.

**Marco hero:** El bloque de texto (eyebrow + H1 + subtítulo + CTAs) está envuelto en `.hero__frame-wrap` con el marco geométrico dorado de 4 esquinas, tamaño `--frame-size-lg`.

**Scroll indicator:** `.hero__scroll` centrado en bottom. Dorado, chevron animado con `translateY` loop.

### 9.3 Platos Estrella

**Eyebrow de sección:** DM Sans 600, uppercase, `letter-spacing: var(--ls-wider)`, dorado. "LO QUE TODOS PIDEN"

**Título de sección:** Playfair Display 700, `var(--text-display-lg)`, teal `--color-teal`.

**Grid de cards:**
- Móvil: 1 columna
- ≥ 640px: 2 columnas
- ≥ 1024px: 3 columnas
- Gap: `var(--space-8)`

**Anatomía de `.card--star`:**
```
.card--star
  ├── .card--star__image-wrap
  │     ├── <img> con src loremflickr
  │     └── .card--star__badge (categoría)
  └── .card--star__body
        ├── .card--star__name (H3)
        ├── .card--star__desc (p)
        └── .card--star__footer
              ├── .card--star__price
              └── .card--star__cta (link WhatsApp)
```

**Estilos de card:**
- Fondo: `--color-cream-50`
- Border: `1px solid var(--color-cream-300)`
- Border-radius: `var(--radius-lg)`
- Overflow: hidden
- Box-shadow: `var(--shadow-card)`
- En hover: `box-shadow: var(--shadow-card-hover)`, `transform: translateY(-4px)`, transición `300ms ease`
- Marco geométrico dorado: 4 esquinas visibles en todo momento (opacity 0.6 → 1 en hover)

**Imagen:**
- Aspect-ratio: `4/3`
- Object-fit: cover
- Transición en hover: `transform: scale(1.05)`

**Badge de categoría:**
- Position: absolute, top-right de la imagen
- Fondo: `--color-teal`, texto `--color-cream`, DM Sans 600, `0.7rem`, uppercase, `letter-spacing: 0.1em`
- Border-radius: `var(--radius-sm)`
- Padding: `0.25rem 0.6rem`

**Nombre del plato (H3):**
- Playfair Display 700, `clamp(1.25rem, 2vw, 1.5rem)`, color `--color-teal-900`

**Descripción:**
- DM Sans 400, `0.9rem`, color `--color-cream-600`, line-height `1.55`

**Precio:**
- DM Sans 600, `1.125rem`, `--color-gold-600`
- Borde superior: `var(--divider-gold)`
- Padding-top: `var(--space-3)`

**CTA de card:**
- DM Sans 500, `0.875rem`, teal `--color-teal-500`
- "Pedir este plato →"
- En hover: dorado

**Platos a incluir (6 total):**

| # | Nombre | Precio | Categoría | Descripción breve |
|---|---|---|---|---|
| 1 | Mar de Wakava | $79.000 | Del Mar | Bandeja de mariscos mixtos al ajillo con patacones y arroz de coco |
| 2 | Apanados del Caribe | $50.000 | Del Mar | Apanados de camarón y pescado fresco, salsa tártara y ensalada |
| 3 | Waffle de Huevos Benedictinos | $30.000 | Brunch | Waffle crujiente, huevos pochados, jamón serrano y salsa holandesa |
| 4 | Cacerola Wakava | $35.000 | Para Compartir | Cacerola de cerdo con vegetales, papa criolla y hogao artesanal |
| 5 | Margarita Flor de Jamaica | $28.000 | Cócteles | Tequila, hibisco, triple sec y limón. Sal de hibisco en el borde |
| 6 | Crepe de Mariscos | $55.000 | Crepes | Crepe fino relleno de camarones, calamar y salsa de tomate fresco |

**Loremflickr seeds:**
1. `https://loremflickr.com/600/450/seafood,plate?lock=11`
2. `https://loremflickr.com/600/450/shrimp,fried?lock=12`
3. `https://loremflickr.com/600/450/waffle,eggs?lock=13`
4. `https://loremflickr.com/600/450/casserole,pork?lock=14`
5. `https://loremflickr.com/600/450/cocktail,hibiscus?lock=15`
6. `https://loremflickr.com/600/450/crepe,seafood?lock=16`

### 9.4 Carta Completa — Tabs

**Tabs:**
- Categorías (valores de `data-cat`): `brunch`, `compartir`, `platos-fuertes`, `crepes`, `bebidas`, `cocteles`, `cafeteria`
- Labels: Brunch · Para Compartir · Platos Fuertes · Crepes & Arroces · Bebidas · Cócteles · Cafetería
- Contenedor: `display: flex; flex-wrap: wrap; gap: var(--space-2)`
- Tab elemento: DM Sans 500, `0.8rem`, uppercase, `letter-spacing: 0.08em`, padding `0.5rem 1.2rem`
- Tab inactivo: borde `1px solid var(--color-cream-400)`, fondo transparente, texto `--color-cream-600`
- Tab activo (`.menu-tab.is-active`): borde dorado, texto dorado, fondo `var(--color-gold-200)`, `border-bottom: 2px solid var(--color-gold)`
- Tab hover: borde dorado translúcido

**Grid de cards de carta:**
- Mismo grid que platos estrella
- `.card--dish[data-categoria="..."]`
- `display: none` por defecto, `display: flex` cuando coincide con tab activo

**Card de carta (versión compacta, sin imagen en la mayoría):**
- Fondo `--color-cream-50`, borde `1px solid var(--color-cream-300)`
- Padding `var(--space-5) var(--space-6)`
- Nombre: Playfair Display 700, teal
- Descripción: DM Sans 400 pequeño, `--color-cream-600`
- Precio: DM Sans 600, dorado, borde superior dorado fino

**Estado vacío:** `#menu-empty` visible solo cuando filtro no encuentra resultados.

**CTA final:** `#carta-whatsapp-link` — botón "Hacer pedido por WhatsApp" centrado, estilo dorado.

### 9.5 Menú Ejecutivo

**Fondo:** `--color-petrol`

**Eyebrow:** DM Sans 600 uppercase, dorado.

**Título:** Playfair Display 900, `--color-cream`.

**Badge de precio:** Dancing Script 700, `clamp(2rem,4vw,3rem)`, dorado. "Desde $22.000"

**Subtítulo:** DM Sans 400, `--color-petrol-300`, "Cambia cada día · Lunes a Viernes · Almuerzo"

**Grid de incluidos:** 5 columnas desktop, 2-3 tablet, 1 móvil.

| Ítem | Ejemplo |
|---|---|
| Sopa del día | Sopa de mondongo con yuca |
| Principio | Arroz blanco + fríjoles o lentejas |
| Plato fuerte | Filete de tilapia con vegetales |
| Bebida | Jugo natural de maracuyá |
| Postre | Arroz con leche o dulce del día |

Cada ítem: círculo `48px` con borde dorado + ícono SVG, nombre en Playfair Display 700 crema, ejemplo en DM Sans 300 petróleo-300.

**Líneas divisoras doradas** `var(--divider-gold)` entre columnas en desktop.

### 9.6 Galería

**Fondo:** `--color-cream`

**Grid asimétrico:**
- Desktop: 4 columnas. Primera foto ocupa `col-span 2 / row-span 2`. Las otras 6: 1×1.
- Tablet: 2 columnas uniformes.
- Móvil: 1 columna.
- `gap: var(--space-3)`

**Cada foto:**
- Aspect-ratio `1/1`, primera `2/1` en desktop
- `object-fit: cover`, `border-radius: var(--radius-md)`

**Hover:**
- Overlay teal `var(--color-overlay-teal)` fade-in
- Ícono lupa SVG centrado, crema, `scale(1.2)`
- Imagen: `scale(1.05)`

**Seeds loremflickr (8 fotos, lock 21-28):**

| lock | Términos |
|---|---|
| 21 | `restaurant,caribbean` |
| 22 | `cafe,tropical` |
| 23 | `cocktail,bar` |
| 24 | `seafood,plate` |
| 25 | `brunch,food` |
| 26 | `restaurant,interior` |
| 27 | `food,dessert` |
| 28 | `bar,drink` |

### 9.7 Ubicación y Horario

**Fondo:** `--color-cream-100`

**Layout desktop:** 2 columnas — info (izquierda) + mapa (derecha).
**Layout móvil:** Stack vertical.

**Ítems de info:**
- Círculo dorado `40px` con ícono SVG + texto DM Sans
- Pin: "Turbaco diagonal a Prado Verde"
- Reloj: "Lun–Jue 8am–10pm · Vie–Dom 8am–12am"
- WhatsApp: "+57 318 2239183"

**Botón:** "Cómo llegar" — borde dorado, texto teal.

**Mapa:**
- `<iframe>` con `width: 100%; height: 400px; border-radius: var(--radius-lg); border: var(--divider-gold)`
- Placeholder con `src="about:blank"` — REEMPLAZAR con embed real

**Horario detallado:**
```
Lunes – Jueves: 8:00 am – 10:00 pm
Viernes – Domingo: 8:00 am – 12:00 am
```

### 9.8 Footer

**Fondo:** `--color-petrol-900`

**Layout:** 3 columnas desktop — Logo/misión · Nav · Contacto/redes.

**Borde superior:** `var(--divider-gold)`

**Líneas entre columnas:** `border-right: var(--divider-gold)` en desktop.

**Logo footer:** Igual que header, crema. Debajo: tagline en Dancing Script dorado.

**Nav footer:** Links en `--color-petrol-300`, hover crema. DM Sans 400.

**Contacto:** +57 318 2239183 · Turbaco, Bolívar · Instagram + Facebook (íconos SVG dorado).

**Copyright:** `© <span id="footer-year"></span> Wakava Café Restobar. Todos los derechos reservados.`
DM Sans 400, `0.8rem`, `--color-petrol-400`, centrado, `border-top: var(--divider-gold)`.

### 9.9 FAB WhatsApp Fijo

**Posición:** Fixed, `bottom: 1.5rem; right: 1.5rem; z-index: 1000`

**Botón:**
- `background: var(--color-whatsapp)`
- `border-radius: var(--radius-full)`
- `width: 56px; height: 56px`
- Ícono WhatsApp SVG blanco, `28px`
- `box-shadow: 0 4px 20px rgba(37,211,102,0.4)`

**Hover:**
- `background: var(--color-whatsapp-dark)`
- `transform: scale(1.08)`

**JS:** `.fab--hidden` → `opacity: 0; pointer-events: none; transform: translateY(8px)` al scroll down en móvil.

**ID:** `id="fab-whatsapp-link"` · `aria-label="Pedir por WhatsApp"`

---

## 10. Sistema de IDs — Contrato con main.js

| ID | Elemento | Función JS |
|---|---|---|
| `header-whatsapp-link` | `<a>` header desktop | `initWhatsAppLinks()` |
| `mobile-whatsapp-link` | `<a>` menú móvil | `initWhatsAppLinks()` |
| `hero-whatsapp-link` | `<a>` hero | `initWhatsAppLinks()` |
| `carta-whatsapp-link` | `<a>` sección carta | `initWhatsAppLinks()` |
| `footer-whatsapp-link` | `<a>` footer | `initWhatsAppLinks()` |
| `fab-whatsapp-link` | `<a>` FAB | `initWhatsAppLinks()` + `initFabEntrance()` |
| `footer-year` | `<span>` copyright | `initCopyrightYear()` |
| `menu-toggle` | `<button>` hamburguesa | `initMobileMenu()` |
| `mobile-menu` | `<div>` overlay móvil | `initMobileMenu()` |
| `menu-empty` | mensaje vacío carta | `initMenuFilter()` |

Clases requeridas:
- `.mobile-menu__link` — links del menú móvil
- `.header__nav-link` — links nav desktop
- `.menu-tab[data-cat]` — tabs de carta
- `.card--dish[data-categoria]` — cards filtrables
- `.reveal` — elementos con scroll reveal

---

## 11. Responsive Breakpoints

```css
/* Mobile-first — los breakpoints son upgrades */
/* Base:  < 480px  — móvil pequeño (default) */
/* sm:   >= 480px  — móvil grande */
/* md:   >= 768px  — tablet */
/* lg:   >= 1024px — desktop */
/* xl:   >= 1280px — desktop wide */
```

Nunca usar media queries para lo que `clamp()` resuelve. Las media queries son para cambios estructurales: de 1 col a 2 col, mostrar/ocultar nav desktop/móvil, layout asimétrico de galería.

---

## 12. Accesibilidad

- `lang="es"` en `<html>`
- Imágenes con `alt` descriptivo real
- Color contrast WCAG AA en todo par texto/fondo:
  - Crema sobre teal: ~7.5:1 ✓
  - Dorado sobre petróleo: ~6.2:1 ✓
  - Teal sobre crema: ~7.5:1 ✓
- Focus visible: `outline: 2px solid var(--color-gold); outline-offset: 3px`
- Botón hamburguesa: `aria-expanded`, `aria-controls="mobile-menu"`, `aria-label`
- Tabs: `role="tablist"`, `role="tab"`, `aria-selected`
- FAB: `aria-label="Pedir por WhatsApp"`
- `prefers-reduced-motion` wrapeando todas las animaciones no esenciales

---

## 13. Performance

- `<link rel="preconnect">` para Google Fonts antes del stylesheet
- Imágenes con `loading="lazy"` excepto hero (`loading="eager"`, `fetchpriority="high"`)
- Sin frameworks JS ni CSS
- `main.js` al final del `<body>`
- `styles.css` en `<head>`

---

## 14. Guía Fotográfica

Las fotos de producción deben transmitir:

**Ambiente:** Luz natural de tarde (dorada), materiales naturales (madera, rattan, plantas tropicales). Sin luz fría de fluorescente.

**Comida:** Tomas desde arriba o 3/4, fondo de mesa oscura. Sin fondos blancos clínicos.

**Bebidas:** Copa helada con condensación, fondo de barra o terraza. Cócteles con garnish.

**Personas:** Grupos pequeños y naturales. Nunca modelos de stock. Refleja la cultura local.

---

## 15. Tokens CSS — Bloque `:root` Completo

```css
:root {
  /* === COLORES BASE === */
  --color-teal:   #1A4A5C;
  --color-gold:   #C9A84C;
  --color-cream:  #F5EFE0;
  --color-petrol: #1D3D3D;

  /* === FAMILIA TEAL === */
  --color-teal-900: #0D2530;
  --color-teal-800: #122F3D;
  --color-teal-700: #1A4A5C;
  --color-teal-600: #205970;
  --color-teal-500: #2A7394;
  --color-teal-400: #3D90B0;
  --color-teal-300: #7BBCD0;
  --color-teal-200: #B8DCE8;
  --color-teal-100: #DCF0F7;
  --color-teal-50:  #F0F8FB;

  /* === FAMILIA DORADO === */
  --color-gold-900: #5C3D0A;
  --color-gold-800: #8A5C12;
  --color-gold-700: #B08030;
  --color-gold-600: #C9A84C;
  --color-gold-500: #D4B86A;
  --color-gold-400: #E0CA8A;
  --color-gold-300: #ECDAAA;
  --color-gold-200: #F3E9C8;
  --color-gold-100: #FAF4E4;

  /* === FAMILIA CREMA === */
  --color-cream-950: #2A1E08;
  --color-cream-900: #3D2C0F;
  --color-cream-800: #5A4020;
  --color-cream-700: #7A5830;
  --color-cream-600: #A07848;
  --color-cream-500: #C89A68;
  --color-cream-400: #DDBF90;
  --color-cream-300: #EDD9B8;
  --color-cream-200: #F5EFE0;
  --color-cream-100: #FAF6EE;
  --color-cream-50:  #FDFAF5;

  /* === FAMILIA PETRÓLEO === */
  --color-petrol-950: #080F0F;
  --color-petrol-900: #0E1D1D;
  --color-petrol-800: #152828;
  --color-petrol-700: #1D3D3D;
  --color-petrol-600: #265050;
  --color-petrol-500: #306464;
  --color-petrol-400: #4A8585;
  --color-petrol-300: #7AACAC;
  --color-petrol-200: #AACCCC;
  --color-petrol-100: #D5E8E8;

  /* === COLORES FUNCIONALES === */
  --color-whatsapp:       #25D366;
  --color-whatsapp-dark:  #1DA851;
  --color-success:        #2D8A5F;
  --color-error:          #C84B4B;
  --color-overlay-teal:   rgba(26, 74, 92, 0.75);
  --color-overlay-petrol: rgba(29, 61, 61, 0.80);
  --color-gold-line:      rgba(201, 168, 76, 0.40);
  --color-gold-glow:      rgba(201, 168, 76, 0.20);
  --color-shadow-dark:    rgba(13, 37, 48, 0.35);
  --color-shadow-medium:  rgba(13, 37, 48, 0.20);
  --color-shadow-light:   rgba(13, 37, 48, 0.10);

  /* === TIPOGRAFÍA === */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-script:  'Dancing Script', cursive;
  --font-body:    'DM Sans', system-ui, sans-serif;

  --text-display-xl: clamp(3.5rem, 8vw + 1rem, 7rem);
  --text-display-lg: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  --text-display-md: clamp(2rem, 3.5vw + 0.5rem, 3rem);
  --text-display-sm: clamp(1.5rem, 2.5vw + 0.25rem, 2rem);
  --text-script-xl:  clamp(2rem, 4vw, 3.5rem);
  --text-script-lg:  clamp(1.5rem, 2.5vw, 2.5rem);
  --text-script-md:  clamp(1.125rem, 1.5vw, 1.5rem);
  --text-body-xl:    1.25rem;
  --text-body-lg:    1.125rem;
  --text-body-md:    1rem;
  --text-body-sm:    0.9rem;
  --text-body-xs:    0.8rem;
  --text-ui-nav:     0.875rem;
  --text-ui-btn:     0.9375rem;
  --text-ui-label:   0.75rem;
  --text-ui-price:   1.125rem;

  --lh-tight:   1.1;
  --lh-snug:    1.25;
  --lh-normal:  1.45;
  --lh-relaxed: 1.65;

  --ls-tight:   -0.03em;
  --ls-snug:    -0.015em;
  --ls-normal:  0;
  --ls-wide:    0.05em;
  --ls-wider:   0.1em;
  --ls-widest:  0.15em;

  /* === ESPACIADO === */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  --section-py: clamp(4rem, 8vw, 7rem);
  --section-px: clamp(1.25rem, 5vw, 3rem);

  /* === CONTENEDORES === */
  --container-max:    1200px;
  --container-wide:   1440px;
  --container-narrow: 768px;

  /* === RADIOS === */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   20px;
  --radius-2xl:  32px;
  --radius-full: 9999px;

  /* === SOMBRAS === */
  --shadow-sm:         0 1px 3px var(--color-shadow-light), 0 1px 2px var(--color-shadow-medium);
  --shadow-md:         0 4px 12px var(--color-shadow-medium), 0 2px 4px var(--color-shadow-light);
  --shadow-lg:         0 10px 30px var(--color-shadow-dark), 0 4px 8px var(--color-shadow-medium);
  --shadow-xl:         0 20px 50px var(--color-shadow-dark);
  --shadow-gold:       0 4px 20px var(--color-gold-glow), 0 2px 8px var(--color-gold-glow);
  --shadow-card:       0 2px 16px var(--color-shadow-medium), 0 1px 4px var(--color-shadow-light);
  --shadow-card-hover: 0 8px 32px var(--color-shadow-dark), 0 2px 8px var(--color-shadow-medium);

  /* === TRANSICIONES === */
  --transition-fast:   150ms ease;
  --transition-base:   300ms ease;
  --transition-slow:   500ms ease;
  --transition-reveal: 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* === MARCOS GEOMÉTRICOS === */
  --frame-size-sm:    16px;
  --frame-size-md:    24px;
  --frame-size-lg:    40px;
  --frame-thickness:  2px;

  /* === DIVISORES === */
  --divider-gold: 1px solid var(--color-gold-line);

  /* === HEADER === */
  --header-height: 72px;
}
```

---

*Fin del sistema de diseño — Wakava Café Restobar · Identidad Teal/Dorado*
