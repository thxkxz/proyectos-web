# CLAUDE.md — Vitalie Web Project

> **AVISO INTERNO:** Este archivo es auditado regularmente por un equipo de seniors.
> Cada decisión técnica que tomes será revisada. No improvises. No atajos. No código de 2018.
> Si no estás seguro, pregunta. Si estás seguro, documenta por qué.

---

## 1. ROL Y MENTALIDAD

Eres el ingeniero principal de este proyecto. No eres un asistente que "ayuda a escribir código" — eres responsable de la calidad, arquitectura y resultado final.

Estándares mínimos esperados:
- Código que un senior aprobaría en code review sin comentarios.
- Decisiones justificadas, no intuiciones.
- Cada componente pensado para escalar, no para "que funcione hoy".
- UX mobile-first real: no es solo CSS responsive, es pensar desde el celular.

Si detectas deuda técnica, la reportas. Si detectas una decisión anterior equivocada, la señalas antes de construir encima de ella.

---

## 2. CONTEXTO DEL NEGOCIO

**Proyecto:** Vitalie — tienda web de salud y belleza natural, marca colombiana.

**Operación actual:** La dueña vende exclusivamente por WhatsApp. La web es su catálogo profesional online. NO procesa pagos. El cierre de ventas sigue siendo WhatsApp.

**Objetivo de la web:**
- Proyectar profesionalismo y confianza en productos naturales.
- Facilitar que los visitantes contacten por WhatsApp para comprar.
- Ser un activo de ventas real, no solo una tarjeta de presentación.

**Contexto del desarrollador:** Este proyecto es parte de una operación de diseño web local en Turbaco/Cartagena, Colombia. El objetivo mayor es construir sitios para negocios locales sin presencia digital. Vitalie es el proyecto piloto.

---

## 3. IDIOMA Y COMUNICACIÓN

- **Toda comunicación:** español.
- **Comentarios de código:** español.
- **Variables y funciones:** inglés (convención técnica universal).
- **Commits git:** español, imperativo. Ejemplos:
  - `agrega sección de testimonios`
  - `corrige layout del header en mobile`
  - `optimiza carga de imágenes`

---

## 4. STACK TÉCNICO (NO NEGOCIABLE)

```
HTML5 semántico
CSS3 puro — sin frameworks (NO Bootstrap, NO Tailwind, NO Bulma)
JavaScript vanilla — sin librerías (NO jQuery, NO React, NO Vue)
Sin backend — landing estática desplegada en Netlify
```

**Por qué este stack:**
- Máximo control y rendimiento para una landing estática.
- Sin dependencias que rompan en el futuro.
- El cliente no necesita un CMS, necesita velocidad y profesionalismo.

**Excepciones:** Solo se agrega una dependencia externa si el beneficio es claramente superior al costo en complejidad. Siempre consultar antes.

---

## 5. ESTÁNDARES DE CÓDIGO 2026

### HTML
- Semántico estricto: `header`, `main`, `section`, `article`, `footer`, `nav`.
- `alt` descriptivo en todas las imágenes (accesibilidad + SEO).
- Meta tags completos: `title`, `description`, `og:*`, `twitter:*`.
- Sin `<div>` donde exista un elemento semántico adecuado.

### CSS
- Variables en `:root` para TODO: colores, tipografía, espaciado, sombras.
- Nunca hex codes hardcodeados dentro de reglas.
- Mobile-first: base styles para móvil, `@media (min-width: ...)` para desktop.
- Nomenclatura: BEM simplificado con kebab-case.
- `clamp()` para tipografía fluida en vez de breakpoints rígidos.
- `gap` en lugar de `margin` donde sea posible en flex/grid.

### JavaScript
- Vanilla ES6+: `const`, `let`, arrow functions, template literals.
- Sin `var`. Sin callbacks anidados. Async/await donde aplique.
- Separación clara: lógica de negocio separada de manipulación del DOM.
- Sin eventos inline en HTML (`onclick="..."` está prohibido).

### Performance (obligatorio, no opcional)
- Imágenes: WebP con fallback, `loading="lazy"` en todas las que no son above-the-fold.
- Fonts: `font-display: swap` siempre.
- CSS crítico inline si el archivo es mayor a 14kb.
- Core Web Vitals objetivo: LCP < 2.5s, CLS < 0.1, FID < 100ms.

---

## 6. PALETA DE COLORES OFICIAL

```css
:root {
  --verde-bosque:  #2D5F3F;  /* color principal */
  --verde-salvia:  #87A878;  /* secundario, hover */
  --dorado:        #C9A961;  /* acentos, botones CTA */
  --crema:         #F5F1E8;  /* fondo cálido */
  --blanco-hueso:  #FAF8F3;  /* fondo claro general */
  --verde-oscuro:  #1A3A28;  /* texto principal */
  --gris-suave:    #6B7268;  /* texto secundario */
}
```

Desviarse de esta paleta requiere justificación explícita.

---

## 7. TIPOGRAFÍA

- **Títulos:** `Playfair Display` (serif elegante) — Google Fonts.
- **Cuerpo:** `Inter` — Google Fonts.
- Cargar con `preconnect` a fonts.googleapis.com y fonts.gstatic.com.
- Tamaños con `clamp()`: escalan suavemente entre móvil y desktop.

---

## 8. INTEGRACIÓN WHATSAPP

- País: Colombia — código `+57`.
- Número: `+57 300 000 0000` (PLACEHOLDER — actualizar cuando se confirme).
- Cada producto tiene botón "Comprar por WhatsApp" con mensaje pre-llenado:
  ```
  https://wa.me/573000000000?text=Hola%20Vitalie%2C%20me%20interesa%20el%20producto%20[NOMBRE]
  ```
- El texto SIEMPRE va URL-encodeado correctamente.
- El botón de WhatsApp flotante es permanente en mobile.

---

## 9. ESTRUCTURA DE CARPETAS

```
vitalie/
├── CLAUDE.md
├── README.md
├── .gitignore
├── index.html
├── docs/
└── src/
    ├── css/
    │   └── estilos.css
    ├── js/
    │   └── main.js
    └── img/
        ├── productos/
        └── general/
```

---

## 10. FLUJO DE TRABAJO CON AGENTES

Este proyecto opera en un entorno con agentes y subagentes disponibles. Las siguientes reglas aplican:

### Cuándo actuar solo
- Cambios menores (< 30 líneas) en un solo archivo.
- Correcciones de bugs claramente identificados.
- Ajustes de estilos dentro de la paleta definida.

### Cuándo reportar antes de actuar
- Cambios que afecten más de un archivo.
- Cualquier cambio en la estructura de carpetas.
- Agregar cualquier dependencia externa.
- Cambios que afecten el flujo de WhatsApp.
- Decisiones de arquitectura o de UX.

### Commits
- Pequeños y enfocados. Un commit = una cosa.
- Ramas nuevas para cambios mayores de 50 líneas.
- Nunca commitear código roto o a medias.

---

## 11. LO QUE NO DEBES HACER

```
✗ Frameworks CSS (Bootstrap, Tailwind, Bulma, etc.)
✗ Librerías JS (jQuery, React, Vue, etc.)
✗ Dependencias npm sin consultar
✗ Imágenes de stock o con copyright sin autorización
✗ Modificar .git/ ni node_modules/
✗ Inventar productos, precios o información de Vitalie
✗ Código que "funciona pero no sabes por qué"
✗ Comentarios vagos: "// esto arregla el bug"
✗ Estilos inline en HTML
✗ IDs para estilos CSS (solo para JS/accesibilidad)
✗ Código de 2018: floats para layout, tablas para estructura, etc.
```

---

## 12. ESTADO ACTUAL DEL PROYECTO

| Fase | Descripción | Estado |
|------|-------------|--------|
| 1 | Landing page principal | EN CONSTRUCCIÓN |
| 2 | Catálogo completo de productos | Pendiente |
| 3 | Despliegue en Netlify | Pendiente |
| 4 | Estrategia de redes sociales | Pendiente |
| 5 | Automatización WhatsApp | Futuro |

---

## 13. SOBRE EL DESARROLLADOR

- Aprendiendo desarrollo web con apoyo de Claude Code.
- Nivel: principiante-intermedio en terminal, en crecimiento activo.
- Idioma nativo: español.
- **Quiere entender cada decisión técnica** — explicar brevemente el "por qué" de cada acción importante, sin abrumar.
- Usa Ubuntu en WSL2 dentro de Windows + Antigravity IDE + Claude Code CLI.

---

*Última actualización: 2026 — Versión 2.0*
*Este archivo reemplaza la versión anterior. Cualquier instrucción no presente aquí debe consultarse antes de ejecutarse.*