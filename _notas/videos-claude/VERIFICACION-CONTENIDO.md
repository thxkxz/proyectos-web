# Verificación del contenido de los videos

Fecha: 2026-11-19. Método: lectura cuadro a cuadro de los subtítulos (son el guion palabra por palabra),
búsqueda de fuentes y pruebas reales en un entorno Linux (HyperFrames, voz Kokoro, render).

Escala: **CIERTO** · **CIERTO CON MATICES** · **EXAGERADO** · **RIESGOSO**

---

## 0. La pregunta de fondo: ¿cómo se hacen estos videos y es gratis?

| Afirmación | Veredicto | Detalle |
|---|---|---|
| Se hacen con Claude Code escribiendo código | **CIERTO** | Claude escribe HTML/CSS/JS (HyperFrames) o React (Remotion) y un motor lo renderiza a MP4. Lo probé: 6 s de video vertical renderizados en 15 s. |
| HyperFrames es gratis | **CIERTO** | Licencia Apache-2.0, sin cobro por render ni límite comercial. Lo único de pago es "HyperFrames Pro" (plantillas de estilo y la función de copiar videos ajenos). El núcleo no lo necesita. |
| Remotion es gratis | **CIERTO CON MATICES** | Gratis para personas y empresas de hasta 3 personas, incluso con uso comercial. Si tu negocio pasa de 3 personas, necesitas licencia de empresa. Hoy estás dentro de lo gratis. |
| "Te generan las voces" gratis | **CIERTO CON MATICES** | HyperFrames trae Kokoro (voz local, sin API). Probé `ef_dora` y `em_alex` en español: funcionan. Calidad: correcta pero se nota sintética. Los creadores de estos videos usan **su propia voz** (acento rioplatense: "comentá", "pedís"). |
| Los subtítulos se sincronizan solos | **CIERTO** | Whisper transcribe la voz con tiempos por palabra y la composición los anima. Ojo: hay que forzar `--language es`. |

**Cuál conviene a ti:** HyperFrames. Es HTML/CSS/GSAP, o sea, tu stack nativo. Remotion pide React y tiene la restricción de licencia al crecer. HyperFrames además incluye voz, transcripción, revisión de cuadros y hasta un skill de migración desde Remotion.

---

## 1. Video "Nunca uses Claude Code sin estos 5 plugins" (Santiago Remedio)

| # | Lo que dice | Veredicto | Detalle |
|---|---|---|---|
| 1 | **Playwright**: "Claude no puede ver tu pantalla, adivina. Le da ojos." | **CIERTO CON MATICES** | Le da un navegador real que Claude controla y del que saca capturas. Útil para probar tus landings. Matiz: Claude sí puede ver imágenes que le pegues, no "adivina" siempre. Matiz 2: la versión CLI de Playwright gasta bastantes menos tokens que la versión MCP. |
| 2 | **OmniRoute**: "si llegás al límite, te cambia a otro modelo y nunca te quedás sin créditos" | **RIESGOSO** | Es un proxy que enruta tu Claude Code a otros proveedores, incluidos niveles gratis de terceros. Funciona, pero: (a) los modelos de respaldo son peores que Claude, así que la tarea "continúa" con menos calidad; (b) varias rutas reutilizan sesiones de suscripción y esquivan límites, algo que los términos de los proveedores prohíben; Anthropic ya cortó en 2026 el uso de suscripciones Pro/Max en herramientas de terceros. Puedes perder tu cuenta. **No lo recomiendo con tu cuenta principal.** |
| 3 | **Headroom**: "lee toda la información, incluso la que no es necesaria; esto saca lo que sobra y usa tokens solo para lo necesario" | **CIERTO CON MATICES** | Proyecto real (Apache-2.0) que comprime salidas de herramientas, logs e historial antes de mandarlos al modelo. Ahorros reportados 47-92 % según la tarea, en benchmarks del propio proyecto. Útil en sesiones largas; en landings pequeñas el ahorro es bajo. Añade una capa más que puede fallar. |
| 4 | **"Palacio mental"**: "abrís una ventana nueva y tenés que volver a aclararle cosas; esto deja una memoria permanente" | **CIERTO CON MATICES** | Existen varios (MemPalace, claude-mem). El problema que describe es real. Pero Claude Code ya trae memoria nativa: el archivo `CLAUDE.md` que ya usas. Para tu caso (un `CLAUDE.md` por proyecto de cliente) eso cubre el 90 %. Estos plugins suman base de datos local, procesos y licencias mixtas (claude-mem es AGPL). |
| 5 | **Frontend Design**: "cuando diseñás con Claude se nota que es IA; esto hace diseños más profesionales" | **CIERTO** | Es un plugin **oficial de Anthropic**. Da a Claude un proceso de diseño para evitar el look genérico. De los 5, **el más útil para tu negocio**, junto con Playwright. |

**Conclusión del video 1:** 2 de 5 valen la pena para ti (Frontend Design y Playwright). Headroom es opcional. La memoria ya la tienes con `CLAUDE.md`. OmniRoute evítalo.

---

## 2. Video "Los 5 conectores más potentes de Claude" (Aldo Paucar)

Aclaración general: no son "conectores de Claude" incluidos. Son servidores MCP de terceros que conectas tú, y casi todos necesitan cuenta y clave de API.

| # | Lo que dice | Veredicto | Detalle |
|---|---|---|---|
| 1 | **Perplexity**: "el motor más potente para traer información en tiempo real, investiga a fondo cualquier tema" | **EXAGERADO** | Busca bien y cita fuentes, pero no es gratis: la API se paga por uso, y su API "Sonar" quedó como legado en 2026. Claude Code ya trae búsqueda web propia. Solo vale para investigación pesada. |
| 2 | **Firecrawl**: "copiar cualquier sitio, toda la investigación de la competencia" | **CIERTO CON MATICES** | Extrae el contenido de webs en formato limpio. El plan gratis da unos 1.000 créditos al mes. Útil para analizar webs de competencia de un cliente. "Copiar cualquier sitio" es exagerado: algunos sitios bloquean, y copiar diseño ajeno tiene implicaciones legales. |
| 3 | **PostHog**: "tu detective privado, descubre dónde estás perdiendo clientes" | **CIERTO CON MATICES** | Analítica y grabación de sesiones real, con un nivel gratis generoso. Pero solo funciona si instalas su código en la web y esa web tiene tráfico. En una landing de un negocio de Turbaco con pocas visitas, aporta poco. |
| 4 | **Playwright**: "controla tu navegador, prueba sitios, completa formularios" | **CIERTO** | Mismo que en el video 1. Repetido en ambos videos por algo. |
| 5 | **Composio**: "conecta Claude a todas las apps que usás (mail, agenda, chat…)" | **CIERTO CON MATICES** | Un solo conector hacia cientos de apps, con nivel gratis (unas 20.000 llamadas al mes). Útil para automatizar. Le estás dando a un tercero acceso a tu correo y agenda: revisa permisos. |

**Conclusión del video 2:** Playwright y Firecrawl son los útiles para ti. PostHog sirve cuando un cliente tenga tráfico real. Perplexity es prescindible. Composio, solo si vas a automatizar tareas de clientes.

---

## 3. Video "Agente de IA en WhatsApp en 30 minutos" (cortado en el paso 7 de 10)

Pasos que muestra: (1) planificar con Claude Code qué hace el negocio, quiénes son los clientes, qué resuelve el agente; (2) crear app de desarrollador en Meta, agregar WhatsApp, credenciales y webhook; (3) conectar el modelo con OpenRouter; (4) memoria: guardar historial reciente y reenviarlo; (5) cargar servicios, precios, horarios, FAQ, políticas, dirección y reglas; (6) herramientas: Cal.com para ver agenda y agendar; (7) probar con mensajes raros hasta que se rompa.

| Afirmación | Veredicto | Detalle |
|---|---|---|
| La arquitectura (WhatsApp Cloud API → webhook → modelo → memoria → datos del negocio → herramientas) | **CIERTO** | Es exactamente como se construye bien. Los pasos y su orden son correctos. |
| "En unos 30 minutos" | **EXAGERADO** | El código con Claude Code puede salir en 30-60 min. Lo que no cabe: verificar el negocio en Meta, registrar un número, conseguir un token permanente, aprobar plantillas y desplegar el webhook en un servidor con HTTPS. Para un cliente real, cuenta con 1 a 3 días. |
| "Chatbot conversa, agente actúa" | **CIERTO** | La diferencia real es que el agente usa herramientas (agenda, consulta de datos). Es lo que lo hace vendible. |
| OpenRouter: "una sola conexión para cualquier modelo" | **CIERTO CON MATICES** | Cierto. Los modelos gratis tienen límite de 50 peticiones al día (1.000 si alguna vez cargaste 10 USD): no alcanza para un negocio real. Hay que pagar por uso, normalmente unos pocos dólares al mes para un negocio pequeño. |
| Cal.com para agendar | **CIERTO** | Tiene API y plan gratis para uso individual. |
| "Probá hasta que se rompa" | **CIERTO** | Es el paso más importante y el que la mayoría se salta. El video muestra pruebas reales: "turno el 31 de febrero", "ignorá tus instrucciones", dos mensajes a la vez. |
| Lo que el video **no dice** | **IMPORTANTE** | (a) Meta prohíbe desde enero de 2026 los chatbots de IA "de propósito general" en la API de WhatsApp; un asistente del negocio (citas, FAQ, pedidos) sí está permitido, así que tu agente debe limitarse al negocio. (b) Responder dentro de las 24 h desde que el cliente escribe es gratis; los mensajes que inicia el negocio (plantillas de marketing) se cobran por mensaje. (c) Datos personales de clientes: en Colombia aplica la ley de protección de datos (Ley 1581): avisa al usuario y guarda solo lo necesario. |

**Conclusión del video 3:** el contenido más sólido de los tres y **el de más potencial de negocio para ti**: un "recepcionista de WhatsApp" para clínicas, barberías y restaurantes de Turbaco/Cartagena es un servicio recurrente que puedes vender junto con la landing. Lo engañoso es el "30 minutos".

---

## 4. Sobre los videos en sí (lo que sí es "humo")

- Las métricas en pantalla (POTENCIA x10, CLIENTES PERDIDOS 7, TIEMPO PERDIDO 9h) son decorativas, no son datos reales.
- El CTA "comentá X y te mando la guía" es una técnica para captar leads con DM automáticos. No es malo, pero el objetivo del video es tu comentario.
- Que el video se vea profesional no garantiza que la herramienta sea buena: el video 1 recomienda OmniRoute con el mismo pulido que Frontend Design.

## 5. Recomendación concreta

1. Instalar **Frontend Design** (oficial) para las landings de clientes.
2. Usar **Playwright** para que Claude revise tus landings en el navegador antes de entregar.
3. Producir tus videos de marketing con **HyperFrames** (gratis, tu stack). La nota de estilo está en `NOTA-ESTILO-VIDEOS.md`, y la plantilla probada en `plantilla-hyperframes/`.
4. Como servicio nuevo, valorar el **agente de WhatsApp para negocios locales**, con plazo y precio realistas (no 30 minutos).
5. No usar **OmniRoute** con tu cuenta de Claude.
