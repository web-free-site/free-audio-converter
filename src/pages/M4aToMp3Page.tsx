import ConverterPage from './ConverterPage';
import { usePageMeta } from '../seo/usePageMeta';

export default function M4aToMp3Page() {
  usePageMeta({
    title: 'M4A to MP3 — Free online converter',
    description: 'Convert M4A and AAC audio to MP3 without uploading. Works on desktop and mobile.',
    path: '/m4a-to-mp3',
  });
  return (
    <ConverterPage
      title="M4A to MP3 converter"
      lead="Convert M4A/AAC files from your phone or computer to MP3. Private, client-side conversion."
      accept="audio/mp4,.m4a,.aac,audio/aac"
      formatsLabel="M4A and AAC"
      outputCodecFixed="MP3"
    />
  );
}