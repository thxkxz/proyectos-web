# Nota para Claude: cómo se logran los videos "hechos con Claude" que se ven tan bien

> Uso: cuando el usuario pegue esta nota, Claude debe recordar este análisis y aplicarlo al producir videos
> verticales (Reels/TikTok/Shorts) con código (HyperFrames o Remotion). Basada en el análisis cuadro a cuadro
> de 3 videos de referencia (noviembre 2026). Ya se probó en este entorno: HyperFrames + voz Kokoro funcionan
> gratis (ver "Pipeline probado").

---

## 1. La idea central

Estos videos no se ven bien por la herramienta. Se ven bien porque **cada uno es un mundo visual cerrado**:
una metáfora, una paleta, una tipografía, un personaje y un sistema de subtítulos, todo coherente durante
50-90 segundos. La herramienta (HTML + animación renderizada a MP4) solo permite producir ese mundo rápido
y repetible. Si falta el mundo, el video se ve como "plantilla de IA" aunque esté bien animado.

## 2. Los 3 estilos de referencia

| | Video A: "5 plugins" | Video B: "5 conectores" | Video C: "Agente WhatsApp" |
|---|---|---|---|
| Mundo | Pixel art espacial (astronauta, cohete, planetas) | Teatro de cartón/papel (telón, cinta adhesiva, mesa de madera) | Panel de control oscuro tipo terminal |
| Paleta | Morado profundo + rojo/naranja + acentos neón | Un fondo saturado distinto por escena (magenta, teal, rojo, verde) + coral en etiquetas | Casi negro cálido (#161211) + un único coral (#E8735A) |
| Tipografía | Fuente pixel para títulos, sans redondeada en diálogos | Sans gruesa en etiquetas de papel | Condensada tipo Bebas Neue para títulos, monoespaciada para el reloj, sans geométrica para UI |
| Personaje | Avatar pixel del creador + mascota cangrejo | Robot-cubo coral con gestos (sombrero, lupa, corona) | Cubo-mascota coral en esquina inferior, reacciona |
| Subtítulos | Caja de diálogo estilo RPG: avatar + nombre "SANTI" + texto que se escribe solo | Palabras sueltas en recortes de papel; palabra clave en coral | Caja oscura con borde coral, 2-4 palabras, palabra clave en coral |
| Dispositivo de retención | Barra de tokens, barra de tarea 99%, número del plugin gigante | Contador "1/5", tarjetas con métricas (POTENCIA x10, BUGS 1, CLIENTES PERDIDOS 7) | Cuenta regresiva 29:34 → 03:27, "Paso 3 · 04/10", barra de pasos con iconos |
| Cierre (CTA) | "Comentá CLAUDE y te dejo la guía" (simula un chat) | "Comentá CONECTORES" + burbuja DM | (cortado en el paso 7 de 10: es una parte 1) |

## 3. Las 12 reglas que explican el resultado

1. **Formato:** 1080x1920, 25-30 fps, 50-90 s. Todo diseñado para el centro de la pantalla; zona inferior libre para subtítulos y botones de la app.
2. **Gancho en el cuadro 1:** título grande con número y promesa ("NUNCA uses Claude Code sin estos 5 plugins", "Los 5 conectores más potentes", "Agente de IA en WhatsApp en 30 min"). Nada de logos ni intros.
3. **Una frase = una imagen.** Cada oración del guion tiene su metáfora literal: "estás en el horno" → cohete entrando al sol; "detective privado" → robot con lupa y cartel SE BUSCA; "copiar cualquier sitio" → araña con telaraña; "memoria permanente" → torres con cerebro. El espectador entiende sin audio.
4. **Cambio visual cada 2-4 s.** Escena nueva, objeto nuevo o dato nuevo. Nunca un plano estático más de 4 s.
5. **Subtítulos sincronizados por palabra**, con la palabra importante resaltada en el color de acento. Salen de transcribir la voz (Whisper) con marcas de tiempo por palabra. Son el 50 % del "look profesional".
6. **HUD persistente:** contador de progreso (1/5, 04/10), reloj, barra de pasos. Le dice al cerebro "falta poco, quédate".
7. **Datos con números en tarjetas:** POTENCIA x10, TAREAS 4, TIEMPO PERDIDO 9h, TOKENS DE MÁS/JUSTOS. Los números concretos dan sensación de rigor aunque sean ilustrativos.
8. **Paleta restringida:** 1 fondo dominante + 1 acento + neutros. El acento solo marca lo importante (palabra clave, número, botón).
9. **Textura y profundidad:** grano, viñeta, resplandor, sombras suaves, papel con cinta, pixeles con brillo. Nada plano ni vectorial genérico.
10. **Movimiento con física:** entradas con rebote (`back.out`, springs), escalonadas (stagger), y animaciones "en reposo" (la mascota respira, parpadea, flota). Nada aparece de golpe ni con fade lineal.
11. **Personaje recurrente** que reacciona a lo que se dice. Crea vínculo y marca. (Ojo: el robot coral de B y C recuerda a la mascota de Claude; para clientes, crear un personaje propio.)
12. **CTA de palabra clave** ("Comentá X") conectado a una automatización de DM (tipo ManyChat). Es estrategia de crecimiento, no de diseño, pero es lo que convierte el video en leads.

## 4. Pipeline probado (noviembre 2026)

Probado en este entorno el 2026-11-19, de punta a punta:

```bash
npx hyperframes@latest init mi-video --resolution portrait --non-interactive
cd mi-video
# Claude escribe index.html (HTML + CSS + GSAP, timeline en window.__timelines)
npx hyperframes lint
npx hyperframes snapshot --at 1,3,5     # mirar cuadros antes de renderizar
npx hyperframes tts guion.txt --voice ef_dora --lang es -o voz.wav   # voz gratis local (Kokoro)
npx hyperframes render                   # MP4 en ./renders
```

- Render de 6 s a 1080x1920: **15 segundos**, sin GPU, sin pagar nada.
- La fuente condensada (Bebas Neue) la resolvió sola desde Google Fonts.
- Kokoro: modelo de ~300 MB que se descarga una vez; voces en español probadas: `ef_dora` (mujer) y `em_alex` (hombre). Calidad aceptable, se nota sintética; para producción con clientes, la voz real del creador o ElevenLabs suena mejor.
- Subtítulos por palabra: `npx hyperframes transcribe voz.wav --language es` (necesita whisper.cpp instalado). Siempre pasar `--language es`: el modelo por defecto es solo inglés y traduce.
- Plantilla base probada: `plantilla-hyperframes/index.html` (estilo C: panel oscuro + coral + reloj + chat + subtítulos por palabra).

## 5. Checklist antes de entregar un video

- [ ] ¿El cuadro 1 tiene número + promesa legible en 1 segundo?
- [ ] ¿Cada frase del guion tiene su imagen?
- [ ] ¿Hay cambio visual cada 2-4 s?
- [ ] ¿Subtítulos por palabra con acento en la palabra clave?
- [ ] ¿HUD de progreso visible?
- [ ] ¿Paleta de 1 fondo + 1 acento? ¿Tipografía con carácter (no Inter/Roboto/Arial)?
- [ ] ¿Textura (grano/viñeta/sombra)?
- [ ] ¿Entradas con rebote y personaje con animación en reposo?
- [ ] ¿CTA con palabra clave al final?
- [ ] ¿`lint` limpio y snapshots revisados antes del render final?
