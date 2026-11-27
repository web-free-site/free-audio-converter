import ConverterPage from './ConverterPage';
import HomeSeoSection from '../components/HomeSeoSection';
import { JsonLdFaq, JsonLdWebApp } from '../components/JsonLd';
import { HOME_FAQ } from '../seo/homeFaq';
import { usePageMeta } from '../seo/usePageMeta';
import { HOME_LEAD } from '../seo/homeStaticMarkup';
import { SITE_NAME, SITE_URL } from '../site';

const HOME_TITLE = `${SITE_NAME} — Convert OPUS, M4A, WAV, AAC to MP3 Free`;
const HOME_DESCRIPTION =
  'Free audio converter in your browser. Turn OPUS, OGG, M4A, WAV, AAC, and WhatsApp voice notes into MP3 locally. No upload, no account—FFmpeg WebAssembly on your device.';

export default function HomePage() {
  usePageMeta({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: '/',
  });

  return (
    <>
      <JsonLdWebApp />
      <JsonLdFaq faqs={[...HOME_FAQ]} />
      <ConverterPage
        title={SITE_NAME}
        lead={HOME_LEAD}
      />
      <HomeSeoSection />
      <section className="max-w-3xl mx-auto px-4 pb-12 text-left">
        <h2 className="text-xl font-semibold text-white mb-4">Frequently asked questions</h2>
        <dl className="space-y-4 text-slate-300 text-sm">
          {HOME_FAQ.map(f => (
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