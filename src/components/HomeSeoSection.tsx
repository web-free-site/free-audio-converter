import { Link } from 'react-router-dom';
import { HUB_GUIDE_URL, HUB_URL_REPO } from '../site';

/**
 * English SEO copy below the converter (~500–700 words). Uses h2/h3 only so the page keeps a single h1 in ConverterPage.
 */
export default function HomeSeoSection() {
  return (
    <article className="max-w-3xl mx-auto px-4 pb-10 text-left prose prose-invert prose-slate prose-headings:text-slate-100 prose-p:text-slate-300 prose-li:text-slate-300 prose-a:text-cyan-300">
      <h2>What this free audio converter does</h2>
      <p>
        Free Audio Converter is a browser-based tool that turns local audio files into formats you can share, edit, or
        archive. You might need MP3 for a podcast host, a smaller file for email, or WAV for an editor that expects
        uncompressed audio. Instead of installing desktop software or sending files to an unknown upload service, you open
        this page, pick a file from your phone or computer, and convert it on the spot.
      </p>
      <p>
        The converter uses FFmpeg packaged as WebAssembly inside your tab. Supported inputs include OPUS and OGG (WhatsApp
        voice notes), M4A, AAC, WAV, FLAC, and many other codecs. Default output is MP3; you can also choose WAV or AAC.
        Bitrate controls help balance quality and file size before you download.
      </p>

      <h2>How to convert audio in your browser (step by step)</h2>
      <ol>
        <li>
          Open this page and allow JavaScript. The tool needs a modern browser with WebAssembly support (Chrome, Firefox,
          Safari, Edge, and most mobile browsers).
        </li>
        <li>
          Click or tap <strong>Choose an audio file</strong> and select a track from your device. The file stays local; nothing
          is uploaded to a server.
        </li>
        <li>
          Wait a moment while the preview loads duration, codec, and track information. Multi-track files show how many audio
          streams were detected.
        </li>
        <li>
          Under <strong>Output format &amp; settings</strong>, pick MP3 (default), WAV, or AAC. For MP3, choose CBR, VBR, or ABR
          and the quality level that matches how you will use the file.
        </li>
        <li>
          Click <strong>Convert</strong>. The first run on a new device downloads the FFmpeg core once; later visits reuse the
          cached encoder and start faster.
        </li>
        <li>
          When processing finishes, preview the audio in the built-in player, then use <strong>Download</strong> to save the new
          file. Close the tab after large jobs to free memory in the browser.
        </li>
      </ol>
      <p>
        For format-specific walkthroughs, see our guides on this site for{' '}
        <Link to="/opus-to-mp3">OPUS to MP3</Link>, <Link to="/m4a-to-mp3">M4A to MP3</Link>,{' '}
        <Link to="/ogg-to-mp3">OGG to MP3</Link>, and <Link to="/wav-to-mp3">WAV to MP3</Link>, or read{' '}
        <Link to="/how-to-convert-audio-in-the-browser">how to convert audio in the browser</Link> for a concise checklist.
      </p>

      <h2>Privacy and in-browser processing</h2>
      <p>
        Many “free online converters” ask you to upload files to their cloud. Here, decoding and encoding happen entirely on
        your machine. We do not store your media or require an account. Network traffic is limited to loading this site, the
        FFmpeg WebAssembly core, and ad scripts that fund the tool—your audio file is not sent upstream.
      </p>
      <p>
        Because processing uses your device’s CPU and RAM, very long files or dozens of tabs open at once can slow conversion
        or trigger an out-of-memory warning. That is a local browser limit, not a server quota. Work on copies of important
        masters, and only convert content you have the right to use.
      </p>

      <h2>Common use cases</h2>
      <h3>Voice messages and chat apps</h3>
      <p>
        WhatsApp, Signal, and similar apps often store voice notes as OPUS or OGG. Editors, slideshow software, and some phones
        expect MP3 or M4A instead. Convert a saved voice note here without exporting it through a third-party upload form.
      </p>
      <h3>Podcasts, lectures, and field recordings</h3>
      <p>
        WAV and FLAC recordings are high quality but heavy. Converting to MP3 at a sensible VBR setting makes sharing and
        backup easier while keeping speech clear. Use WAV output when you need an edit-friendly master without another desktop
        install.
      </p>
      <h3>Music and ringtones</h3>
      <p>
        Downloaded AAC or M4A tracks can be turned into MP3 for older car stereos, DJ software, or hardware that lists MP3
        only. Adjust bitrate before converting so ringtones stay small and full songs retain detail.
      </p>
      <h3>Video-adjacent workflows</h3>
      <p>
        If you need audio ripped from video files, use our sister tool{' '}
        <a href="https://free-video-to-mp3.web-free.site/?ref=free-audio-converter" rel="noopener noreferrer">
          Free Video to MP3 Converter
        </a>{' '}
        for MP4, MOV, and WebM sources. This audio converter focuses on files that are already audio-only.
      </p>

      <p>
        Free Audio Converter is part of the{' '}
        <a href={HUB_URL_REPO}>web-free.site</a> collection of utilities that run in the browser. For a longer how-to with
        troubleshooting tips, read the hub guide{' '}
        <a href={HUB_GUIDE_URL}>Convert audio between MP3, WAV, M4A, and more</a>.
      </p>
    </article>
  );
}