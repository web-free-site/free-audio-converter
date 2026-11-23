import React, { useState } from "react";
import { BUTTON_CLASSES } from "./Button";

interface FileInputProps {
  onFile: (file: File | undefined) => void;
  filename: string;
  disabled?: boolean;
  accept?: string;
}

const DEFAULT_ACCEPT = [
  "audio/*",
  ".3g2", ".3gp", ".aac", ".ac3", ".adpcm", ".aif", ".aifc", ".aiff", ".amr", ".ape", ".au", ".caf",
  ".flac", ".m4a", ".m4b", ".mka", ".mp3", ".mp2", ".oga", ".ogg", ".opus", ".spx", ".tta", ".wav",
  ".wma", ".wv",
].join(",");

const FileInput: React.FC<FileInputProps> = ({ onFile, filename, disabled = false, accept = DEFAULT_ACCEPT }) => {
  const [dragging, setDragging] = useState(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  return (
    <div
      data-testid="file-drop-zone"
      onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = disabled ? "none" : "copy"; }}
      onDragEnter={e => { e.preventDefault(); setDragging(!disabled); }}
      onDragLeave={e => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false);
      }}
      onDrop={onDrop}
      className={`group relative w-full px-6 py-10 border-2 border-dashed rounded-2xl transition-all duration-200 ${
        dragging
          ? "border-violet-400 bg-violet-500/10 scale-[1.01] shadow-[0_0_40px_-10px_rgba(139,92,246,0.7)]"
          : "border-white/15 bg-white/[0.02] hover:border-violet-400/60 hover:bg-white/[0.04]"}`}
    >
      <div className={`mx-auto mb-4 grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/20 ring-1 ring-white/10 transition-transform duration-200 group-hover:-translate-y-0.5 ${dragging ? "pulse-ring" : ""}`}>
        {filename ? (
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-violet-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 16V4M6 10l6-6 6 6" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
          </svg>
        )}
      </div>
      <label
        className={`${BUTTON_CLASSES.primary} max-w-full cursor-pointer
          has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-violet-400
          has-disabled:cursor-not-allowed has-disabled:bg-none has-disabled:bg-white/10 has-disabled:text-white/40
          has-disabled:shadow-none has-disabled:hover:translate-y-0 has-disabled:hover:brightness-100`}
      >
        <span className="truncate">{filename || "Choose an audio file"}</span>
        <input
          className="sr-only"
          disabled={disabled}
          accept={accept}
          type="file"
          onChange={e => {
            onFile(e.currentTarget.files?.[0]);
            e.currentTarget.value = "";
          }}
        />
      </label>
      <p className="text-sm text-slate-400 mt-3">
        {dragging ? "Drop to select this file" : filename ? "Click to choose another file, or drop one here" : "or drag and drop an audio file here (e.g. WhatsApp voice notes)"}
      </p>
    </div>
  );
};

export default FileInput;