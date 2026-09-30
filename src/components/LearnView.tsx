import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Upload,
  FileText,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  HelpCircle,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';
import { StudyPack, Subject } from '../types';

interface LearnViewProps {
  currentStudyPack: StudyPack;
  onGenerateStudyPack: (materialText: string, subject: Subject, topic: string) => Promise<void>;
  onExplainSimply: (concept: string, context: string) => void;
  loading: boolean;
}

export const LearnView: React.FC<LearnViewProps> = ({
  currentStudyPack,
  onGenerateStudyPack,
  onExplainSimply,
  loading,
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Physics');
  const [selectedTopic, setSelectedTopic] = useState('Adiabatic Thermodynamics & First Law');
  const [selectedTab, setSelectedTab] = useState<'concepts' | 'formulas' | 'definitions' | 'examples' | 'mcqs' | 'problems'>('concepts');

  // Interactive MCQ state: questionId -> selectedOptionIndex
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  // Collapsed state for practice problem solutions
  const [expandedSolutions, setExpandedSolutions] = useState<Record<number, boolean>>({});

  const samplePresets = [
    {
      subject: 'Physics' as Subject,
      topic: 'Adiabatic Expansion & Thermodynamics',
      snippet:
        'In an adiabatic expansion (Q = 0), a gas expands from volume V1 to V2 against an external pressure. Since no heat enters, work is done entirely at the expense of internal energy (ΔU = -W), causing the gas temperature to drop according to T·V^(γ-1) = const.',
    },
    {
      subject: 'Chemistry' as Subject,
      topic: 'Benzene Aromaticity & Electrophilic Substitution',
      snippet:
        'Benzene possesses a planar cyclic ring with 6 delocalized pi electrons (4n+2 Hückel rule). Because breaking aromaticity incurs a heavy thermodynamic resonance energy penalty (~150 kJ/mol), benzene preferentially undergoes electrophilic aromatic substitution rather than addition.',
    },
    {
      subject: 'Mathematics' as Subject,
      topic: 'Integration by Parts & Reduction Formulas',
      snippet:
        'Integration by parts is derived from the product rule of differentiation: ∫ u dv = uv - ∫ v du. Selection of u and dv follows the LIATE priority rule (Logarithmic, Inverse Trig, Algebraic, Trigonometric, Exponential).',
    },
  ];

  const handleLoadPreset = (preset: typeof samplePresets[0]) => {
    setSelectedSubject(preset.subject);
    setSelectedTopic(preset.topic);
    setInputText(preset.snippet);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    await onGenerateStudyPack(inputText, selectedSubject, selectedTopic);
    setUserAnswers({});
    setExpandedSolutions({});
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInputText(content);
      };
      reader.readAsText(file);
    }
  };

  const toggleSolution = (id: number) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner & Mode Introduction */}
      <div className="rounded-2xl border border-slate-800 bg-[#0a1122] p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1">
              <BookOpen className="h-4 w-4" />
              <span>Learn Mode · On-Device Neural Synthesis</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
              Transform Notes into a Comprehensive Study Pack
            </h1>
            <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-relaxed">
              Upload raw textbook excerpts, lecture slides, or select a curated STEM chapter. SnapStudy extracts core formulas, definitions, real-world examples, 5 diagnostic MCQs, and 3 practice problems.
            </p>
          </div>

          <button
            onClick={() => onExplainSimply(currentStudyPack.title, currentStudyPack.summary)}
            className="flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/40 px-4 py-2.5 text-xs font-bold text-amber-200 hover:bg-amber-500/30 transition-all shrink-0 shadow-lg shadow-amber-950/30"
          >
            <Lightbulb className="h-4 w-4 text-amber-400" />
            <span>Explain Simply Mode</span>
          </button>
        </div>

        {/* Input Form & Presets */}
        <form onSubmit={handleGenerate} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as Subject)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Chapter / Topic Focus
              </label>
              <input
                type="text"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                placeholder="e.g. Adiabatic Thermodynamics"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-medium text-slate-400">Sample Material:</span>
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleLoadPreset(preset)}
                className="rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-300 hover:border-rose-500/40 hover:text-white transition-colors"
              >
                {preset.topic}
              </button>
            ))}
          </div>

          {/* Text Area & File Drop */}
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste lecture notes, textbook paragraphs, or syllabus bullet points here..."
              rows={3}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <label className="flex cursor-pointer items-center gap-1 rounded-md border border-slate-800 bg-slate-900/90 px-2.5 py-1 text-[11px] text-slate-400 hover:text-white transition-colors">
                <Upload className="h-3 w-3" />
                <span>Upload .txt/.md</span>
                <input type="file" accept=".txt,.md" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-950/40 hover:from-rose-500 hover:to-red-500 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Synthesizing Study Pack on Local NPU...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Generate Full Study Pack</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Generated Study Pack Header */}
      <div className="rounded-2xl border border-slate-800 bg-[#090f1d] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300 uppercase tracking-wider">
                {currentStudyPack.subject}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                <Clock className="h-3 w-3" />
                {currentStudyPack.estimatedStudyTime}
              </span>
            </div>
            <h2 className="mt-1 text-xl font-bold text-white tracking-tight">
              {currentStudyPack.title}
            </h2>
          </div>

          <button
            onClick={() => onExplainSimply(currentStudyPack.title, currentStudyPack.summary)}
            className="flex items-center gap-2 self-start sm:self-center rounded-lg border border-amber-500/40 bg-amber-950/20 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-950/40 transition-colors"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Explain Simply</span>
          </button>
        </div>

        {/* Executive Summary */}
        <div className="mt-5 rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Executive Conceptual Summary
          </h3>
          <p className="whitespace-pre-line text-xs text-slate-200 leading-relaxed font-sans">
            {currentStudyPack.summary}
          </p>
        </div>

        {/* Segmented Navigation Bar for Study Pack Sections */}
        <div className="mt-6 flex flex-wrap items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setSelectedTab('concepts')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              selectedTab === 'concepts'
                ? 'bg-rose-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Key Concepts ({currentStudyPack.keyConcepts.length})
          </button>

          <button
            onClick={() => setSelectedTab('formulas')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              selectedTab === 'formulas'
                ? 'bg-rose-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Formulas ({currentStudyPack.importantFormulas.length})
          </button>

          <button
            onClick={() => setSelectedTab('definitions')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              selectedTab === 'definitions'
                ? 'bg-rose-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Definitions ({currentStudyPack.importantDefinitions.length})
          </button>

          <button
            onClick={() => setSelectedTab('examples')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              selectedTab === 'examples'
                ? 'bg-rose-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Real Examples ({currentStudyPack.examples.length})
          </button>

          <button
            onClick={() => setSelectedTab('mcqs')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              selectedTab === 'mcqs'
                ? 'bg-rose-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            5 MCQs
          </button>

          <button
            onClick={() => setSelectedTab('problems')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              selectedTab === 'problems'
                ? 'bg-rose-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3 Practice Problems
          </button>
        </div>

        {/* Tab 1: Key Concepts */}
        {selectedTab === 'concepts' && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3.5 animate-in fade-in duration-150">
            {currentStudyPack.keyConcepts.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-white tracking-wide">{item.name}</h4>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                      item.importance === 'Crucial'
                        ? 'bg-rose-500/20 text-rose-300'
                        : item.importance === 'Core'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.importance}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
                <button
                  onClick={() => onExplainSimply(item.name, item.description)}
                  className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <Lightbulb className="h-3 w-3" />
                  <span>Explain with analogy</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Important Formulas */}
        {selectedTab === 'formulas' && (
          <div className="mt-5 space-y-3 animate-in fade-in duration-150">
            {currentStudyPack.importantFormulas.map((form, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <span className="text-xs font-bold text-white">{form.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">Formula #{idx + 1}</span>
                </div>
                <div className="my-3 rounded-lg bg-slate-950 p-3 font-mono text-sm font-semibold text-rose-300 text-center border border-slate-800">
                  {form.latex}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-300">Variables:</span> {form.variableBreakdown}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Definitions */}
        {selectedTab === 'definitions' && (
          <div className="mt-5 space-y-3 animate-in fade-in duration-150">
            {currentStudyPack.importantDefinitions.map((def, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-300 tracking-wide">{def.term}</span>
                  <span className="text-[10px] text-slate-400">Exam Rigor</span>
                </div>
                <p className="mt-2 text-xs font-medium text-white leading-relaxed">
                  {def.definition}
                </p>
                <p className="mt-2 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2">
                  <span className="font-semibold text-slate-300">Context:</span> {def.context}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Practical Examples */}
        {selectedTab === 'examples' && (
          <div className="mt-5 space-y-3 animate-in fade-in duration-150">
            {currentStudyPack.examples.map((ex, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{ex.title}</span>
                </div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-white">Scenario:</span> {ex.scenario}
                </p>
                <div className="mt-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 p-2.5 text-xs text-emerald-200 leading-relaxed">
                  <span className="font-bold">Insight:</span> {ex.insight}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: 5 Diagnostic MCQs */}
        {selectedTab === 'mcqs' && (
          <div className="mt-5 space-y-4 animate-in fade-in duration-150">
            {currentStudyPack.mcqs.map((mcq, mIdx) => {
              const selectedIdx = userAnswers[mcq.id];
              const isAnswered = selectedIdx !== undefined;

              return (
                <div
                  key={mcq.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-slate-400">Question {mIdx + 1} of 5</span>
                    {isAnswered && (
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          selectedIdx === mcq.correctIndex
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {selectedIdx === mcq.correctIndex ? 'Correct' : 'Review Needed'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-semibold text-white leading-relaxed">
                    {mcq.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-1.5">
                    {mcq.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      const isOptionCorrect = optIdx === mcq.correctIndex;

                      let btnStyle = 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300';
                      if (isAnswered) {
                        if (isOptionCorrect) {
                          btnStyle = 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200 font-semibold';
                        } else if (isOptionSelected) {
                          btnStyle = 'border-rose-500/60 bg-rose-950/30 text-rose-200';
                        } else {
                          btnStyle = 'border-slate-800/40 bg-slate-950/40 text-slate-500 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => setUserAnswers((prev) => ({ ...prev, [mcq.id]: optIdx }))}
                          className={`w-full flex items-center justify-between rounded-lg border p-2.5 text-left text-xs transition-all ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-800 text-[11px] font-bold text-slate-400">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isAnswered && isOptionCorrect && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          )}
                          {isAnswered && isOptionSelected && !isOptionCorrect && (
                            <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation reveal */}
                  {isAnswered && (
                    <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-white block mb-1">Analytical Explanation:</span>
                      {mcq.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 6: 3 Practice Problems */}
        {selectedTab === 'problems' && (
          <div className="mt-5 space-y-4 animate-in fade-in duration-150">
            {currentStudyPack.practiceProblems.map((prob, pIdx) => {
              const isExpanded = expandedSolutions[prob.id];

              return (
                <div
                  key={prob.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Problem {pIdx + 1} of 3</span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        prob.difficulty === 'Foundational'
                          ? 'bg-sky-500/20 text-sky-300'
                          : prob.difficulty === 'Intermediate'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-white leading-relaxed">
                    {prob.problem}
                  </p>

                  <div className="pt-2 border-t border-slate-800">
                    <button
                      onClick={() => toggleSolution(prob.id)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Step-by-Step Solution' : 'View Verified Solution'}</span>
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-2 rounded-xl bg-slate-950 p-4 border border-slate-800 text-xs">
                        <span className="font-bold text-slate-200 block">Step-by-Step Solution:</span>
                        <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                          {prob.solutionSteps.map((step, sIdx) => (
                            <li key={sIdx} className="leading-relaxed">
                              {step}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 p-2.5 text-xs text-emerald-200 font-semibold">
                          Final Answer: {prob.finalAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
