import React, { useState } from 'react';
import { X, AlertCircle, Compass, HelpCircle, ShieldAlert, Sparkles, Check, ArrowRight } from 'lucide-react';
import { MistakeDiagnostic } from '../types';

interface ExplainMistakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagnostic: MistakeDiagnostic | null;
  loading: boolean;
  onDiagnoseCustom: (customAttempt: string) => void;
}

export const ExplainMistakeModal: React.FC<ExplainMistakeModalProps> = ({
  isOpen,
  onClose,
  diagnostic,
  loading,
  onDiagnoseCustom,
}) => {
  const [customInput, setCustomInput] = useState('');
  const [isTypingCustom, setIsTypingCustom] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      onDiagnoseCustom(customInput.trim());
      setIsTypingCustom(false);
    }
  };

  const sampleStudentAttempts = [
    'I assumed that because Q = 0 (no heat entered), the temperature must stay constant.',
    'I applied Boyle’s Law P1·V1 = P2·V2 directly to find the final state.',
    'I thought expanding gas always gets hotter because molecules have more room to bounce around.',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-[#0c1426] p-6 text-slate-200 shadow-2xl shadow-black/80">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Diagnostic Feedback</h3>
              <p className="text-xs text-slate-400">Deconstructing your line of thought · Why reasoning breaks down</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Optional Custom Attempt Input */}
        <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-300">Test Your Own Written Attempt:</span>
            <button
              onClick={() => setIsTypingCustom(!isTypingCustom)}
              className="text-[11px] text-rose-400 hover:underline"
            >
              {isTypingCustom ? 'Hide Input' : 'Type My Own Reasoning'}
            </button>
          </div>

          {isTypingCustom ? (
            <form onSubmit={handleSubmit} className="space-y-2">
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g., I thought the temperature would rise because PV = nRT and pressure dropped less than volume increased..."
                rows={2}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  disabled={!customInput.trim() || loading}
                  className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500 disabled:opacity-50"
                >
                  Analyze My Attempt
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {sampleStudentAttempts.map((attempt, i) => (
                <button
                  key={i}
                  onClick={() => onDiagnoseCustom(attempt)}
                  className="rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 text-left text-[11px] text-slate-300 hover:border-rose-500/50 hover:bg-rose-950/20 transition-all"
                >
                  “{attempt.slice(0, 55)}...”
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Diagnostic Results */}
        {loading ? (
          <div className="py-12 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
            <p className="mt-3 text-xs text-slate-400">Diagnosing cognitive misconception on Snapdragon NPU...</p>
          </div>
        ) : diagnostic ? (
          <div className="mt-5 space-y-4">
            {/* Diagnostic Summary */}
            <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                    The Root Misconception
                  </h4>
                  <p className="mt-1 text-sm font-semibold text-white leading-relaxed">
                    {diagnostic.diagnosticSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Why this feels intuitive */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
                Why This Feels So Intuitive
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {diagnostic.whyThisFeelsIntuitive}
              </p>
            </div>

            {/* The Core Fallacy & Broken Physical Law */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-rose-400" />
                The Broken Physical Principle
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {diagnostic.theCoreFallacy}
              </p>
            </div>

            {/* Thought experiment */}
            <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-4">
              <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                Mental Check: The 10-Second Thought Experiment
              </h4>
              <p className="mt-2 text-xs text-sky-200/90 leading-relaxed">
                {diagnostic.interactiveTestYourself}
              </p>
            </div>

            {/* Golden Rule */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  The Golden Rule for Exams
                </span>
                <p className="mt-1 text-xs text-emerald-100 font-medium leading-relaxed">
                  {diagnostic.goldenRule}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition-colors"
          >
            I Understand the Fallacy
          </button>
        </div>
      </div>
    </div>
  );
};
