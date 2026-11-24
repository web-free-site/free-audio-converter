# Cursor agent brief — free-audio-converter

Target: https://free-audio-converter.web-free.site
Repo name (wrangler `name`): `free-audio-converter`
English name: "Free Audio Converter". English primary.

Follow every rule in the attached `agent-brief-common.md`, with one SEO override below. Do not write the tool from scratch. Do not deploy. Do not switch models. Push to `main` of this repo when the work is done.

**SEO / language override (takes precedence over the common brief):** do **not** add a French or Swahili landing page, UI translation, or how-to pages. How-to and legal pages are English only. You may omit `hreflang` fr.

This is a **local-file** audio converter, especially WhatsApp voice notes (OPUS/OGG) and M4A/WAV/AAC to MP3. Do not add YouTube, URL, or cloud downloading.

## Recommended base (use this)

- Repo: https://github.com/CrypticSignal/av-converter
- License: MIT (keep `LICENSE`, credit av-converter / CrypticSignal in the footer and on `/about`)
- Stars: 187
- Last commit: 13 Nov 2026, 21:48 Africa/Kigali — `7bc9730578` on `master`
- Official demo: `https://av-converter.com`
- Stack: a complete in-browser audio/video converter using ffmpeg.wasm. We already used this same upstream successfully for Free Video to MP3 Converter. Specialize it to **audio**: OPUS, OGG, M4A, WAV, AAC (and other common audio) → MP3 (default), with optional WAV/AAC output if already easy. Do **not** copy the already-branded `web-free-site/free-video-to-mp3` repo (it contains another site's Adsterra keys and a different product).
- Cloudflare: yes — static assets / Workers with assets. You must add prerendered HTML for every public page (no bare SPA fallback).
- Verification (this box, 23 Nov 2026, Africa/Kigali): GitHub API. `LICENSE` is a real MIT file (Copyright (c) 2021 GitHub.com/CrypticSignal). Same FFmpeg-core caveat as our other ffmpeg sites.
- Why this one: MIT with a real `LICENSE` file, a complete working website, 187 stars and recent commits, and a known-good fit for in-browser ffmpeg conversion.

## Backup (MIT; audio-only vanilla site)

- Repo: https://github.com/lunae-f/FF-Web
- License: MIT (LICENSE file, Copyright (c) 2025 Lunae)
- Stars: 0
- Last commit: 29 Jul 2025, 08:55 Africa/Kigali — `9a3c25a565` on `main`
- Official demo: `https://ffweb.kusozako.com/`
- A simple 100% browser audio converter (vanilla `web/index.html`, `script.js`). The repo includes Docker/nginx and `web/coi-serviceworker.min.js` — **drop Docker/nginx and the COEP/COOP shim**. Same FFmpeg-core rules.

Second backup: https://github.com/dinoosauro/ffmpeg-web (MIT, Copyright (c) 2023 Dinoosauro, 292 stars, last commit 19 Sep 2026, 17:08 Africa/Kigali, `8dee93415f`, demo `https://ffmpeg-web.netlify.app/`). Specialize the UI to audio conversion.

## Do not use these

- Desktop, Electron, or server-side converters.
- Any tool that downloads audio from a URL, or that keeps a YouTube downloader.
- AGPL audio editors (`D3SOX/browser-audio-tools`, `est/audio-editor`).

## FFmpeg core license and file size (mandatory)

The JavaScript wrapper `@ffmpeg/ffmpeg` is MIT. The FFmpeg **WebAssembly cores are often not**.

- Official `@ffmpeg/core@0.12.10` is **GPL-2.0-or-later** on the npm registry. The npm license field on some older tags (including 0.12.6) may say MIT — do not trust that for the `.wasm` binary without checking the core you actually ship.
- Multi-thread cores (`@ffmpeg/core-mt`) need COEP/COOP, which **breaks Adsterra**. Do not use them.
- Gentil allows an **LGPL** ffmpeg.wasm core used as a library. A GPL core is worse.
- Prefer a **single-thread LGPL build** (no `--enable-gpl`, no COEP/COOP). If you cannot produce or obtain a clearly LGPL single-thread core, **STOP before shipping a GPL core** and report what you found, rather than quietly using a CDN `@ffmpeg/core` or `@ffmpeg/core-mt`.
- **Do not put a 25+ MiB `.wasm` file in the Worker assets or the Git repo.** Cloudflare static assets typically cap individual files at 25 MiB. Load the single-thread core at runtime from a public CDN or similar host, show a progress indicator, and cache it in the browser (Cache API or OPFS). Credit FFmpeg and ffmpeg.wasm on `/about`, and keep the license texts that apply to the core you actually ship.
- **Do not set COEP/COOP headers.** Ads will break if you do. Drop any `coi-serviceworker` or similar COOP/COEP shim.

For this site, libmp3lame (and basic audio decoders, including libopus if available) is enough; you do not need libx264.

## What to build on top of CrypticSignal/av-converter

1. Import the base into this repo, keep the MIT license, and credit av-converter / CrypticSignal (and FFmpeg / ffmpeg.wasm). Omit GitHub Actions workflows if any (the token lacks the `workflow` scope — do not restore them).
2. Rebrand to "Free Audio Converter". English primary. No FR/SW translations of the site. The home tool converts local audio to MP3. Call out WhatsApp voice notes (OPUS/OGG) as a first-class path. Keep a clear format picker. You may add prerendered format pages (`/opus-to-mp3`, `/m4a-to-mp3`, `/ogg-to-mp3`, `/wav-to-mp3`). Drop video-to-video as the primary UX (a discreet link to Free Video to MP3 Converter is fine: `https://free-video-to-mp3.web-free.site/?ref=audio-converter`).
3. Keep everything 100% in the browser. No accounts, no paid APIs, no API keys, no file upload, no YouTube, no URL import. Accept local audio (at least OPUS, OGG, M4A, WAV, AAC, MP3). Let the user preview when possible and download the result.
4. Adsterra only, never AdSense. Use **only** the placeholder keys in this brief (or real keys if a follow-up provides them). Follow the `free-invoice-generator` pattern: all 10 units, banners in isolated iframes, `public/ads.json`. Never set COEP/COOP headers. Ads must not break conversion, preview, or download.
5. SEO: prerendered HTML for every page (no bare SPA fallback); unique title, meta description, canonical, OG; JSON-LD (WebApplication + FAQPage); `sitemap.xml` and `robots.txt` for `https://free-audio-converter.web-free.site`; English how-to pages, at least `/how-to-convert-audio-in-the-browser`, `/whatsapp-voice-note-to-mp3`, `/opus-to-mp3`, and `/m4a-to-mp3` (each with its own title, description and canonical); prerendered `/privacy`, `/terms`, `/about`, `/contact`. Canonicals must be `https://free-audio-converter.web-free.site`. No French landing page.
6. Footer: credit the upstream project, FFmpeg, and ffmpeg.wasm, and add a link back to the hub `https://web-free.site/?ref=audio-converter`.
7. On every prerendered HTML page, before `</body>`, add the More free tools block and the Cloudflare Web Analytics beacon (see below). Implement this with `scripts/inject-more-tools.mjs` hooked into `postbuild` or the end of `npm run build`, so a later rebuild cannot drop the home-page snippets. Do not rely on a one-off manual edit of `dist/` / `out/`.
   - The same **"More free tools"** block used on the other web-free.site tools (`id="wf-more-tools"`). Include a "Guides on this site" column for the how-to pages. List every current hub tool, plus the six other sites in this batch. Show **Free Audio Converter** as bold text, not a self-link. Every outbound tool/hub link must carry `?ref=audio-converter`.
     - **Documents & writing:** Free Word Counter (`https://free-word-counter.web-free.site/?ref=audio-converter`), Free PDF Converter (`https://free-pdf-converter.web-free.site/?ref=audio-converter`), Free CV Maker (`https://free-cv-maker.web-free.site/?ref=audio-converter`), Free Invoice Generator (`https://free-invoice-generator.web-free.site/?ref=audio-converter`), Free Typing Test (`https://free-typing-test.web-free.site/?ref=audio-converter`), Free Signature Generator (`https://free-signature-generator.web-free.site/?ref=audio-converter`), Free Email Signature Generator (`https://free-email-signature-generator.web-free.site/?ref=audio-converter`).
     - **Images & codes:** Free QR Code Creator (`https://free-qr-code-creator.web-free.site/?ref=audio-converter`), Free Image Resizer (`https://free-image-resizer.web-free.site/?ref=audio-converter`), Free Image to Text (`https://free-image-to-text.web-free.site/?ref=audio-converter`), Free Background Remover (`https://free-background-remover.web-free.site/?ref=audio-converter`), Free Image Compressor (`https://free-image-compressor.web-free.site/?ref=audio-converter`), Free HEIC to JPG Converter (`https://free-heic-to-jpg.web-free.site/?ref=audio-converter`), Free Image Upscaler (`https://free-image-upscaler.web-free.site/?ref=audio-converter`), Free Passport Photo Maker (`https://free-passport-photo-maker.web-free.site/?ref=audio-converter`), Free PNG to SVG Converter (`https://free-png-to-svg.web-free.site/?ref=audio-converter`).
     - **Calculators & currency:** Free Online Calculator (`https://free-online-calculator.web-free.site/en/?ref=audio-converter`), Free Currency Converter (`https://free-currency-converter.web-free.site/?ref=audio-converter`), Free Unit Converter (`https://free-unit-converter.web-free.site/?ref=audio-converter`), Free Loan Calculator (`https://free-loan-calculator.web-free.site/?ref=audio-converter`), Free Age Calculator (`https://free-age-calculator.web-free.site/?ref=audio-converter`), Free Percentage Calculator (`https://free-percentage-calculator.web-free.site/?ref=audio-converter`), Free BMI Calculator (`https://free-bmi-calculator.web-free.site/?ref=audio-converter`).
     - **Text & SEO:** Free AI Humanizer (`https://free-ai-humanizer.web-free.site/?ref=audio-converter`), Free SEO Generator (`https://free-seo-generator.web-free.site/?ref=audio-converter`), Free Backlink Generator (`https://free-backlink-generator.web-free.site/?ref=audio-converter`), Free JSON Formatter (`https://free-json-formatter.web-free.site/?ref=audio-converter`), Free Text to Speech (`https://free-text-to-speech.web-free.site/?ref=audio-converter`), Free Speech to Text (`https://free-speech-to-text.web-free.site/?ref=audio-converter`), Free Diff Checker (`https://free-diff-checker.web-free.site/?ref=audio-converter`).
     - **Audio & video:** Free Video to MP3 Converter (`https://free-video-to-mp3.web-free.site/?ref=audio-converter`), Free MP3 Cutter (`https://free-mp3-cutter.web-free.site/?ref=audio-converter`), Free Screen Recorder (`https://free-screen-recorder.web-free.site/?ref=audio-converter`), Free Video Compressor (`https://free-video-compressor.web-free.site/?ref=audio-converter`), Free Video to GIF Converter (`https://free-video-to-gif.web-free.site/?ref=audio-converter`), **Free Audio Converter**.
     - **Files:** Free ZIP Tool (`https://free-zip-tool.web-free.site/?ref=audio-converter`).
     - **Test data:** Free Fake Address Generator (`https://free-fake-address-generator.web-free.site/?ref=audio-converter`), Free Fake Name Generator (`https://free-fake-name-generator.web-free.site/?ref=audio-converter`).
     - **Security & passwords:** Free Password Generator (`https://free-password-generator.web-free.site/?ref=audio-converter`).
   - The same Cloudflare Web Analytics tag used on the other sites: `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3e2f5f96ab32442ebb6e6f650615b58a"}'></script><!-- End Cloudflare Web Analytics -->`
8. `wrangler.toml`: `name = "free-audio-converter"`, `[assets]` pointing at the static build output (`dist` or `out`). Use `html_handling = "auto-trailing-slash"` and `not_found_handling = "none"`. Custom domain `free-audio-converter.web-free.site`. **Do not put `account_id` (or API tokens) in the committed file.** **Do not deploy.** Push to this repo only. Deploy happens from Gentil's box. Add a `.assetsignore` so Worker assets do not publish `AGENT_BRIEF.md`, `wrangler.toml`, `package.json`, `package-lock.json`, `.git/`, `node_modules/`, or other source/config files.
9. Test: production build, run locally (without COEP/COOP), convert a short WAV or M4A to MP3, and an OGG or OPUS to MP3 if you can obtain a fixture, download and play the results, check mobile at 390px, confirm no file is uploaded and that no URL downloader exists, fix bugs. Critique your own result and fix issues.
10. Push everything to `main`. Final report: base repo + license, which FFmpeg core you actually shipped (source, license, size, how it is loaded), pages, tests and results, remaining caveats, commit hash.

## Adsterra ad codes

Real Adsterra codes were not ready when this brief was written (the publisher-dashboard collection was stopped mid-run on an earlier attempt). **Do not invent real-looking keys.** Wire all 10 units and `public/ads.json` with the exact placeholder strings below (32 characters each, prefix `wf23placeholder0`). A later swap (or a follow-up to you with real keys) will replace them before deploy.

Code formats (KEY = the 32-char placeholder, later a 32-hex hash):
- Popunder: <script data-cfasync="false" src="https://abscloud.org/1/KEY"></script>
- Native Banner: <script async="async" data-cfasync="false" src="https://bauval.org/21/KEY"></script><div id="container-KEY"></div>
- Social Bar: <script data-cfasync="false" src="https://bauval.org/14/KEY"></script>
- Banner WxH: <script>atOptions = {'key':'KEY','format':'iframe','height':H,'width':W,'params':{}};</script><script src="https://bauval.org/22/KEY"></script>
- Smartlink URL: https://araplhn.org/4/KEY

## free-audio-converter.web-free.site — site ID SITE_ID_PENDING
Popunder wf23placeholder0popunder00000000
Native Banner wf23placeholder0nativebanner0000
Smartlink wf23placeholder0smartlink0000000
Social Bar wf23placeholder0socialbar0000000
468x60 wf23placeholder0banner468x600000
160x300 wf23placeholder0banner160x300000
320x50 wf23placeholder0banner320x500000
300x250 wf23placeholder0banner300x250000
160x600 wf23placeholder0banner160x600000
728x90 wf23placeholder0banner728x900000


---
NOTE: any /workspace/... box path mentioned above is NOT accessible to you; everything you need is inline below. Clone the base repo from GitHub yourself.

# COMMON RULES (contents of agent-brief-common.md)
COMMON RULES (from Gentil, mandatory):
- Start from an existing, usable open-source repository: search GitHub, then compare stars, activity, license (MIT/Apache/BSD preferred; avoid AGPL/GPL unless nothing else fits) and code quality. Import its code into this repo, keep its LICENSE, and credit it in the footer and on /about.
- Do NOT write the tool from scratch. If no suitable open-source base exists, STOP before coding and report the 2-3 best candidates and why they fail. Gentil must approve any from-scratch work, and he only allows it for one or two simple pages.
- Keep the model you were launched with. Do not switch models.
- Must be hostable on Cloudflare Workers with static assets (free plan). No paid APIs, no server costs, no API keys. Client-side processing preferred.
- Monetization: Adsterra only, never AdSense. This brief ships obviously fake placeholder keys (the `wf23placeholder0…` strings). Wire all 10 units with those exact strings so they can be swapped later. Do not invent real-looking 32-hex Adsterra keys, URLs, or site IDs. If this prompt (or a later follow-up) includes a filled "ADSTERRA CODES FOR THIS SITE" section with real 32-hex keys, use those instead of the placeholders. Integrate all 10 units following the free-invoice-generator pattern: Popunder and Social Bar in the HTML; 728x90 at the top; sidebar 160x600 and 160x300; mid-page 728x90, 468x60 and Native; 300x250; sticky 320x50 on mobile; Smartlink as a discreet link. Banners go in isolated iframes with atOptions {key, format:'iframe', height, width, params:{}} and src https://bauval.org/22/<key>. Also write public/ads.json with all the codes. Never set COEP/COOP headers. Ads must not break the tool.
- SEO: prerendered HTML for every page (no bare SPA fallback); unique title, meta description, canonical and OG tags; JSON-LD (WebApplication + FAQPage); a long-tail keyword page or two; FAQ and how-to content; /privacy, /terms, /about and /contact pages (prerendered). The site-specific brief may override hreflang / French landing pages.
- Name: "Free <Tool>". English primary.
- Hook a `scripts/inject-more-tools.mjs` (or equivalent) into `postbuild` or the end of `npm run build`, so the Cloudflare Web Analytics beacon and the "More free tools" block are injected into every built HTML page and cannot be dropped by a later rebuild.
- Add wrangler.toml with name = <repo name> and [assets] pointing to the build output. Do NOT deploy: Gentil's box deploys it.
- Test: build, run it locally, exercise the main feature in a browser, check mobile at 390px, and fix bugs. Critique your own result and fix the issues you find.
- Push everything to main of this repo.
- Final report: the base repo and its license, the pages, the tests and their results, the remaining caveats, and the commit hash.

# ADSTERRA CODES FOR THIS SITE (use only these)
- Popunder: <script data-cfasync="false" src="https://abscloud.org/1/KEY"></script>
- Native Banner: <script async="async" data-cfasync="false" src="https://bauval.org/21/KEY"></script><div id="container-KEY"></div>
- Social Bar: <script data-cfasync="false" src="https://bauval.org/14/KEY"></script>
- Banner WxH: <script>atOptions = {'key':'KEY','format':'iframe','height':H,'width':W,'params':{}};</script><script src="https://bauval.org/22/KEY"></script>
- Smartlink URL: https://araplhn.org/4/KEY

## free-audio-converter.web-free.site — site ID SITE_ID_PENDING
Popunder wf23placeholder0popunder00000000
Native Banner wf23placeholder0nativebanner0000
Smartlink wf23placeholder0smartlink0000000
Social Bar wf23placeholder0socialbar0000000
468x60 wf23placeholder0banner468x600000
160x300 wf23placeholder0banner160x300000
320x50 wf23placeholder0banner320x500000
300x250 wf23placeholder0banner300x250000
160x600 wf23placeholder0banner160x600000
728x90 wf23placeholder0banner728x900000
