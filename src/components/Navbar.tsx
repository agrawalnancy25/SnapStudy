import React from 'react';
import { Cpu, ShieldCheck, Sparkles, BookOpen, CheckCircle, Camera, Layers, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'learn' | 'practice' | 'snapsolve' | 'architecture';
  setActiveTab: (tab: 'dashboard' | 'learn' | 'practice' | 'snapsolve' | 'architecture') => void;
  onOpenPrivacy: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenPrivacy }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b14]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-600 to-red-700 shadow-md shadow-rose-950/40 ring-1 ring-rose-400/30">
              <Zap className="h-5 w-5 text-white transition-transform group-hover:scale-105" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white font-sans">SnapStudy</span>
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
              </div>
              <p className="text-[11px] font-medium text-slate-400 -mt-0.5">Private AI Assistant</p>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('learn')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'learn'
                ? 'bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Learn Mode</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'practice'
                ? 'bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span>Practice</span>
          </button>

          <button
            onClick={() => setActiveTab('snapsolve')}
            className={`relative flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'snapsolve'
                ? 'bg-rose-500/20 text-rose-200 ring-1 ring-rose-400/50 shadow-sm shadow-rose-950/50 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Camera className="h-3.5 w-3.5 text-rose-400" />
            <span>SnapSolve</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
              activeTab === 'architecture'
                ? 'bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>Why Snapdragon?</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Privacy & Hardware indicator) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenPrivacy}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
            title="Privacy status: On-device inference"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">On-Device Privacy</span>
            <span className="sm:hidden">Privacy</span>
          </button>

          <div
            className="hidden lg:flex items-center gap-2 rounded-lg border border-rose-950/80 bg-rose-950/20 px-3 py-1.5 text-xs text-rose-200"
            title="Target Architecture: Snapdragon X Elite Hexagon NPU"
          >
            <Cpu className="h-3.5 w-3.5 text-rose-400" />
            <span className="font-mono text-[11px] text-rose-300">Snapdragon NPU</span>
            <span className="text-[10px] text-slate-400">· 45 TOPS</span>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-800/60 px-4 py-2 gap-1 scrollbar-none bg-[#0a0f1d]">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`shrink-0 rounded-md px-3 py-1 text-xs font-medium ${
            activeTab === 'dashboard' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('learn')}
          className={`shrink-0 rounded-md px-3 py-1 text-xs font-medium ${
            activeTab === 'learn' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'
          }`}
        >
          Learn
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`shrink-0 rounded-md px-3 py-1 text-xs font-medium ${
            activeTab === 'practice' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'
          }`}
        >
          Practice
        </button>
        <button
          onClick={() => setActiveTab('snapsolve')}
          className={`shrink-0 rounded-md px-3 py-1 text-xs font-medium ${
            activeTab === 'snapsolve' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'
          }`}
        >
          SnapSolve
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`shrink-0 rounded-md px-3 py-1 text-xs font-medium ${
            activeTab === 'architecture' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'
          }`}
        >
          Why Snapdragon?
        </button>
      </div>
    </header>
  );
};
