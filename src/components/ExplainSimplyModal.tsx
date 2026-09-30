import React from 'react';
import { X, Sparkles, Lightbulb, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { SimpleExplanation } from '../types';

interface ExplainSimplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  explanation: SimpleExplanation | null;
  loading: boolean;
  conceptName: string;
}

export const ExplainSimplyModal: React.FC<ExplainSimplyModalProps> = ({
  isOpen,
  onClose,
  explanation,
  loading,
  conceptName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-[#0d1527] p-6 text-slate-200 shadow-2xl shadow-black/80">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Explain Simply Mode</h3>
              <p className="text-xs text-slate-400">Beginner-friendly mental model · {conceptName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
            <p className="mt-3 text-xs text-slate-400">Generating everyday analogy & intuition...</p>
          </div>
        ) : explanation ? (
          <div className="mt-5 space-y-4">
            {/* Analogy Story Card */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Sparkles className="h-4 w-4" />
                <span>{explanation.analogyTitle}</span>
              </div>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {explanation.analogyStory}
              </p>
            </div>

            {/* Three Core Intuitions */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5">
                The 3 Core Intuitions
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {explanation.threeIntuitions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-[11px] font-semibold text-rose-400">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Takeaway */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-emerald-300">Remember This in 5 Seconds:</span>
                <p className="mt-0.5 text-xs text-slate-300">{explanation.beginnerTakeaway}</p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
