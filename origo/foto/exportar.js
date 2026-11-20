// Exporta la pieza de La Brasa a PNG en dos variantes:
//   la-brasa-post      → con logo, nombre, precio y pie (para publicar)
//   la-brasa-limpia    → solo la foto sobre el fondo de marca (para reusar)
// Cada una en 1080x1350 y en alta resolución 2160x2700.
// Uso: node exportar.js   (requiere Playwright con Chromium instalado)
const path = require('path');
const { chromium } = require('playwright');

const base = 'file://' + path.join(__dirname, 'la-brasa.html');
const variantes = [
  { nombre: 'la-brasa-post', query: '' },
  { nombre: 'la-brasa-limpia', query: '?variante=limpia' }
];
const escalas = [
  { escala: 1, sufijo: '' },
  { escala: 2, sufijo: '@2x' }
];

(async () => {
  const navegador = await chromium.launch();
  for (const { nombre, query } of variantes) {
    for (const { escala, sufijo } of escalas) {
      const pagina = await navegador.newPage({
        viewport: { width: 1080, height: 1350 },
        deviceScaleFactor: escala
      });
      await pagina.goto(base + query, { waitUntil: 'networkidle' });
      await pagina.evaluate(() => document.fonts.ready);
      const archivo = `${nombre}${sufijo}.png`;
      await pagina.screenshot({ path: path.join(__dirname, 'export', archivo) });
      await pagina.close();
      console.log('Exportado: export/' + archivo);
    }
  }
  await navegador.close();
})();
