// Exporta el menú a PNG: tamaño original (1080x1350) y alta resolución (2160x2700).
// Uso: node exportar.js   (requiere Playwright con Chromium instalado)
const path = require('path');
const { chromium } = require('playwright');

const html = 'file://' + path.join(__dirname, 'index.html');
const salidas = [
  { escala: 1, archivo: 'menu-origo.png' },
  { escala: 2, archivo: 'menu-origo@2x.png' }
];

(async () => {
  const navegador = await chromium.launch();
  for (const { escala, archivo } of salidas) {
    const pagina = await navegador.newPage({
      viewport: { width: 1080, height: 1350 },
      deviceScaleFactor: escala
    });
    await pagina.goto(html, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.screenshot({ path: path.join(__dirname, 'export', archivo) });
    await pagina.close();
    console.log('Exportado: export/' + archivo);
  }
  await navegador.close();
})();
