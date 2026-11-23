import fs from 'node:fs';
import path from 'node:path';

const HOST = 'https://free-audio-converter.web-free.site';
const dist = path.resolve('dist');
const baseHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const pages = [
  {
    path: '/opus-to-mp3',
    title: 'OPUS to MP3 — Free browser converter',
    description: 'Convert local OPUS audio (WhatsApp voice notes) to MP3 online. No upload.',
    h1: 'OPUS to MP3 converter',
    snippet: '<p>Turn OPUS and WhatsApp voice notes into MP3 entirely in your browser.</p>',
  },
  {
    path: '/m4a-to-mp3',
    title: 'M4A to MP3 — Free online converter',
    description: 'Convert M4A and AAC audio to MP3 without uploading files.',
    h1: 'M4A to MP3 converter',
    snippet: '<p>Save M4A/AAC as MP3 on your device.</p>',
  },
  {
    path: '/ogg-to-mp3',
    title: 'OGG to MP3 — Free browser converter',
    description: 'Convert OGG Vorbis and OPUS-in-OGG to MP3 in the browser.',
    h1: 'OGG to MP3 converter',
    snippet: '<p>Convert OGG audio to MP3 locally.</p>',
  },
  {
    path: '/wav-to-mp3',
    title: 'WAV to MP3 — Free audio compressor',
    description: 'Convert large WAV files to smaller MP3 online. No server upload.',
    h1: 'WAV to MP3 converter',
    snippet: '<p>Shrink WAV recordings to MP3 for sharing.</p>',
  },
  {
    path: '/how-to-convert-audio-in-the-browser',
    title: 'How to convert audio in the browser',
    description: 'Step-by-step guide for OPUS, OGG, M4A, WAV, and AAC to MP3 without upload.',
    h1: 'How to convert audio in the browser',
    snippet: '<p>Pick a file, choose output format, convert, and download MP3.</p>',
  },
  {
    path: '/whatsapp-voice-note-to-mp3',
    title: 'WhatsApp voice note to MP3',
    description: 'Save and convert WhatsApp voice messages (OPUS/OGG) to MP3 in your browser.',
    h1: 'WhatsApp voice note to MP3',
    snippet: '<p>Export a voice note from WhatsApp and convert OPUS or OGG to MP3 without uploading.</p>',
  },
  {
    path: '/about',
    title: 'About — Free Audio Converter',
    description: 'Upstream credits, FFmpeg LGPL core, and privacy.',
    h1: 'About this converter',
    snippet: '<p>Based on av-converter (MIT) with an LGPL FFmpeg WebAssembly core.</p>',
  },
  {
    path: '/privacy',
    title: 'Privacy policy',
    description: 'Privacy policy for the Free Audio Converter.',
    h1: 'Privacy policy',
    snippet: '<p>Your files are processed locally; we do not receive your media.</p>',
  },
  {
    path: '/terms',
    title: 'Terms of use',
    description: 'Terms for using the Free Audio Converter.',
    h1: 'Terms of use',
    snippet: '<p>Use the tool lawfully on files you have rights to convert.</p>',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'Contact the Free Audio Converter maintainers.',
    h1: 'Contact',
    snippet: '<p>Reach us via the web-free.site hub.</p>',
  },
];

function buildPage(page) {
  const url = HOST + page.path;
  let html = baseHtml;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${page.description}" />`,
  );
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${url}" />\n  </head>`);
  }
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${page.title}" />`);
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${page.description}" />`,
  );
  const seoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>${page.h1}</h1>${page.snippet}</section>`;
  if (page.jsonLd) html = html.replace('</head>', `<script type="application/ld+json">${page.jsonLd}</script>\n  </head>`);
  html = html.replace('<div id="root"></div>', `${seoBlock}<div id="root"></div>`);
  return html;
}

for (const page of pages) {
  const dir = path.join(dist, page.path.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page));
}

console.log('Prerendered', pages.length, 'SEO HTML shells into dist/');