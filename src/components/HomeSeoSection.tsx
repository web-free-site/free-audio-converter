import { HOME_SEO_ARTICLE_HTML } from '../seo/homeStaticMarkup';

/**
 * English SEO copy below the converter (~500–700 words). Uses h2/h3 only so the page keeps a single h1 in ConverterPage.
 */
export default function HomeSeoSection() {
  return (
    <article
      className="max-w-3xl mx-auto px-4 pb-10 text-left prose prose-invert prose-slate prose-headings:text-slate-100 prose-p:text-slate-300 prose-li:text-slate-300 prose-a:text-cyan-300"
      dangerouslySetInnerHTML={{ __html: HOME_SEO_ARTICLE_HTML }}
    />
  );
}