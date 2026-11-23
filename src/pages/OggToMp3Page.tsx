import ConverterPage from './ConverterPage';
import { usePageMeta } from '../seo/usePageMeta';

export default function OggToMp3Page() {
  usePageMeta({
    title: 'OGG to MP3 — Free browser converter',
    description: 'Convert OGG Vorbis and OPUS-in-OGG audio to MP3 online. No server upload.',
    path: '/ogg-to-mp3',
  });
  return (
    <ConverterPage
      title="OGG to MP3 converter"
      lead="Save OGG audio as MP3 on your device. Ideal for voice notes and open-source audio."
      accept="audio/ogg,.ogg,.oga,audio/opus,.opus"
      formatsLabel="OGG and OPUS"
      outputCodecFixed="MP3"
    />
  );
}