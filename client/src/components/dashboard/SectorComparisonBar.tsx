import React from 'react';

interface SectorComparisonBarProps {
  score: number;
  benchmarkScore: number;
  sectorName: string;
}

const SectorComparisonBar: React.FC<SectorComparisonBarProps> = ({ score, benchmarkScore, sectorName }) => {
  const pScore = Number(score);
  const safeScore = !isNaN(pScore) && score !== null ? pScore : 0;

  const pBench = Number(benchmarkScore);
  const safeBenchmark = !isNaN(pBench) && benchmarkScore !== null && pBench !== 0 ? pBench : 50;

  // Distribution bands
  const bottom25 = Math.min(100, Math.max(0, safeBenchmark * 0.7));
  const median   = safeBenchmark;
  const top25    = Math.min(100, Math.max(0, safeBenchmark * 1.25));
  const top10    = Math.min(100, Math.max(0, safeBenchmark * 1.45));

  const pointerPos = Math.min(100, Math.max(0, safeScore));

  const bands = [
    { width: bottom25,          color: 'rgba(255,255,255,0.06)' },
    { width: median - bottom25, color: 'rgba(255,255,255,0.10)' },
    { width: top25 - median,    color: 'rgba(90,158,90,0.20)'   },
    { width: top10 - top25,     color: 'rgba(90,158,90,0.40)'   },
    { width: 100 - top10,       color: 'rgba(123,196,123,0.65)' },
  ];

  return (
    <div className="rounded-2xl p-6 mb-6" style={{
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
    }}>
      <h3 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: 'var(--text-muted)' }}>
        Score Distribution — {sectorName || 'Your Sector'}
      </h3>

      <div className="relative pt-9 pb-5 px-1">
        {/* Scale numbers */}
        <div className="absolute top-0 left-0 w-full flex justify-between text-[10px] font-mono-code px-1"
             style={{ color: 'var(--text-dim)' }}>
          {['0', '20', '40', '60', '80', '100'].map(n => <span key={n}>{n}</span>)}
        </div>

        {/* Pointer */}
        <div
          className="absolute top-5 flex flex-col items-center z-10 -translate-x-1/2 transition-all duration-1000 ease-out"
          style={{ left: `${pointerPos}%` }}
        >
          <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded-full mb-1 whitespace-nowrap"
                style={{
                  background: 'rgba(90,158,90,0.2)',
                  border: '1px solid rgba(90,158,90,0.4)',
                  color: '#7bc47b',
                }}>
            YOU {safeScore.toFixed(1)}
          </span>
          {/* Triangle */}
          <div style={{
            width: 0, height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '7px solid #5a9e5a',
          }} />
        </div>

        {/* Distribution bar */}
        <div className="h-3.5 rounded-full w-full flex overflow-hidden"
             style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          {bands.map((b, i) => (
            <div key={i} className="h-full" style={{ width: `${b.width}%`, background: b.color }} />
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-between text-[10px] font-mono-code mt-3 px-0.5"
             style={{ color: 'var(--text-dim)' }}>
          <span>Bottom 25%</span>
          <span>Median ({median.toFixed(1)})</span>
          <span>Top 25%</span>
          <span>Top 10%</span>
        </div>
      </div>
    </div>
  );
};

export default SectorComparisonBar;
