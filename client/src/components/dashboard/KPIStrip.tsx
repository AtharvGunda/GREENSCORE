import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Leaf, Target, Award, PiggyBank } from 'lucide-react';
import { motion } from 'motion/react';

interface KPIStripProps {
  score: number;
  co2eIntensity: number;
  sectorPercentile: number;
  loanSavings: number;
  sectorName: string;
}

const CountUpNumber = ({ end, duration = 900, prefix = '', suffix = '' }: {
  end: any; duration?: number; prefix?: string; suffix?: string;
}) => {
  const parsed = Number(end);
  const safeEnd = !isNaN(parsed) && end !== null ? parsed : 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * safeEnd));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(safeEnd);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, safeEnd]);

  const displayValue = safeEnd % 1 !== 0 ? (safeEnd === count ? safeEnd.toFixed(1) : count) : count;
  return <span className="stat-number">{prefix}{displayValue}{suffix}</span>;
};

const kpiCards = (score: number, co2eIntensity: number, sectorPercentile: number, loanSavings: number, sectorName: string) => [
  {
    label: 'GreenScore',
    value: <CountUpNumber end={score} suffix=" / 100" />,
    icon: Leaf,
    iconColor: '#7bc47b',
    sub: <><TrendingUp className="w-3 h-3 inline mr-1" />+4 pts vs last yr</>,
    subColor: '#5a9e5a',
    accent: 'rgba(90,158,90,0.15)',
    border: 'rgba(90,158,90,0.25)',
  },
  {
    label: 'CO₂e Intensity',
    value: <><CountUpNumber end={Math.round(co2eIntensity)} /><span className="text-base ml-1 font-normal" style={{ color: 'var(--text-muted)' }}>kg/₹cr</span></>,
    icon: Target,
    iconColor: '#7bc47b',
    sub: <><TrendingDown className="w-3 h-3 inline mr-1" />−12% yoy</>,
    subColor: '#5a9e5a',
    accent: 'rgba(90,158,90,0.10)',
    border: 'rgba(90,158,90,0.15)',
  },
  {
    label: 'Sector Rank',
    value: `Top ${Math.max(1, 100 - Math.round(sectorPercentile))}%`,
    icon: Award,
    iconColor: '#f59e0b',
    sub: sectorName,
    subColor: 'var(--text-muted)',
    accent: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.15)',
  },
  {
    label: 'Loan Savings',
    value: <>₹{((loanSavings || 0) / 100000).toFixed(1)}L<span className="text-base ml-1 font-normal" style={{ color: 'var(--text-muted)' }}>/yr</span></>,
    icon: PiggyBank,
    iconColor: '#f59e0b',
    sub: 'vs market rate (14%)',
    subColor: 'var(--text-muted)',
    accent: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.15)',
  },
];

const KPIStrip: React.FC<KPIStripProps> = ({ score, co2eIntensity, sectorPercentile, loanSavings, sectorName }) => {
  const cards = kpiCards(score, co2eIntensity, sectorPercentile, loanSavings, sectorName);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ translateY: -4, transition: { duration: 0.2 } }}
          className="glass p-5 rounded-2xl flex flex-col justify-between"
          style={{
            background: `linear-gradient(135deg, ${card.accent} 0%, rgba(255,255,255,0.03) 100%)`,
            border: `1px solid ${card.border}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <div className="flex justify-between items-start mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {card.label}
            </p>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                 style={{ background: `${card.accent}`, border: `1px solid ${card.border}` }}>
              <card.icon className="w-4 h-4" style={{ color: card.iconColor }} />
            </div>
          </div>
          <div className="text-3xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
            {card.value}
          </div>
          <div className="text-xs" style={{ color: card.subColor }}>
            {card.sub}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPIStrip;
