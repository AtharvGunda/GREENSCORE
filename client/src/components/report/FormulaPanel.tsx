import React from 'react';
import { Terminal } from 'lucide-react';

interface FormulaPanelProps {
  score: number;
  benchmarkIntensity: number;
  companyIntensity: number;
}

const FormulaPanel: React.FC<FormulaPanelProps> = ({ score, benchmarkIntensity, companyIntensity }) => {
  const receiptId = (Math.random() * 1000000).toFixed(0).padStart(6, '0');

  const rows = [
    { key: 'company_intensity',  val: `${companyIntensity.toFixed(2)} kgCO₂e/₹Cr` },
    { key: 'sector_benchmark',   val: `${benchmarkIntensity.toFixed(2)} kgCO₂e/₹Cr` },
  ];

  return (
    <div className="rounded-2xl p-5 font-mono-code text-sm"
         style={{
           background: 'rgba(13,31,15,0.6)',
           backdropFilter: 'blur(10px)',
           WebkitBackdropFilter: 'blur(10px)',
           border: '1px dashed rgba(90,158,90,0.2)',
           boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
         }}>

      {/* Header */}
      <div className="flex items-center gap-2 pb-3 mb-4"
           style={{ borderBottom: '1px dashed rgba(90,158,90,0.15)' }}>
        <Terminal className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#5a9e5a' }} />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: '#5a9e5a' }}>
            Audit Trail: GreenScore
          </p>
          <p className="text-[9px]" style={{ color: 'var(--text-dim)' }}>
            Receipt #{receiptId} · AUTO-GENERATED
          </p>
        </div>
      </div>

      {/* Data rows */}
      <div className="space-y-2 mb-3">
        {rows.map(({ key, val }) => (
          <div key={key} className="flex justify-between items-center px-3 py-2 rounded-lg"
               style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="text-[10px]" style={{ color: 'var(--text-dim)' }}>{key}</span>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Formula block */}
      <div className="px-3 py-2.5 rounded-lg mb-3"
           style={{ background: 'rgba(90,158,90,0.06)', border: '1px solid rgba(90,158,90,0.12)' }}>
        <p className="text-[9px] uppercase tracking-wider mb-1.5 font-semibold" style={{ color: 'var(--text-dim)' }}>
          base formula
        </p>
        <p className="text-xs" style={{ color: '#7bc47b' }}>
          Score = max(0, min(100, 100 × (2 − (Company / Benchmark)) / 1.8))
        </p>
      </div>

      {/* Substitution + Result */}
      <div className="px-3 py-2.5 rounded-lg"
           style={{ background: 'rgba(90,158,90,0.1)', border: '1px solid rgba(90,158,90,0.25)' }}>
        <p className="text-[9px] uppercase tracking-wider mb-1.5 font-semibold" style={{ color: 'var(--text-dim)' }}>
          substitution
        </p>
        <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
          Score = max(0, min(100, 100 × (2 − ({companyIntensity.toFixed(2)} / {benchmarkIntensity.toFixed(2)})) / 1.8))
        </p>
        <div className="flex justify-between items-center pt-2"
             style={{ borderTop: '1px solid rgba(90,158,90,0.15)' }}>
          <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>final score</span>
          <span className="text-xl font-semibold" style={{ color: '#7bc47b' }}>{score.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default FormulaPanel;
