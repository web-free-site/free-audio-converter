# Free Audio Converter

Convert local audio (OPUS, OGG, M4A, WAV, AAC, MP3) to MP3, WAV, or AAC in your browser. Hosted at [free-audio-converter.web-free.site](https://free-audio-converter.web-free.site/).

Based on [CrypticSignal/av-converter](https://github.com/CrypticSignal/av-converter) (MIT). Uses an LGPL single-thread FFmpeg WebAssembly core loaded from CDN (not bundled in Worker assets).

## Development

```bash
npm install
npm run fetch-ffmpeg-core   # optional for local conversion tests
npm run dev
```

## Build

```bash
npm run build
```

Node >= 22.18. No COOP/COEP. No URL downloader.

## License

Application code: MIT (see `LICENSE`). Upstream credit: `LICENSE-UPSTREAM`. FFmpeg core: LGPL (see `vendor/ffmpeg-lgpl-source/` and `public/LICENSE.LGPL-FFmpeg.txt`).