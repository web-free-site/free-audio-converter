/**
 * Local audio converter. Files are processed with ffmpeg.wasm in the browser; nothing uploads.
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import {
  convertFile,
  loadFFmpeg,
  OUT_OF_MEMORY_ADVICE,
  setFfmpegCoreLoadProgress,
  type ConvertedFile,
} from '../utils/convertFile';
import { markConversionEnded, markConversionStarted, takeUnfinishedConversion } from '../utils/unfinishedConversion';
import OperationStatus from '../components/OperationStatus';
import type { OperationProgress } from '../utils/progress';
import { createFFmpegArgs } from '../utils/createFFmpegArgs';
import { formatBytes } from '../utils/progress';
import { loadSettings, saveSettings } from '../utils/savedSettings';
import { probeFile, type StreamInfo } from '../utils/probeFile';
import { freeOutputSpace, removeAbandonedOutputs } from '../utils/outputStorage';
import MediaInfoPanel, { type MediaInfoState } from '../components/MediaInfoPanel';
import { FORMATS, type Codec, type FormatSettings, type SetSetting } from '../formats';
import Alert, { type AlertSeverity } from '../components/Alert';
import Button from '../components/Button';
import DownmixControl from '../components/DownmixControl';
import FileInput from '../components/FileInput';
import SelectField from '../components/SelectField';
import { AdSlot } from '../components/ads/AdSlot';
import ffmpegLogo from '../images/ffmpeg-25.png';
import webAssemblyLogo from '../images/webassembly-25.png';

export type ConverterPageProps = {
  title: string;
  lead: string;
  accept?: string;
  formatsLabel?: string;
  /** Lock output to MP3 (format landing pages). */
  outputCodecFixed?: Codec;
};

let crashedDuring = takeUnfinishedConversion();

const withoutExtension = (filename: string) =>
  filename.includes('.') ? filename.slice(0, filename.lastIndexOf('.')) : filename;

const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <section className="py-6 first:pt-0 border-b border-white/[0.06] last:border-b-0">
    <h2 className="flex items-center gap-3 mb-4 text-left text-base font-semibold text-slate-100">
      <span className="grid place-items-center h-7 w-7 shrink-0 rounded-full text-xs font-bold text-white bg-gradient-to-br from-violet-500 to-cyan-500 shadow-md shadow-violet-500/30">
        {n}
      </span>
      {title}
    </h2>
    {children}
  </section>
);

const DEFAULT_ACCEPT =
  'audio/*,.opus,.ogg,.oga,.m4a,.wav,.aac,.mp3,.flac,.wma,.aiff,.aif,.caf,.amr,.3gp';

export default function ConverterPage({
  title,
  lead,
  accept = DEFAULT_ACCEPT,
  formatsLabel = 'OPUS, OGG, M4A, WAV, AAC, MP3, and other common audio files',
  outputCodecFixed,
}: ConverterPageProps) {
  const [alert, setAlert] = useState<{ severity: AlertSeverity; message: string } | null>(() =>
    crashedDuring
      ? {
          severity: 'error',
          message: `The conversion of ${crashedDuring} stopped because the browser ran out of memory. ${OUT_OF_MEMORY_ADVICE}`,
        }
      : null,
  );

  const [saved] = useState(loadSettings);
  const initialCodec = outputCodecFixed ?? (Object.hasOwn(FORMATS, saved.codec) ? saved.codec : 'MP3');
  const [outputCodec, setOutputCodec] = useState<Codec>(initialCodec);
  const [settings, setSettings] = useState<FormatSettings>(saved.settings);
  const setSetting: SetSetting = useCallback(
    (key, value) => {
      setSettings(prev => {
        const next = { ...prev, [key]: value };
        saveSettings({ codec: outputCodec, settings: next });
        return next;
      });
    },
    [outputCodec],
  );

  const onOutputCodecChange = (codec: Codec) => {
    setOutputCodec(codec);
    saveSettings({ codec, settings });
  };

  const [file, setFile] = useState<File | undefined>();
  const [outputName, setOutputName] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [ffmpegCommand, setFfmpegCommand] = useState('');
  const [status, setStatus] = useState<OperationProgress>({ stage: 'Ready' });
  const [logs, setLogs] = useState('');
  const [mediaInfo, setMediaInfo] = useState<MediaInfoState | null>(null);
  const [output, setOutput] = useState<ConvertedFile | null>(null);
  const [coreLoadPct, setCoreLoadPct] = useState<number | undefined>();

  const format = FORMATS[outputCodec];

  const probeToken = useRef<object | null>(null);
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const session = useRef<object | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => {
    if (output) URL.revokeObjectURL(output.url);
  }, [output]);

  const stopWorker = () => {
    session.current = null;
    const current = ffmpegRef.current;
    ffmpegRef.current = null;
    current?.terminate();
  };

  useEffect(() => {
    ffmpegRef.current = new FFmpeg();
    removeAbandonedOutputs();
    freeOutputSpace();
    setFfmpegCoreLoadProgress((loaded, total, phase) => {
      if (phase === 'wasm' && total) setCoreLoadPct(Math.round((loaded / total) * 100));
    });
    void loadFFmpeg(ffmpegRef.current).catch(() => {
      /* surfaced when user converts */
    });
    return stopWorker;
  }, []);

  useEffect(() => {
    if (!file) {
      setMediaInfo(null);
      return;
    }
    const token = {};
    probeToken.current = token;
    setMediaInfo({ status: 'loading' });
    const isActive = () => probeToken.current === token;
    probeFile(ffmpegRef.current!, file, isActive)
      .then(info => {
        if (probeToken.current !== token) return;
        setMediaInfo({ status: 'ready', info });
      })
      .catch(() => {
        if (probeToken.current !== token) return;
        setMediaInfo({ status: 'failed' });
      });
  }, [file]);

  const onFileChange = (next: File | undefined) => {
    setFile(next);
    setOutput(null);
    if (next) setOutputName(withoutExtension(next.name));
    crashedDuring = null;
  };

  const onConvert = async () => {
    if (!file || !ffmpegRef.current) return;
    const ffmpeg = ffmpegRef.current;
    const activeSession = {};
    session.current = activeSession;
    const isActive = () => session.current === activeSession;

    setIsConverting(true);
    setAlert(null);
    setLogs('');
    markConversionStarted(file.name);

    const { ffmpegArgs, outputFilename } = createFFmpegArgs(
      file.name,
      outputCodec,
      settings,
      outputName || withoutExtension(file.name),
      0,
    );
    setFfmpegCommand(ffmpegArgs.join(' '));

    try {
      await convertFile(ffmpeg, {
        file,
        ffmpegArgs,
        outputFilename,
        knownTimeline: true,
        isActive,
        onAlert: (severity, message) => setAlert({ severity, message }),
        onStatus: value => {
          if (isActive()) setStatus(value);
        },
        onLog: message => {
          if (isActive()) setLogs(prev => (prev ? `${prev}\n${message}` : message));
        },
        onOutput: converted => setOutput(converted),
      });
    } finally {
      if (isActive()) {
        setIsConverting(false);
        markConversionEnded();
      }
    }
  };

  const audioStreams =
    mediaInfo?.status === 'ready'
      ? mediaInfo.info.streams.filter((s: StreamInfo) => s.type === 'audio')
      : [];

  return (
    <div className="max-w-6xl mx-auto text-left">
      <header className="text-center mb-6 px-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">{lead}</p>
        <AdSlot slot="homeTop728x90" className="mt-4 mx-auto flex justify-center" />
      </header>

      <div className="grid lg:grid-cols-[1fr_200px] gap-6 items-start">
        <div className="glass-card float-in rounded-3xl p-5 sm:p-8">
          <Step n={1} title={`Choose an audio file (${formatsLabel})`}>
            <FileInput filename={file?.name ?? ''} onFile={onFileChange} disabled={isConverting} accept={accept} />
            <p className="text-xs text-slate-400 mt-2">
              Files stay on your device. Supported: {formatsLabel}. WhatsApp voice notes (OPUS/OGG) work well.
            </p>
          </Step>

          {file && (
            <Step n={2} title="Preview & audio tracks">
              {mediaInfo && <MediaInfoPanel state={mediaInfo} />}
              {audioStreams.length > 0 && (
                <p className="text-sm text-slate-300 mt-2">
                  {audioStreams.length} audio track{audioStreams.length > 1 ? 's' : ''} detected.
                </p>
              )}
            </Step>
          )}

          <Step n={3} title="Output format & settings">
            <div className="flex flex-col gap-4 max-w-md">
              {!outputCodecFixed && (
                <SelectField
                  id="output_codec"
                  label="Output format"
                  value={outputCodec}
                  onChange={v => onOutputCodecChange(v as Codec)}
                  options={(Object.keys(FORMATS) as Codec[]).map(c => [c, FORMATS[c].label] as const)}
                />
              )}
              <DownmixControl stereoOnly={false} value={settings.downmixToStereo} onChange={v => setSetting('downmixToStereo', v)} />
              {format.settings(settings, setSetting)}
            </div>
          </Step>

          <Step n={4} title="Convert">
            <div className="flex flex-wrap gap-3 items-center">
              <Button onClick={onConvert} disabled={!file || isConverting}>
                {isConverting ? 'Converting…' : format.convertLabel}
              </Button>
              {coreLoadPct !== undefined && coreLoadPct < 100 && !ffmpegRef.current?.loaded && (
                <span className="text-xs text-slate-400">Loading encoder: {coreLoadPct}%</span>
              )}
            </div>
            {alert && (
              <Alert severity={alert.severity} className="mt-4">
                {alert.message}
              </Alert>
            )}
            <OperationStatus progress={status} logs={logs} busy={isConverting} />
            {ffmpegCommand && (
              <p className="mt-2 text-xs text-slate-500 font-mono break-all" aria-live="off">
                {ffmpegCommand}
              </p>
            )}
          </Step>

          {output && (
            <section className="pt-6 border-t border-white/[0.06]">
              <h2 className="text-base font-semibold text-slate-100 mb-3">Download & preview</h2>
              <p className="text-sm text-slate-300 mb-2">
                {output.filename} ({formatBytes(output.size)})
              </p>
              <a
                href={output.url}
                download={output.filename}
                className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 text-sm font-medium"
              >
                {format.downloadLabel}
              </a>
              <audio ref={audioRef} className="w-full mt-4" controls src={output.url} preload="metadata" />
              <AdSlot slot="nativeBelowResult" className="mt-4" />
            </section>
          )}

          <AdSlot slot="betweenToolContent728x90" className="mt-6 flex justify-center" />

          <footer className="mt-8 pt-4 border-t border-white/[0.06] flex flex-wrap gap-3 items-center text-xs text-slate-400">
            <img src={ffmpegLogo} alt="" width={25} height={25} />
            <span>Powered by FFmpeg (LGPL build) via ffmpeg.wasm in WebAssembly</span>
            <img src={webAssemblyLogo} alt="" width={25} height={25} />
            <span className="w-full sm:w-auto">
              Need video? Try{' '}
              <a
                href="https://free-video-to-mp3.web-free.site/?ref=audio-converter"
                className="text-cyan-300 hover:text-cyan-200 underline"
                rel="noopener noreferrer"
              >
                Free Video to MP3 Converter
              </a>
              .
            </span>
          </footer>
        </div>

        <aside className="hidden lg:flex flex-col gap-4 sticky top-20">
          <AdSlot slot="sidebar160x600" />
          <AdSlot slot="sidebar160x300" />
        </aside>
      </div>

      <AdSlot slot="content468x60" className="mt-6 flex justify-center lg:hidden" />
      <AdSlot slot="content300x250" className="mt-4 flex justify-center" />
      <AdSlot slot="mobileSticky320x50" className="ad-slot--sticky-mobile" />
    </div>
  );
}