import ConverterPage from './ConverterPage';
import { usePageMeta } from '../seo/usePageMeta';

export default function OpusToMp3Page() {
  usePageMeta({
    title: 'OPUS to MP3 — Free browser converter',
    description: 'Convert OPUS audio (WhatsApp voice notes) to MP3 in your browser. No upload, private, free.',
    path: '/opus-to-mp3',
  });
  return (
    <ConverterPage
      title="OPUS to MP3 converter"
      lead="Turn OPUS files—including WhatsApp voice notes—into MP3. Everything runs locally in your browser."
      accept="audio/opus,.opus,audio/ogg,.ogg"
      formatsLabel="OPUS and OGG"
      outputCodecFixed="MP3"
    />
  );
}