import React, { useState } from 'react';
import {
  CheckCircle,
  HelpCircle,
  RefreshCw,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import { PracticeQuestion, Subject, Difficulty } from '../types';

interface PracticeViewProps {
  onGenerateQuestions: (subject: Subject, topic: string, difficulty: Difficulty) => Promise<void>;
  questions: PracticeQuestion[];
  loading: boolean;
  onNavigateToLearn: () => void;
  initialTopic?: string;
  initialSubject?: Subject;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  onGenerateQuestions,
  questions,
  loading,
  onNavigateToLearn,
  initialTopic = 'Thermodynamics & Adiabatic Expansions',
  initialSubject = 'Physics',
}) => {
  const [subject, setSubject] = useState<Subject>(initialSubject);
  const [topic, setTopic] = useState(initialTopic);
  const [difficulty, setDifficulty] = useState<Difficulty>('Intermediate');

  // Answers state: questionId -> selectedOptionIndex
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const handleStartPractice = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserAnswers({});
    await onGenerateQuestions(subject, topic, difficulty);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
  };

  // Compute live accuracy
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = questions.reduce((acc, q) => {
    if (userAnswers[q.id] === q.correctIndex) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const currentAccuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const topicPresets: Record<Subject, string[]> = {
    Physics: [
      'Thermodynamics & Adiabatic Expansions',
      'Rotational Dynamics & Angular Momentum',
      'Electromagnetic Induction & Lenz’s Law',
    ],
    Chemistry: [
      'Aromaticity & Electrophilic Substitution',
      'Thermodynamics & Gibbs Free Energy',
      'Coordination Chemistry & Crystal Field Theory',
    ],
    Mathematics: [
      'Integration by Parts & Reduction Formulas',
      'Multivariable Calculus & Green’s Theorem',
      'Eigenvalues & Matrix Diagonalization',
    ],
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Configuration Header */}
      <div className="rounded-2xl border border-slate-800 bg-[#0a1122] p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 mb-1">
              <CheckCircle className="h-4 w-4" />
              <span>Practice Mode · Diagnostic Question Generator</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
              Targeted Practice with Instant Concept Diagnostic
            </h1>
            <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-relaxed">
              Select your subject, topic, and difficulty. Every answer immediately diagnoses the underlying physical or mathematical concept tested and surfaces targeted revision paths.
            </p>
          </div>

          {/* Live Accuracy Meter */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-3.5 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Session Accuracy</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-2xl font-extrabold text-emerald-400 tabular-nums">
                  {answeredCount > 0 ? `${currentAccuracy}%` : '—'}
                </span>
                <span className="text-xs text-slate-400 tabular-nums">
                  ({correctCount}/{answeredCount} correct)
                </span>
              </div>
            </div>
            {answeredCount > 0 && (
              <button
                onClick={handleResetQuiz}
                title="Reset answers"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Practice Form Selector */}
        <form onSubmit={handleStartPractice} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Subject */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => {
                  const s = e.target.value as Subject;
                  setSubject(s);
                  setTopic(topicPresets[s][0]);
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>

            {/* Topic Input with suggestions */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Adiabatic Thermodynamics"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
              >
                <option value="Foundational">Foundational (High School / Core)</option>
                <option value="Intermediate">Intermediate (Undergraduate / AP)</option>
                <option value="Advanced">Advanced (Olympiad / Honors)</option>
              </select>
            </div>
          </div>

          {/* Quick topic pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-400 font-medium">Quick Topics:</span>
            {topicPresets[subject].map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTopic(t)}
                className={`rounded-md px-2.5 py-0.5 text-[11px] transition-colors ${
                  topic === t
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-950/40 hover:from-rose-500 hover:to-red-500 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Synthesizing Questions on Local NPU...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Generate Practice Quiz</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Practice Questions List */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {subject} · {topic}
            </span>
            <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
              {difficulty}
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {answeredCount} of {totalQuestions} answered
          </span>
        </div>

        {questions.map((q, qIndex) => {
          const selectedIdx = userAnswers[q.id];
          const isAnswered = selectedIdx !== undefined;
          const isCorrect = selectedIdx === q.correctIndex;

          return (
            <div
              key={q.id}
              className="rounded-2xl border border-slate-800 bg-[#0a101e] p-6 shadow-xl space-y-4"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-400 font-mono">
                  QUESTION {qIndex + 1} OF {totalQuestions}
                </span>

                {isAnswered && (
                  <span
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${
                      isCorrect
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Correct Answer</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Incorrect · Misconception Identified</span>
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Question Text */}
              <p className="text-sm font-semibold text-white leading-relaxed">
                {q.question}
              </p>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isOptionSelected = selectedIdx === optIdx;
                  const isOptionCorrect = optIdx === q.correctIndex;

                  let style =
                    'border-slate-800 bg-slate-950/80 hover:border-slate-700 text-slate-300 hover:bg-slate-900';

                  if (isAnswered) {
                    if (isOptionCorrect) {
                      style =
                        'border-emerald-500/80 bg-emerald-950/40 text-emerald-100 font-semibold shadow-sm shadow-emerald-950/40';
                    } else if (isOptionSelected) {
                      style =
                        'border-rose-500/80 bg-rose-950/40 text-rose-100 font-semibold shadow-sm shadow-rose-950/40';
                    } else {
                      style = 'border-slate-800/40 bg-slate-950/30 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => setUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                      className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left text-xs transition-all ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-300">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
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

              {/* Instant Detailed Diagnostic Feedback upon answering */}
              {isAnswered && (
                <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 animate-in fade-in duration-150">
                  {/* Concept Tested */}
                  <div className="flex items-start gap-2.5 rounded-lg bg-slate-900/60 p-3 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-rose-400 shrink-0 mt-0.5">
                      Concept Tested:
                    </span>
                    <span className="text-xs font-semibold text-slate-200">{q.conceptTested}</span>
                  </div>

                  {/* Explanation */}
                  <div className="rounded-lg bg-slate-900/40 p-3.5 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-white block mb-1">Diagnostic Breakdown:</span>
                    {q.explanation}
                  </div>

                  {/* Suggested Revision link */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg bg-rose-950/20 border border-rose-900/30 p-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-rose-400 block">
                        Suggested Revision:
                      </span>
                      <span className="text-xs text-slate-300 font-medium">{q.suggestedRevision}</span>
                    </div>
                    <button
                      onClick={onNavigateToLearn}
                      className="flex items-center gap-1.5 self-start sm:self-center font-bold text-rose-400 hover:text-rose-300 hover:underline shrink-0"
                    >
                      <span>Open Study Pack</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
