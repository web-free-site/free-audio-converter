import fs from 'node:fs';
import path from 'node:path';
import { buildFaqJsonLd, buildHomeStaticPrerenderHtml } from '../src/seo/homeStaticMarkup';

const distIndex = path.resolve('dist/index.html');
const marker = 'id="home-static-prerender"';

let html = fs.readFileSync(distIndex, 'utf8');

if (!html.includes(marker)) {
  const block = buildHomeStaticPrerenderHtml();
  html = html.replace('<div id="root"></div>', `${block}\n    <div id="root"></div>`);
}

if (!html.includes('"@type":"FAQPage"') && !html.includes('"@type": "FAQPage"')) {
  const faqScript = `<script type="application/ld+json">${JSON.stringify(buildFaqJsonLd())}</script>`;
  html = html.replace('</head>', `${faqScript}\n  </head>`);
}

fs.writeFileSync(distIndex, html);
console.log('inject-home-static: updated dist/index.html with crawler-visible homepage SEO');