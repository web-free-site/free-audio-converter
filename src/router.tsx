import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './routes/RootLayout';
import HomePage from './pages/HomePage';
import OpusToMp3Page from './pages/OpusToMp3Page';
import M4aToMp3Page from './pages/M4aToMp3Page';
import OggToMp3Page from './pages/OggToMp3Page';
import WavToMp3Page from './pages/WavToMp3Page';
import HowToConvertAudioPage from './pages/HowToConvertAudioPage';
import WhatsappVoiceNotePage from './pages/WhatsappVoiceNotePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'opus-to-mp3', element: <OpusToMp3Page /> },
      { path: 'm4a-to-mp3', element: <M4aToMp3Page /> },
      { path: 'ogg-to-mp3', element: <OggToMp3Page /> },
      { path: 'wav-to-mp3', element: <WavToMp3Page /> },
      { path: 'how-to-convert-audio-in-the-browser', element: <HowToConvertAudioPage /> },
      { path: 'whatsapp-voice-note-to-mp3', element: <WhatsappVoiceNotePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
]);

export default router;