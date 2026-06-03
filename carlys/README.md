# Plantilla Landing Page — Negocio Local

Plantilla lista para clonar y personalizar por cliente. HTML + CSS + JS vanilla, sin frameworks.

---

## Estructura de archivos

```
_plantilla/
├── index.html          ← Estructura HTML completa
├── css/
│   └── styles.css      ← Todos los estilos + tokens de diseño
├── js/
│   └── main.js         ← Comportamiento (scroll, menú, WhatsApp, reveal)
├── assets/
│   └── .gitkeep        ← Carpeta para imágenes del cliente
└── README.md           ← Este archivo
```

---

## Pasos para personalizar un nuevo cliente

### 1. Clonar la plantilla

Copia la carpeta `_plantilla/` y renómbrala con el slug del cliente:

```bash
cp -r _plantilla/ cliente-nombre
```

### 2. Número de WhatsApp (JS — un solo lugar)

Abre `js/main.js` y edita el bloque `CONFIG` al inicio del archivo:

```js
const CONFIG = {
  whatsappNumber: '521XXXXXXXXXX',   // ← Reemplaza con el número real
  whatsappMessage: 'Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n',
  copyrightYear: 'auto',
};
```

El script actualizará automáticamente TODOS los botones y links de WhatsApp de la página.

**Formato del número:**
- México: `521` + 10 dígitos → `5215512345678`
- Colombia: `57` + número → `573001234567`
- Argentina: `549` + código de área + número → `5491112345678`

### 3. Nombre del negocio

Busca y reemplaza el texto `Nombre del Negocio` en `index.html`. Aparece en:
- `<title>` (línea ~8)
- `<meta property="og:title">` (línea ~14)
- `.header__logo-text` (dentro del header)
- `.footer__brand-name` (dentro del footer)
- `.footer__copyright` (copyright al pie)

### 4. Colores de marca

Abre `css/styles.css` y edita el bloque `:root` al inicio. Los valores clave son:

```css
:root {
  --color-primary:        #1A2E4A;  /* ← Color principal (header, botones, títulos) */
  --color-primary-hover:  #243D63;  /* ← Versión más oscura para hover */
  --color-primary-light:  #E8EDF3;  /* ← Versión muy clara para fondos y badges */

  --color-secondary:       #F5A623; /* ← Color acento (precios, botón CTA) */
  --color-secondary-hover: #D4911E; /* ← Versión más oscura para hover */
  --color-secondary-light: #FEF3DC; /* ← Versión muy clara */
}
```

**Tip:** Usa [Coolors](https://coolors.co) o [Realtime Colors](https://realtimecolors.com) para generar paletas. Luego solo pega los hex aquí.

### 5. Imágenes

Guarda las imágenes en la carpeta `assets/` y reemplaza los `src` en `index.html`.

| Imagen | Tamaño recomendado | Dónde en HTML |
|--------|-------------------|---------------|
| Hero (portada) | 1920×1080px o mayor | `hero__bg` (inline style) |
| Servicios (tarjetas) | 400×400px | `card__img` |
| Galería | 800×800px | `gallery-item__img` |
| Logo | Variable (PNG transparente) | `header__logo` |
| OG Image (redes) | 1200×630px | `<meta property="og:image">` |

**Reemplazar placeholder de Picsum:**
```html
<!-- Antes -->
src="https://picsum.photos/400/400?random=1"

<!-- Después -->
src="assets/foto-galeria-1.jpg"
```

**Hero background:**
```html
<!-- Antes -->
style="background-image: url('https://picsum.photos/1920/1080?random=10');"

<!-- Después -->
style="background-image: url('assets/hero.jpg');"
```

### 6. Mapa de Google Maps

1. Ve a [Google Maps](https://maps.google.com) y busca la dirección del negocio.
2. Haz clic en **Compartir** → **Insertar un mapa**.
3. Copia el `src` del `<iframe>` que te dan.
4. Pégalo en `index.html` dentro del `<iframe class="map-iframe">`.

También actualiza el botón "Cómo llegar" con las coordenadas reales:
```html
href="https://www.google.com/maps/dir/?api=1&destination=LAT,LNG"
```

### 7. Horario y dirección

Busca el bloque `.schedule` en `index.html` y edita los días y horarios:

```html
<div class="schedule__row">
  <dt class="schedule__day">Lun — Vie</dt>
  <dd class="schedule__time">09:00 — 20:00</dd>
</div>
```

La dirección está en la etiqueta `<address>` dentro de `.info-block__text`.

### 8. Redes sociales

En el footer, reemplaza los `href` de cada red social:

```html
<!-- Facebook -->
href="https://facebook.com/tunegocio"

<!-- Instagram -->
href="https://instagram.com/tunegocio"

<!-- TikTok -->
href="https://tiktok.com/@tunegocio"
```

Si el cliente no usa alguna red, elimina el `<a>` completo de esa red.

### 9. Textos de la landing

| Sección | Qué cambiar |
|---------|-------------|
| Hero | Título (`hero__title`) + subtítulo (`hero__subtitle`) |
| Servicios | Nombre, descripción y precio de cada tarjeta `.card` |
| Galería | Atributos `alt` de cada imagen |
| Footer | Eslogan en `.footer__brand-desc` |
| Meta description | Atributo `content` del `<meta name="description">` |

---

## Agregar o quitar tarjetas de servicios

Cada tarjeta es un `<li class="card">` dentro de `<ul class="services-grid">`.

- Copiar y pegar un bloque `<li class="card">` para agregar.
- Eliminar el bloque para quitar.
- El grid se ajusta automáticamente.

---

## Tecnologías y compatibilidad

- HTML5 semántico (`header`, `main`, `section`, `footer`, `nav`, `address`, `dl`)
- CSS custom properties (variables) — compatible con Chrome 49+, Firefox 31+, Safari 9.1+
- JavaScript ES6+ sin transpilación — compatible con cualquier navegador moderno (2018+)
- `IntersectionObserver` con fallback para navegadores sin soporte
- `prefers-reduced-motion` respetado en animaciones
- WCAG AA: contraste de color, `alt` en imágenes, `aria-label` en botones, foco visible

---

## Checklist antes de entregar al cliente

- [ ] Número de WhatsApp actualizado en `CONFIG` (js/main.js)
- [ ] Nombre del negocio reemplazado en todos los lugares
- [ ] `<title>` y `<meta description>` con texto real
- [ ] Imagen hero local (no picsum)
- [ ] Imágenes de servicios locales con `alt` descriptivo
- [ ] Imágenes de galería locales con `alt` descriptivo
- [ ] `og:image` apuntando a imagen real (1200×630px)
- [ ] Embed de mapa de Google con ubicación real
- [ ] Dirección y horario correctos
- [ ] Links de redes sociales correctos (o eliminados si no aplica)
- [ ] Botón "Cómo llegar" con coordenadas reales
- [ ] Colores de marca aplicados en `:root`
- [ ] Favicon actualizado
- [ ] Probado en móvil (Chrome DevTools → 375px)
- [ ] Probado con conexión lenta (DevTools → Throttle: Slow 3G)
