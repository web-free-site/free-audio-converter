import ContentPage from './ContentPage';

export default function WhatsappVoiceNotePage() {
  return (
    <ContentPage
      title="WhatsApp voice note to MP3"
      description="How to save a WhatsApp voice message and convert OPUS or OGG to MP3 in your browser."
      path="/whatsapp-voice-note-to-mp3"
    >
      <p>
        WhatsApp stores voice notes as OPUS (sometimes in an OGG container). You can convert them to MP3 here without
        uploading to a server.
      </p>
      <h2>On Android</h2>
      <ol>
        <li>Open the chat with the voice note and forward or share the message to Files or a folder you can access.</li>
        <li>Alternatively, use a file manager to find WhatsApp media under <code>WhatsApp/Media/WhatsApp Voice Notes</code>.</li>
        <li>Open this site, choose the <code>.opus</code> or <code>.ogg</code> file, and convert to MP3.</li>
      </ol>
      <h2>On iPhone</h2>
      <ol>
        <li>Save the voice note via Share → Save to Files (or export with a shortcut that writes OPUS/OGG).</li>
        <li>In Safari, open Free Audio Converter and pick the saved file from Files.</li>
        <li>Convert and download MP3.</li>
      </ol>
      <h2>On desktop</h2>
      <p>
        Export the voice note from WhatsApp Web or copy the media file from a phone backup, then use the{' '}
        <a href="/opus-to-mp3">OPUS to MP3</a> page or the home converter.
      </p>
    </ContentPage>
  );
}