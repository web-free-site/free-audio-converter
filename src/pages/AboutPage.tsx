import ContentPage from './ContentPage';

export default function AboutPage() {
  return (
    <ContentPage
      title="About Free Audio Converter"
      description="Privacy-first local audio conversion, upstream credits, and FFmpeg LGPL compliance."
      path="/about"
    >
      <p>
        This site converts audio files you already have on your device to MP3, WAV, or AAC. It does not download from
        URLs, and it does not upload your files.
      </p>
      <h2>Upstream project</h2>
      <p>
        The converter is derived from{' '}
        <a href="https://github.com/CrypticSignal/av-converter">CrypticSignal/av-converter</a> (MIT). See also{' '}
        <code>LICENSE-UPSTREAM</code> in this repository.
      </p>
      <h2>FFmpeg &amp; ffmpeg.wasm</h2>
      <p>
        Encoding uses a <strong>single-threaded LGPL FFmpeg WebAssembly core</strong> (no libx264/libx265, no GPL codecs).
        Build recipe and Dockerfile are in <code>vendor/ffmpeg-lgpl-source/</code> in the repository. The JavaScript
        wrapper <a href="https://github.com/ffmpegwasm/ffmpeg.wasm">@ffmpeg/ffmpeg</a> is MIT.
      </p>
      <p>
        Because the core WASM is about 29–30&nbsp;MB, it is loaded at runtime from a CDN and cached in the browser — not
        shipped as a Cloudflare Worker static asset.
      </p>
      <h2>Related tools</h2>
      <p>
        Visit the <a href="https://web-free.site/?ref=audio-converter">web-free.site</a> hub for other free in-browser
        utilities. To extract audio from video files, use{' '}
        <a href="https://free-video-to-mp3.web-free.site/?ref=audio-converter">Free Video to MP3 Converter</a>.
      </p>
    </ContentPage>
  );
}