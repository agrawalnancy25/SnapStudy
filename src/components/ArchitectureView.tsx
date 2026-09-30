import React from 'react';
import {
  Cpu,
  Shield,
  Zap,
  WifiOff,
  BatteryCharging,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  HardDrive,
  Activity,
  ArrowDown,
  ArrowRight,
  Database,
  Lock,
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const pipelineSteps = [
    {
      step: '01',
      title: 'Student Input',
      subtext: 'Handwritten work, textbook snapshots, questions, or voice queries.',
      icon: Layers,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      step: '02',
      title: 'Local AI Processing',
      subtext: 'Input tokenization, visual feature extraction, and intent classification.',
      icon: HardDrive,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      step: '03',
      title: 'Text / Vision / Speech Models',
      subtext: 'Quantized INT4 multimodal models (Llama 3.2 Vision, Whisper, Phi-3.5).',
      icon: Activity,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      step: '04',
      title: 'Snapdragon NPU + CPU + GPU',
      subtext: 'Heterogeneous compute via Qualcomm AI Engine Direct & 45 TOPS Hexagon NPU.',
      icon: Cpu,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
    {
      step: '05',
      title: 'Personalized Learning Result',
      subtext: 'Step-by-step diagnostic breakdown, misconception analysis & parallel challenges.',
      icon: CheckCircle2,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  const corePillars = [
    {
      title: 'On-Device Processing',
      icon: Cpu,
      description:
        'Inference executes directly on the Qualcomm Hexagon NPU inside the Snapdragon X Series chip. No queuing in remote server serverless clusters; your laptop becomes an autonomous AI learning workstation.',
      highlight: 'Zero subscription cloud bills for continuous study sessions',
    },
    {
      title: 'Privacy & Data Sovereignty',
      icon: Lock,
      description:
        'Your study material, drafts, graded assignments, and learning velocity never leave your device whenever the required AI model can run locally. No corporate model training on student intellectual property.',
      highlight: 'Full FERPA / GDPR alignment by architectural design',
    },
    {
      title: 'Sub-50ms Low Latency',
      icon: Zap,
      description:
        'Local NPU acceleration avoids the 500ms–2000ms roundtrip network latency overhead of cloud APIs. Token generation begins almost instantaneously (up to 45 TOPS dedicated INT4 throughput).',
      highlight: 'Fluid interactive tutoring without lag or buffering',
    },
    {
      title: 'Offline-Capable Workflows',
      icon: WifiOff,
      description:
        'Study on long flights, subway commutes, or in lecture halls with overloaded campus Wi-Fi. SnapStudy remains fully operational without an internet connection.',
      highlight: 'Never lose access to your AI tutor when offline',
    },
    {
      title: 'Reduced Cloud Dependency',
      icon: Database,
      description:
        'Traditional AI edtech startups face massive monthly cloud token inference bills that get passed to students. On-device compute decouples learning from API operational overhead.',
      highlight: 'Sustainable, democratic access for every student',
    },
    {
      title: 'Power-Efficient AI Architecture',
      icon: BatteryCharging,
      description:
        'Snapdragon architecture delivers class-leading performance-per-watt. The Hexagon NPU offloads heavy matrix multiplication from the CPU/GPU, enabling all-day multi-hour study sessions on HP Snapdragon laptops.',
      highlight: 'Up to 26 hours of continuous productivity on a single charge',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="rounded-2xl border border-slate-800 bg-[#0a1122] p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-rose-400">
              <Cpu className="h-4 w-4" />
              <span>Target Architecture Overview</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Why Snapdragon? The On-Device Learning Paradigm
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Traditional AI study tools stream every student homework problem, test note, and thought to remote cloud servers. SnapStudy is designed for Snapdragon-powered Windows PCs—harnessing dedicated 45 TOPS Hexagon NPU acceleration to deliver privacy, ultra-low latency, and true offline independence.
            </p>
          </div>

          <div className="rounded-xl border border-rose-950/60 bg-rose-950/20 p-4 shrink-0 text-xs space-y-1.5 border-l-4 border-l-rose-500">
            <span className="font-bold text-rose-300 uppercase tracking-wider block text-[10px]">
              Hardware Deployment Status:
            </span>
            <span className="font-semibold text-white block">
              Designed for Snapdragon
            </span>
            <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
              Target deployment on Snapdragon X Elite and Snapdragon X Plus HP PCs. In this web evaluation prototype, models are simulated via server-side endpoints.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Section: Student Input -> NPU -> Personalized Result */}
      <section className="rounded-2xl border border-slate-800 bg-[#0a101f] p-6 lg:p-8 shadow-xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">The On-Device Neural Pipeline</h2>
          <p className="text-xs text-slate-400">
            How multimodal student queries flow through heterogeneous on-device silicon
          </p>
        </div>

        {/* Desktop Pipeline Flow */}
        <div className="hidden lg:grid grid-cols-5 gap-3 relative">
          {pipelineSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative group">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 h-full flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-slate-500">{item.step}</span>
                      <div className={`p-2 rounded-lg border ${item.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="text-xs font-bold text-white mb-1.5">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{item.subtext}</p>
                  </div>

                  {idx < pipelineSteps.length - 1 && (
                    <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 hidden xl:flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-slate-400">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Pipeline Flow (Stacked) */}
        <div className="lg:hidden space-y-3">
          {pipelineSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className={`p-2.5 rounded-lg border shrink-0 ${item.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">{item.step}</span>
                    <h3 className="text-xs font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The 6 Core Pillars */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Key Advantages of Snapdragon Architecture</h2>
          <p className="text-xs text-slate-400">
            Why edge silicon transforms the economics and user experience of personal education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {corePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-[#0a101f] p-5 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-md"
              >
                <div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-white mb-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-semibold text-rose-300">
                  ✓ {pillar.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Qualcomm AI Hub & Target Deployment Deep-Dive */}
      <div className="rounded-2xl border border-slate-800 bg-[#090f1d] p-6 lg:p-8 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Model Optimization Pipeline
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Qualcomm AI Hub Integration & Quantized Edge Runtimes
            </h3>
          </div>
          <div className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-mono text-slate-300">
            ONNX Runtime · QNN Execution Provider
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The production version of SnapStudy is intended to compile pre-optimized models directly from the <strong className="text-white">Qualcomm AI Hub</strong>. By utilizing INT4 weight quantization and DirectML/QNN Execution Providers, models achieve high-throughput inferences with minimal thermals and power draw on Snapdragon X Elite and Snapdragon X Plus HP PCs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800">
            <span className="font-bold text-white block">Multimodal Vision</span>
            <span className="text-[11px] text-slate-400">Llama 3.2 Vision (11B / 3B INT4) for homework & diagram parsing</span>
          </div>
          <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800">
            <span className="font-bold text-white block">STEM Reasoning</span>
            <span className="text-[11px] text-slate-400">Phi-3.5-mini / Llama 3.2 3B for step-by-step diagnostic feedback</span>
          </div>
          <div className="rounded-lg bg-slate-950 p-3.5 border border-slate-800">
            <span className="font-bold text-white block">Local Speech Audio</span>
            <span className="text-[11px] text-slate-400">Whisper-tiny on Hexagon NPU for hands-free study queries</span>
          </div>
        </div>
      </div>
    </div>
  );
};
