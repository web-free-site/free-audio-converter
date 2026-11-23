import fs from 'node:fs';
import path from 'node:path';

const HOST = 'https://free-audio-converter.web-free.site';
const paths = [
  '/',
  '/opus-to-mp3',
  '/m4a-to-mp3',
  '/ogg-to-mp3',
  '/wav-to-mp3',
  '/how-to-convert-audio-in-the-browser',
  '/whatsapp-voice-note-to-mp3',
  '/about',
  '/privacy',
  '/terms',
  '/contact',
];

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => `  <url><loc>${HOST}${p === '/' ? '/' : p}</loc></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join('dist', 'sitemap.xml'), body);
fs.writeFileSync(
  path.join('dist', 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${HOST}/sitemap.xml\n`,
);
console.log('Wrote sitemap.xml and robots.txt');