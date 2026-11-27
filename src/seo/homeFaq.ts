export const HOME_FAQ = [
  {
    question: 'Does this free audio converter upload my files to a server?',
    answer:
      'No. Conversion runs entirely in your browser using FFmpeg compiled to WebAssembly. Your audio never leaves your device, and we do not receive filenames, contents, or metadata from your session.',
  },
  {
    question: 'Which input formats can I convert to MP3?',
    answer:
      'You can convert OPUS, OGG, M4A, AAC, WAV, MP3, FLAC, WMA, AIFF, and most other formats that FFmpeg can read. Output is MP3 by default; you may also choose uncompressed WAV or AAC when those settings are available.',
  },
  {
    question: 'How do I turn a WhatsApp voice note into MP3?',
    answer:
      'Save or export the voice message as an OPUS or OGG file, open this page, choose that file, select MP3 output, and convert. See our WhatsApp voice note guide on this site for device-specific saving tips.',
  },
  {
    question: 'Why does the first conversion take longer than the next one?',
    answer:
      'On the first visit the app downloads the LGPL FFmpeg WebAssembly core (about 29 MB) and stores it in your browser cache. Later conversions on the same device reuse that core and start much faster.',
  },
  {
    question: 'Can I control MP3 quality and file size?',
    answer:
      'Yes. Before converting, pick constant bitrate (CBR), variable bitrate (VBR), or average bitrate (ABR) for MP3, along with stereo downmix options when your source has multiple channels.',
  },
] as const;