import ContentPage from './ContentPage';

export default function HowToConvertAudioPage() {
  return (
    <ContentPage
      title="How to convert audio in the browser"
      description="Step-by-step guide to turning OPUS, OGG, M4A, WAV, or AAC into MP3 without uploading files to a server."
      path="/how-to-convert-audio-in-the-browser"
    >
      <ol>
        <li>Open Free Audio Converter on this site.</li>
        <li>Click or tap to choose an audio file from your device (OPUS, OGG, M4A, WAV, AAC, MP3, etc.).</li>
        <li>Wait for the preview panel to show duration and codec information.</li>
        <li>Pick output format (MP3 by default), then select bitrate or VBR quality for MP3.</li>
        <li>Click Convert. The first run downloads the FFmpeg encoder (cached afterward).</li>
        <li>Download the result or listen in the built-in player.</li>
      </ol>
      <p>
        Nothing is uploaded: conversion uses ffmpeg.wasm inside your tab. Close the tab when finished to free memory on
        large files.
      </p>
      <h2>WhatsApp voice notes</h2>
      <p>
        Voice messages are often OPUS or OGG. See{' '}
        <a href="/whatsapp-voice-note-to-mp3">WhatsApp voice note to MP3</a> for saving and picking the file on mobile.
      </p>
    </ContentPage>
  );
}