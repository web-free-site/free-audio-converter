import ConverterPage from './ConverterPage';
import { JsonLdFaq, JsonLdWebApp } from '../components/JsonLd';
import { usePageMeta } from '../seo/usePageMeta';
import { SITE_NAME, SITE_URL } from '../site';

const FAQ = [
  {
    question: 'Does this upload my audio to a server?',
    answer: 'No. The converter runs entirely in your browser using WebAssembly. Your file never leaves your device.',
  },
  {
    question: 'Which audio formats can I convert?',
    answer: 'OPUS and OGG (including WhatsApp voice notes), M4A, WAV, AAC, MP3, FLAC, and other formats FFmpeg can read. Output is MP3 by default; you can also choose WAV or AAC.',
  },
  {
    question: 'How do I convert a WhatsApp voice note to MP3?',
    answer: 'Save or forward the voice note, pick the .opus or .ogg file from your phone, and convert. See our WhatsApp guide for more detail.',
  },
  {
    question: 'Why does the first conversion take longer?',
    answer: 'The app downloads the LGPL FFmpeg WebAssembly core once (about 29 MB) and caches it in your browser for future visits.',
  },
  {
    question: 'Can I adjust MP3 quality?',
    answer: 'Yes. Choose constant bitrate (CBR), variable bitrate (VBR), or average bitrate (ABR) before converting to MP3.',
  },
];

export default function HomePage() {
  usePageMeta({
    title: `${SITE_NAME} — Convert audio in your browser`,
    description:
      'Free audio converter. Turn OPUS, OGG, M4A, WAV, or AAC into MP3 locally. WhatsApp voice notes supported. No upload, no account.',
    path: '/',
  });

  return (
    <>
      <JsonLdWebApp />
      <JsonLdFaq faqs={FAQ} />
      <ConverterPage
        title={SITE_NAME}
        lead="Pick a local audio file, choose MP3 (or WAV/AAC), and download. Processing uses FFmpeg in WebAssembly on your computer — nothing is uploaded."
      />
      <section className="max-w-3xl mx-auto px-4 pb-12 text-left">
        <h2 className="text-xl font-semibold text-white mb-4">FAQ</h2>
        <dl className="space-y-4 text-slate-300 text-sm">
          {FAQ.map(f => (
            <div key={f.question}>
              <dt className="font-medium text-slate-100">{f.question}</dt>
              <dd className="mt-1">{f.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-slate-500">
          Canonical URL: <a href={SITE_URL}>{SITE_URL}</a>
        </p>
      </section>
    </>
  );
}