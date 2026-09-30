import React from 'react';
import {
  BookOpen,
  CheckCircle,
  Camera,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Clock,
  Award,
  Sparkles,
  Zap,
  Cpu,
  ChevronRight,
  Activity,
  Layers,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { SubjectProgress, WeakConcept } from '../types';

interface DashboardViewProps {
  onNavigate: (tab: 'dashboard' | 'learn' | 'practice' | 'snapsolve' | 'architecture') => void;
  onSelectWeakConcept: (concept: WeakConcept) => void;
  subjectProgress: SubjectProgress[];
  weakConcepts: WeakConcept[];
  continueLearning: Array<{
    id: string;
    subject: 'Physics' | 'Chemistry' | 'Mathematics';
    title: string;
    progress: number;
    estTime: string;
    summary: string;
  }>;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onSelectWeakConcept,
  subjectProgress,
  weakConcepts,
  continueLearning,
}) => {
  const totalCompleted = subjectProgress.reduce((acc, s) => acc + s.topicsCompleted, 0);
  const totalTopics = subjectProgress.reduce((acc, s) => acc + s.totalTopics, 0);
  const overallMastery = Math.round(
    subjectProgress.reduce((acc, s) => acc + s.masteryPercentage, 0) / subjectProgress.length
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome & Snapdragon Status Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-[#0c1324] via-[#0f172a] to-[#121c35] p-6 lg:p-8 shadow-xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-rose-400">
              <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Target Deployment: Snapdragon X Series · 45 TOPS On-Device NPU</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Welcome back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-rose-200">SnapStudy</span>
            </h1>
            <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
              Private AI that learns how you learn. Local multimodal inference designed to transform study materials into durable conceptual mastery on Snapdragon PCs.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white tabular-nums">{totalCompleted}/{totalTopics}</span>
                <span>Topics Mastered</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-emerald-400 tabular-nums">{overallMastery}%</span>
                <span>Average Diagnostic Mastery</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-rose-300">Zero Cloud Data Leakage</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate('snapsolve')}
              className="group flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-rose-950/50 hover:from-rose-500 hover:to-red-500 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span>SnapSolve Question</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => onNavigate('learn')}
              className="group flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:text-white transition-all"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-sky-400" />
                <span>Generate Study Pack</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => onNavigate('practice')}
              className="group flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:border-slate-600 hover:text-white transition-all"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>Take Diagnostic Quiz</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Subject Progress Cards (Physics, Chemistry, Mathematics) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Core Curriculum Progress</h2>
            <p className="text-xs text-slate-400">Diagnostic mastery tracking across active STEM domains</p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            Updated just now
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subjectProgress.map((item) => {
            const isPhysics = item.subject === 'Physics';
            const isChemistry = item.subject === 'Chemistry';
            const colorClass = isPhysics
              ? 'from-rose-500 to-amber-500'
              : isChemistry
              ? 'from-sky-500 to-emerald-500'
              : 'from-purple-500 to-indigo-500';

            return (
              <div
                key={item.subject}
                className="group relative rounded-xl border border-slate-800 bg-[#0a101e] p-5 hover:border-slate-700 transition-all shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-400">{item.subject}</span>
                    <h3 className="mt-0.5 text-xl font-extrabold text-white tracking-tight">
                      {item.masteryPercentage}% <span className="text-xs font-normal text-slate-400">Mastery</span>
                    </h3>
                  </div>
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      isPhysics
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : isChemistry
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }`}
                  >
                    <Layers className="h-4 w-4" />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                    <span>{item.topicsCompleted} of {item.totalTopics} modules verified</span>
                    <span className="font-mono text-slate-300">{item.hoursSpent}h logged</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-500`}
                      style={{ width: `${item.masteryPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="truncate max-w-[190px]">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Recent Focus</span>
                    <span className="text-slate-200 truncate font-medium text-[11px]">{item.recentTopic}</span>
                  </div>
                  <button
                    onClick={() => onNavigate('practice')}
                    className="flex items-center gap-1 font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <span>Practice</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two Column Grid: Continue Learning & Weak Concepts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Continue Learning Section (7 Cols) */}
        <section className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Continue Learning</h2>
              <p className="text-xs text-slate-400">Pick up where your last session left off</p>
            </div>
            <button
              onClick={() => onNavigate('learn')}
              className="text-xs font-semibold text-rose-400 hover:underline"
            >
              Browse All Packs
            </button>
          </div>

          <div className="space-y-3">
            {continueLearning.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-[#0a101f] p-4 hover:border-slate-700 hover:bg-[#0d1529] transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-rose-400">{item.subject}</span>
                    <span className="text-slate-600">·</span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="h-3 w-3" />
                      {item.estTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-rose-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <div className="w-16 text-right">
                    <span className="font-mono text-xs font-bold text-slate-300">{item.progress}%</span>
                    <div className="mt-1 h-1.5 w-16 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-rose-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('learn')}
                    className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-600 transition-colors"
                  >
                    Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weak Concepts Section (5 Cols) */}
        <section className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-400" />
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">Weak Concepts</h2>
                <p className="text-xs text-slate-400">Targeted diagnostic traps needing reinforcement</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {weakConcepts.map((concept) => (
              <div
                key={concept.id}
                className="rounded-xl border border-amber-950/40 bg-amber-950/10 p-4 hover:border-amber-800/60 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {concept.subject}
                  </span>
                  <span className="rounded bg-rose-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-300">
                    {concept.accuracyRate}% Accuracy
                  </span>
                </div>

                <h3 className="mt-1.5 text-xs font-bold text-white leading-snug">
                  {concept.conceptName}
                </h3>

                <p className="mt-1.5 text-[11px] text-slate-400 leading-relaxed italic">
                  “{concept.primaryMisconception}”
                </p>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-amber-900/30">
                  <span className="text-[10px] text-slate-400">Tested {concept.lastTestedDate}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectWeakConcept(concept)}
                      className="rounded-md bg-rose-600/90 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-rose-500 transition-colors"
                    >
                      Diagnose & Practice
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Snapdragon Optimization Card */}
      <div className="rounded-xl border border-slate-800/80 bg-[#080d19] p-4 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-slate-200 block">Designed for Snapdragon-Powered HP PCs</span>
            <span>Intended for Qualcomm AI Hub models with local INT4 quantization and zero cloud cost.</span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('architecture')}
          className="shrink-0 flex items-center gap-1.5 font-semibold text-rose-400 hover:text-rose-300 text-xs"
        >
          <span>Explore Architecture</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
