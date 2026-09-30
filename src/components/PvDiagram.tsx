import React, { useState } from 'react';
import { Eye, Flame, Snowflake, Info } from 'lucide-react';

interface PvDiagramProps {
  initialV1?: number;
  initialV2?: number;
  showComparison?: boolean;
}

export const PvDiagram: React.FC<PvDiagramProps> = ({
  initialV1 = 1.0,
  initialV2 = 2.2,
  showComparison = true,
}) => {
  const [v2Slider, setV2Slider] = useState<number>(initialV2);
  const [compareIsothermal, setCompareIsothermal] = useState<boolean>(true);

  // Ideal gas parameters
  // Initial state at (V1=1.0, P1=8.0), T1 proportional to P1*V1 = 8.0
  const V1 = 1.0;
  const P1 = 8.0;
  const gamma = 1.4; // Diatomic gas (e.g. Air, N2, O2)

  // Calculations for current V2
  // Adiabatic: P2_adi = P1 * (V1 / V2)^gamma
  const P2_adi = P1 * Math.pow(V1 / v2Slider, gamma);
  // T2_adi / T1 = (V1 / V2)^(gamma - 1)
  const tempRatio_adi = Math.pow(V1 / v2Slider, gamma - 1);

  // Isothermal comparison: P2_iso = P1 * (V1 / V2)
  const P2_iso = P1 * (V1 / v2Slider);

  // SVG dimensions
  const width = 480;
  const height = 280;
  const padL = 50;
  const padR = 25;
  const padT = 30;
  const padB = 40;

  const vMin = 0.5;
  const vMax = 3.2;
  const pMin = 0.0;
  const pMax = 9.5;

  const mapX = (v: number) => padL + ((v - vMin) / (vMax - vMin)) * (width - padL - padR);
  const mapY = (p: number) => height - padB - ((p - pMin) / (pMax - pMin)) * (height - padT - padB);

  // Generate curve paths
  const samples = 40;
  const adiabaticPoints: [number, number][] = [];
  const isothermalPoints: [number, number][] = [];

  for (let i = 0; i <= samples; i++) {
    const v = V1 + (i / samples) * (v2Slider - V1);
    const pAdi = P1 * Math.pow(V1 / v, gamma);
    const pIso = P1 * (V1 / v);
    adiabaticPoints.push([mapX(v), mapY(pAdi)]);
    isothermalPoints.push([mapX(v), mapY(pIso)]);
  }

  const adiabaticPath = adiabaticPoints.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`, '');
  const isothermalPath = isothermalPoints.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`, '');

  // Shaded area under adiabatic curve (Work = ∫ P dV)
  const x1 = mapX(V1);
  const x2 = mapX(v2Slider);
  const yBase = mapY(0);
  const shadedAdiabaticPath = `${adiabaticPath} L ${x2} ${yBase} L ${x1} ${yBase} Z`;

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0a101f] p-4 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          <h4 className="text-xs font-bold text-white tracking-wide">
            Interactive P-V Indicator Diagram: Adiabatic Expansion
          </h4>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-200">
            <input
              type="checkbox"
              checked={compareIsothermal}
              onChange={(e) => setCompareIsothermal(e.target.checked)}
              className="rounded border-slate-700 bg-slate-900 text-rose-500 focus:ring-rose-500"
            />
            <span>Compare Isothermal (ΔT = 0)</span>
          </label>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative mt-2 flex justify-center overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[480px] h-auto select-none">
          {/* Grid lines */}
          <line x1={padL} y1={mapY(2)} x2={width - padR} y2={mapY(2)} stroke="#1e293b" strokeDasharray="3 3" />
          <line x1={padL} y1={mapY(4)} x2={width - padR} y2={mapY(4)} stroke="#1e293b" strokeDasharray="3 3" />
          <line x1={padL} y1={mapY(6)} x2={width - padR} y2={mapY(6)} stroke="#1e293b" strokeDasharray="3 3" />
          <line x1={padL} y1={mapY(8)} x2={width - padR} y2={mapY(8)} stroke="#1e293b" strokeDasharray="3 3" />

          {/* Coordinate Axes */}
          <line x1={padL} y1={height - padB} x2={width - padR} y2={height - padB} stroke="#475569" strokeWidth="1.5" />
          <line x1={padL} y1={height - padB} x2={padL} y2={padT} stroke="#475569" strokeWidth="1.5" />

          {/* Axis Labels */}
          <text x={width - padR + 5} y={height - padB + 4} fill="#94a3b8" fontSize="10" fontWeight="600">
            Volume (V)
          </text>
          <text x={padL - 10} y={padT - 8} fill="#94a3b8" fontSize="10" fontWeight="600" textAnchor="end">
            Pressure (P)
          </text>

          {/* Tick values */}
          <text x={mapX(V1)} y={height - padB + 16} fill="#cbd5e1" fontSize="10" textAnchor="middle" fontWeight="bold">
            V₁
          </text>
          <text x={mapX(v2Slider)} y={height - padB + 16} fill="#f43f5e" fontSize="10" textAnchor="middle" fontWeight="bold">
            V₂
          </text>
          <line x1={mapX(V1)} y1={height - padB} x2={mapX(V1)} y2={height - padB + 5} stroke="#cbd5e1" />
          <line x1={mapX(v2Slider)} y1={height - padB} x2={mapX(v2Slider)} y2={height - padB + 5} stroke="#f43f5e" />

          {/* Shaded Work Area (∫ P dV) */}
          <path d={shadedAdiabaticPath} fill="rgba(244, 63, 94, 0.08)" />

          {/* Isothermal Curve (if checked) */}
          {compareIsothermal && (
            <>
              <path
                d={isothermalPath}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.8"
                strokeDasharray="4 3"
              />
              <circle cx={mapX(v2Slider)} cy={mapY(P2_iso)} r="4" fill="#38bdf8" />
              <text
                x={mapX(v2Slider) + 8}
                y={mapY(P2_iso) - 4}
                fill="#38bdf8"
                fontSize="9"
                fontWeight="500"
              >
                Isothermal (T = T₁)
              </text>
            </>
          )}

          {/* Adiabatic Curve (Steeper) */}
          <path d={adiabaticPath} fill="none" stroke="#f43f5e" strokeWidth="2.5" />

          {/* Point 1 (Initial State) */}
          <circle cx={mapX(V1)} cy={mapY(P1)} r="5" fill="#f43f5e" stroke="#fff" strokeWidth="1.5" />
          <text x={mapX(V1) + 8} y={mapY(P1) - 6} fill="#ffffff" fontSize="10" fontWeight="bold">
            State 1 (P₁, V₁, T₁)
          </text>

          {/* Point 2 (Final Adiabatic State) */}
          <circle cx={mapX(v2Slider)} cy={mapY(P2_adi)} r="5" fill="#e11d48" stroke="#fff" strokeWidth="1.5" />
          <text x={mapX(v2Slider) + 8} y={mapY(P2_adi) + 14} fill="#f43f5e" fontSize="10" fontWeight="bold">
            State 2 (P₂, V₂, T₂)
          </text>

          {/* Directional arrow along expansion */}
          {adiabaticPoints.length > 20 && (
            <polygon
              points={`${adiabaticPoints[20][0]},${adiabaticPoints[20][1]} ${adiabaticPoints[20][0] - 6},${adiabaticPoints[20][1] - 4} ${adiabaticPoints[20][0] - 4},${adiabaticPoints[20][1] + 4}`}
              fill="#f43f5e"
            />
          )}
        </svg>
      </div>

      {/* Parameter Control Slider */}
      <div className="mt-3 flex flex-col gap-2 rounded-lg bg-slate-900/60 p-3 border border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-300">Expansion Ratio (V₂ / V₁):</span>
          <span className="font-mono font-semibold text-rose-400 tabular-nums">
            {(v2Slider / V1).toFixed(2)}×
          </span>
        </div>
        <input
          type="range"
          min="1.2"
          max="3.0"
          step="0.05"
          value={v2Slider}
          onChange={(e) => setV2Slider(parseFloat(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-rose-500"
        />
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Initial: V₁ = 1.0 L</span>
          <span>Final: V₂ = {v2Slider.toFixed(2)} L</span>
        </div>
      </div>

      {/* Live Thermodynamic Proof Readout */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/40 p-2.5">
          <Snowflake className="h-4 w-4 text-sky-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400">Temperature Ratio (T₂ / T₁)</div>
            <div className="font-mono text-sm font-bold text-sky-300 tabular-nums">
              {(tempRatio_adi * 100).toFixed(1)}% <span className="text-[11px] font-normal text-rose-400 font-sans">(-{((1 - tempRatio_adi) * 100).toFixed(1)}% cooler)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/40 p-2.5">
          <Info className="h-4 w-4 text-rose-400 shrink-0" />
          <div>
            <div className="text-[10px] text-slate-400">Physical Work (W)</div>
            <div className="font-mono text-sm font-bold text-rose-300">
              Positive (W &gt; 0) <span className="text-[11px] font-normal text-slate-400 font-sans">⟹ ΔU &lt; 0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
