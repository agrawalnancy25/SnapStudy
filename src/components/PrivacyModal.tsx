import React from 'react';
import { X, ShieldCheck, Cpu, HardDrive, Lock, Globe, Server, Check } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-[#0d1527] p-6 text-slate-200 shadow-2xl shadow-black/80">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Privacy Architecture</h3>
              <p className="text-xs text-slate-400">Local-first inference engineered for Snapdragon PCs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Core Privacy Stance Quote */}
        <div className="my-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-emerald-500/20 p-1 text-emerald-400">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-200">
                “Your study material stays on your device whenever the required AI model can run locally.”
              </p>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                SnapStudy prioritizes running vision, transcription, and reasoning models directly on the Qualcomm Hexagon NPU of your Snapdragon PC.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Architecture Breakdown */}
        <div className="space-y-3.5 text-xs">
          <div className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-900/60 p-3">
            <Cpu className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-slate-200">On-Device Hexagon NPU Processing:</span>
              <p className="mt-0.5 text-slate-400 leading-relaxed">
                Study notes, handwritten homework snapshots, and practice questions are ingested into quantized weights (e.g. Llama 3.2 3B, Phi-3.5) running locally via the Qualcomm AI Engine Direct runtime.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-900/60 p-3">
            <HardDrive className="h-4 w-4 text-sky-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-slate-200">Local Vector & Progress Storage:</span>
              <p className="mt-0.5 text-slate-400 leading-relaxed">
                Your flashcards, diagnostic history, and weak concepts index remain in your device’s local encrypted storage sandbox. No remote profiling or behavioral ad targeting.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-800/80 bg-slate-900/60 p-3">
            <Server className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-slate-200">Transparent Hybrid Fallback:</span>
              <p className="mt-0.5 text-slate-400 leading-relaxed">
                Whenever complex multimodal problems exceed on-device memory limits, SnapStudy transparently informs you before querying an encrypted cloud frontier model (such as Gemini 3.8 Flash).
              </p>
            </div>
          </div>
        </div>

        {/* Deployment notice */}
        <div className="mt-5 rounded-lg bg-slate-950/80 border border-slate-800 p-3 text-[11px] text-slate-400">
          <span className="font-semibold text-rose-300">Target Deployment:</span> Designed specifically for Snapdragon X Elite and Snapdragon X Plus Windows PCs (such as HP OmniBook and EliteBook series).
        </div>

        {/* Actions */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition-colors shadow-sm"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
