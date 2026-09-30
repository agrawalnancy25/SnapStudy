import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Layers,
  ArrowRight,
  Cpu,
  Zap,
  Image as ImageIcon,
  Check,
  FileQuestion,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SnapSolveResult } from '../types';
import { PvDiagram } from './PvDiagram';
import { SAMPLE_PHYSICS_QUESTION, SAMPLE_PHYSICS_SOLVE_RESULT } from '../data/mockData';

interface SnapSolveViewProps {
  currentResult: SnapSolveResult;
  onSolveQuestion: (text?: string, imageBase64?: string) => Promise<void>;
  onOpenExplainMistake: () => void;
  onOpenGenerateSimilar: () => void;
  loading: boolean;
}

export const SnapSolveView: React.FC<SnapSolveViewProps> = ({
  currentResult,
  onSolveQuestion,
  onOpenExplainMistake,
  onOpenGenerateSimilar,
  loading,
}) => {
  const [inputText, setInputText] = useState(SAMPLE_PHYSICS_QUESTION);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeStepTab, setActiveStepTab] = useState<number | null>(null);

  // Quick Demo Presets
  const demoPresets = [
    {
      label: 'Physics: Adiabatic Gas Expansion (Required Sample)',
      text: 'A gas expands adiabatically from volume V1 to V2. Explain how the temperature changes.',
      subject: 'Physics',
    },
    {
      label: 'Chemistry: Benzene Resonance vs Addition',
      text: 'Why is benzene exceptionally resistant to addition reactions compared to open-chain alkenes? Detail resonance energy and orbital hybridization.',
      subject: 'Chemistry',
    },
    {
      label: 'Mathematics: Integration by Parts',
      text: 'Evaluate the integral ∫ x · e^(2x) dx using integration by parts and explain the choice of differential forms.',
      subject: 'Mathematics',
    },
  ];

  const handleSelectPreset = (presetText: string) => {
    setInputText(presetText);
    setPreviewImage(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setPreviewImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSolveQuestion(inputText, previewImage || undefined);
  };

  const isThermodynamics =
    currentResult.detectedTopic.toLowerCase().includes('thermodynamic') ||
    currentResult.problemStatement.toLowerCase().includes('adiabatic');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Flagship Header */}
      <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-br from-[#120814] via-[#0e1224] to-[#070b14] p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-rose-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-rose-400">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span>SnapSolve · Multimodal Vision & Reasoning Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Instant Question Breakdown & Deep Diagnostic Feedback
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Upload a snapshot of your problem or select a competition benchmark. SnapStudy leverages on-device multimodal models to analyze the question, isolate required principles, guide you through step-by-step reasoning, and diagnose misconceptions.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 shrink-0 text-xs space-y-1">
            <div className="flex items-center gap-2 font-mono text-[11px] text-rose-300 font-semibold">
              <Cpu className="h-3.5 w-3.5 text-rose-400" />
              <span>Target: Qualcomm Hexagon NPU</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Simulated Latency: <span className="font-mono text-emerald-400 font-semibold">{currentResult.inferenceLatencyMs || 38}ms</span>
            </div>
          </div>
        </div>

        {/* Input & Demo Selector Area */}
        <form onSubmit={handleRunSolve} className="mt-6 space-y-4">
          {/* Quick Demo benchmark chips */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Instant Benchmark Questions (Zero-Upload Demos):
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {demoPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset.text)}
                  className={`rounded-lg px-3 py-1.5 text-xs text-left transition-all ${
                    inputText === preset.text
                      ? 'border border-rose-500 bg-rose-500/20 text-white font-semibold shadow-sm'
                      : 'border border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[10px] text-rose-400 mr-1.5 font-bold">[{preset.subject}]</span>
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Text Box + File Upload Drop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-8 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste any STEM question (e.g. A gas expands adiabatically from volume V1 to V2...)"
                rows={3}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="lg:col-span-4 flex flex-col justify-between rounded-xl border border-dashed border-slate-800 bg-slate-950/60 p-3.5">
              {previewImage ? (
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={previewImage}
                      alt="Uploaded Question"
                      className="h-14 w-14 rounded-lg object-cover border border-slate-700"
                    />
                    <div className="text-[11px] text-slate-300">
                      <span className="font-bold block text-white">Question Image Ready</span>
                      <span className="text-slate-400">Multimodal vision enabled</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewImage(null)}
                    className="text-[11px] text-rose-400 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-full cursor-pointer rounded-lg border border-slate-800/80 bg-slate-900/40 p-2 text-center hover:bg-slate-900 transition-colors">
                  <Camera className="h-5 w-5 text-rose-400 mb-1" />
                  <span className="text-xs font-semibold text-slate-200">Upload / Snap Photo</span>
                  <span className="text-[10px] text-slate-400">PNG, JPG, handwritten note</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Offline-capable pipeline · Processed locally whenever model weights reside in device RAM</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-6 py-2.5 text-xs font-bold text-white shadow-xl shadow-rose-950/50 hover:from-rose-500 hover:to-red-500 disabled:opacity-50 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Analyzing Multimodal Input on Snapdragon...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>SnapSolve Problem</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Flagship Results Container */}
      <div className="space-y-6">
        {/* Detection Metadata Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#0a101f] p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-lg bg-rose-500/20 border border-rose-500/30 px-3 py-1 font-mono text-xs font-bold text-rose-300">
                {currentResult.detectedSubject}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs font-bold text-white tracking-wide">
                {currentResult.detectedTopic}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                Difficulty: <span className="text-rose-400">{currentResult.difficulty}</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentResult.source || 'SnapStudy Local Model'}
              </span>
            </div>
          </div>

          {/* Restated Problem Statement */}
          <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Transcribed Problem Statement:
            </span>
            <p className="text-sm font-semibold text-white leading-relaxed">
              {currentResult.problemStatement}
            </p>
          </div>

          {/* Required Concepts Tags */}
          <div className="mt-4">
            <span className="text-[11px] uppercase font-bold text-slate-400 block mb-2">
              Prerequisite Concepts & Invariants:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentResult.requiredConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-1 text-xs text-slate-300 flex items-center gap-1.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two-Zone Layout: Interactive Stage (Left) & Step-by-Step Analytical Walkthrough (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Simulation / Scientific Diagram (Left 5 Cols if Physics, otherwise helpful concept diagram) */}
          <div className="lg:col-span-5 space-y-4">
            {isThermodynamics ? (
              <PvDiagram />
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-[#0a101f] p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  <h4 className="text-xs font-bold text-white tracking-wide">
                    First-Principles Analytical Stage
                  </h4>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-300 space-y-2">
                  <p className="leading-relaxed">
                    This problem is classified under <strong className="text-white">{currentResult.detectedTopic}</strong>.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    In order to prevent common computational pitfalls, SnapStudy enforces dimensional invariance verification before algebraic manipulation.
                  </p>
                </div>
              </div>
            )}

            {/* Final Highlighted Takeaway Answer */}
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-5 shadow-lg shadow-emerald-950/20">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Final Analytical Conclusion</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-100 leading-relaxed">
                {currentResult.finalAnswer}
              </p>
            </div>

            {/* The Two Flagship Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={onOpenExplainMistake}
                className="group flex w-full items-center justify-between rounded-xl border border-rose-500/50 bg-rose-950/30 p-4 text-left hover:border-rose-400 hover:bg-rose-950/50 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                    <AlertTriangle className="h-4 w-4 text-rose-400" />
                    <span>Explain My Mistake (Diagnostic Focus)</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    Why does my intuition fail? Deconstruct why students assume T stays constant when Q=0.
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-rose-400 transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </button>

              <button
                onClick={onOpenGenerateSimilar}
                className="group flex w-full items-center justify-between rounded-xl border border-purple-500/40 bg-purple-950/20 p-4 text-left hover:border-purple-400 hover:bg-purple-950/40 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span>Generate Similar Question</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    Test retention on a parallel variation (compression ratio, monoatomic gas, or work calculation).
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-purple-400 transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </button>
            </div>
          </div>

          {/* Step-by-Step Analytical Walkthrough (Right 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-[#0a101f] p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Step-by-Step Derivation & Physical Logic
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {currentResult.stepByStepSolution.length} Rigorous Steps
                </span>
              </div>

              <div className="space-y-3.5">
                {currentResult.stepByStepSolution.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-500/10 text-xs font-bold text-rose-400 border border-rose-500/20 font-mono">
                          {step.stepNumber}
                        </span>
                        <h4 className="text-xs font-bold text-white tracking-wide">{step.title}</h4>
                      </div>
                    </div>

                    {step.mathExpression && (
                      <div className="my-2 rounded-lg bg-slate-950 p-2.5 font-mono text-xs font-semibold text-rose-300 border border-slate-800/80 text-center">
                        {step.mathExpression}
                      </div>
                    )}

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Misconceptions Overview Card */}
            {currentResult.commonMistakes && currentResult.commonMistakes.length > 0 && (
              <div className="rounded-2xl border border-slate-800 bg-[#090f1d] p-6 shadow-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Cognitive Traps & Exam Pitfalls to Avoid</span>
                </div>

                <div className="space-y-3 pt-1">
                  {currentResult.commonMistakes.map((mistake, mIdx) => (
                    <div
                      key={mIdx}
                      className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1.5 text-xs"
                    >
                      <div className="font-bold text-rose-300">
                        Trap #{mIdx + 1}: “{mistake.misconception}”
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">Why it fails:</strong> {mistake.whyItFails}
                      </p>
                      <p className="text-emerald-300 leading-relaxed pt-1 border-t border-slate-800/60 font-medium">
                        <strong className="text-emerald-400">Correct mental model:</strong> {mistake.correctAlternative}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
