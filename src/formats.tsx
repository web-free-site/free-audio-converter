/**
 * Output formats for local audio conversion (MP3 default; optional WAV/AAC).
 */
import React from 'react';
import SelectField from './components/SelectField';
import LabeledSlider from './components/LabeledSlider';

export type Codec = 'MP3' | 'WAV' | 'AAC';

export interface FormatSettings {
  downmixToStereo: boolean;
  mp3Bitrate: string;
  mp3EncodingType: string;
  mp3VbrSetting: string;
  aacBitrate: string;
  /** Unused; kept for createFFmpegArgs compatibility */
  isKeepVideo: boolean;
  outputType: 'audio';
  videoAudio: 'none';
}

export const DEFAULT_SETTINGS: FormatSettings = {
  downmixToStereo: false,
  mp3Bitrate: '192',
  mp3EncodingType: 'cbr',
  mp3VbrSetting: '4',
  aacBitrate: '192',
  isKeepVideo: false,
  outputType: 'audio',
  videoAudio: 'none',
};

export type SetSetting = <K extends keyof FormatSettings>(key: K, value: FormatSettings[K]) => void;

const BitrateSlider = ({
  id,
  label,
  value,
  onChange,
  min = 64,
  max = 320,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: number;
  max?: number;
}) => (
  <LabeledSlider id={id} label={label} min={min} max={max} step={32} value={value} unit="kbps" onChange={onChange} />
);

export const FORMATS = {
  MP3: {
    label: 'MP3 (.mp3)',
    extension: '.mp3',
    downloadLabel: 'Download MP3',
    convertLabel: 'Convert to MP3',
    keepVideo: false,
    copiesAudio: false,
    stereoOnly: false,
    allAudioTracks: false,
    args: (s: FormatSettings) => {
      if (s.mp3EncodingType === 'vbr') return ['-c:a', 'libmp3lame', '-q:a', s.mp3VbrSetting];
      if (s.mp3EncodingType === 'abr') {
        return ['-c:a', 'libmp3lame', '-abr', '1', '-b:a', `${s.mp3Bitrate}k`];
      }
      return ['-c:a', 'libmp3lame', '-b:a', `${s.mp3Bitrate}k`];
    },
    settings: (settings: FormatSettings, set: SetSetting) => (
      <>
        <SelectField
          id="mp3_encoding_type"
          label="Encoding type"
          value={settings.mp3EncodingType}
          onChange={v => set('mp3EncodingType', v)}
          options={[
            ['cbr', 'CBR (constant bitrate)'],
            ['vbr', 'VBR (variable bitrate)'],
            ['abr', 'ABR (average bitrate)'],
          ]}
        />
        {settings.mp3EncodingType === 'vbr' ? (
          <SelectField
            id="mp3_vbr_setting"
            label="VBR quality (0 = best)"
            value={settings.mp3VbrSetting}
            onChange={v => set('mp3VbrSetting', v)}
            options={['0', '2', '4', '6', '8'].map(v => [v, v] as const)}
          />
        ) : (
          <BitrateSlider id="mp3_bitrate" label="Bitrate" value={settings.mp3Bitrate} onChange={v => set('mp3Bitrate', v)} />
        )}
      </>
    ),
  },
  WAV: {
    label: 'WAV (.wav)',
    extension: '.wav',
    downloadLabel: 'Download WAV',
    convertLabel: 'Convert to WAV',
    keepVideo: false,
    copiesAudio: true,
    stereoOnly: false,
    allAudioTracks: false,
    args: () => ['-c:a', 'pcm_s16le'],
    settings: () => <p className="text-sm text-slate-400">Uncompressed 16-bit PCM. Larger files, no quality loss from re-encoding.</p>,
  },
  AAC: {
    label: 'AAC (.m4a)',
    extension: '.m4a',
    downloadLabel: 'Download AAC',
    convertLabel: 'Convert to AAC',
    keepVideo: false,
    copiesAudio: false,
    stereoOnly: false,
    allAudioTracks: false,
    args: (s: FormatSettings) => ['-c:a', 'aac', '-b:a', `${s.aacBitrate}k`],
    settings: (settings: FormatSettings, set: SetSetting) => (
      <BitrateSlider
        id="aac_bitrate"
        label="Bitrate"
        value={settings.aacBitrate}
        onChange={v => set('aacBitrate', v)}
        min={64}
        max={320}
      />
    ),
  },
} as const;