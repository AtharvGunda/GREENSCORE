import React, { useEffect, useRef } from 'react';

interface EcoGaugeProps { score: number; }

const EcoGauge: React.FC<EcoGaugeProps> = ({ score }) => {
  const radius = 80;
  const circumference = Math.PI * radius; // half-circle
  const targetOffset = circumference - (score / 100) * circumference;
  const arcRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!arcRef.current) return;
    // Start at full offset (empty), then animate to target
    arcRef.current.style.strokeDashoffset = String(circumference);
    const raf = requestAnimationFrame(() => {
      if (arcRef.current) {
        arcRef.current.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)';
        arcRef.current.style.strokeDashoffset = String(targetOffset);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [score, circumference, targetOffset]);

  // Color zones
  const getColor = (s: number) => {
    if (s >= 75) return '#7bc47b';
    if (s >= 50) return '#5a9e5a';
    if (s >= 30) return '#f59e0b';
    return '#ef4444';
  };
  const color = getColor(score);

  return (
    <div className="relative flex flex-col items-center">
      <svg width="220" height="130" viewBox="0 0 220 130" className="overflow-visible">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="gaugeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Track arc — dark */}
        <path
          d="M 30 110 A 80 80 0 0 1 190 110"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map(v => {
          const angle = -180 + (v / 100) * 180;
          const rad = (angle * Math.PI) / 180;
          const cx = 110 + 80 * Math.cos(rad);
          const cy = 110 + 80 * Math.sin(rad);
          return (
            <circle key={v} cx={cx} cy={cy} r="2.5"
                    fill={v <= score ? color : 'rgba(255,255,255,0.15)'} />
          );
        })}

        {/* Foreground arc */}
        <path
          ref={arcRef}
          d="M 30 110 A 80 80 0 0 1 190 110"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          filter="url(#gaugeGlow)"
        />
      </svg>

      {/* Centre label */}
      <div className="absolute top-[42px] flex flex-col items-center">
        <span className="font-display text-5xl leading-none" style={{ color: 'var(--text-primary)' }}>
          {score.toFixed(1)}
        </span>
        <span className="text-xs font-mono-code mt-1" style={{ color: 'var(--text-muted)' }}>/ 100</span>
      </div>
    </div>
  );
};

export default EcoGauge;
