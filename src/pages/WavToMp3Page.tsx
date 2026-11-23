import ConverterPage from './ConverterPage';
import { usePageMeta } from '../seo/usePageMeta';

export default function WavToMp3Page() {
  usePageMeta({
    title: 'WAV to MP3 — Free audio compressor',
    description: 'Convert large WAV files to smaller MP3 in your browser. Choose bitrate, download locally.',
    path: '/wav-to-mp3',
  });
  return (
    <ConverterPage
      title="WAV to MP3 converter"
      lead="Shrink uncompressed WAV recordings to MP3 for sharing. All processing stays on your device."
      accept="audio/wav,.wav,audio/x-wav"
      formatsLabel="WAV"
      outputCodecFixed="MP3"
    />
  );
}