import React, { useState } from 'react';
import { X, RefreshCw, Eye, CheckCircle2, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';
import { SimilarQuestion } from '../types';

interface SimilarQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  similarQuestion: SimilarQuestion | null;
  loading: boolean;
  onRegenerate: () => void;
}

export const SimilarQuestionModal: React.FC<SimilarQuestionModalProps> = ({
  isOpen,
  onClose,
  similarQuestion,
  loading,
  onRegenerate,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-[#0c1426] p-6 text-slate-200 shadow-2xl shadow-black/80">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Parallel Concept Challenge</h3>
              <p className="text-xs text-slate-400">Test your conceptual retention with a targeted variation</p>
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
            <p className="mt-3 text-xs text-slate-400">Synthesizing parallel problem variant...</p>
          </div>
        ) : similarQuestion ? (
          <div className="mt-5 space-y-4">
            {/* Question Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-semibold text-rose-400">{similarQuestion.questionTitle}</span>
                <span>Concept: {similarQuestion.conceptTested}</span>
              </div>
              <p className="mt-3 text-sm font-medium text-white leading-relaxed">
                {similarQuestion.question}
              </p>
            </div>

            {/* Hint Toggle */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-3">
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex w-full items-center justify-between text-xs font-semibold text-amber-300 hover:text-amber-200"
              >
                <span>{showHint ? 'Hide Guidance Hint' : 'Need a Hint?'}</span>
                {showHint ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {showHint && (
                <p className="mt-2 text-xs text-amber-200/90 leading-relaxed border-t border-amber-500/20 pt-2">
                  {similarQuestion.hint}
                </p>
              )}
            </div>

            {/* Solution Toggle */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex w-full items-center justify-between text-xs font-semibold text-slate-200 hover:text-white"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>{showSolution ? 'Hide Verified Solution' : 'Check Step-by-Step Solution'}</span>
                </div>
                {showSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {showSolution && (
                <div className="mt-3 whitespace-pre-line text-xs font-mono text-emerald-200 bg-emerald-950/20 rounded-lg p-3 border border-emerald-500/30">
                  {similarQuestion.solution}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
          <button
            onClick={onRegenerate}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Generate Another Variation</span>
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-rose-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-rose-500 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
