import React, { useState } from 'react';
import { ExternalLink, Lock, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LoanScheme } from '../../constants/loanProducts';
import SavingsCalculator from './SavingsCalculator';
import { calculateDynamicRate, calculateDynamicLoanAmountCr } from '../../utils/financingEngine';

interface LoanCardProps {
  loan: LoanScheme;
  scoreData: any;
  company: any;
}

const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: 'rgba(90,158,90,0.12)',  text: '#7bc47b', border: 'rgba(90,158,90,0.3)' },
  yellow:  { bg: 'rgba(245,158,11,0.10)', text: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  blue:    { bg: 'rgba(59,130,246,0.10)', text: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
  indigo:  { bg: 'rgba(99,102,241,0.10)', text: '#818cf8', border: 'rgba(99,102,241,0.3)' },
  orange:  { bg: 'rgba(249,115,22,0.10)', text: '#fb923c', border: 'rgba(249,115,22,0.3)' },
  teal:    { bg: 'rgba(20,184,166,0.10)', text: '#2dd4bf', border: 'rgba(20,184,166,0.3)' },
  default: { bg: 'rgba(168,85,247,0.10)', text: '#c084fc', border: 'rgba(168,85,247,0.3)' },
};

const LoanCard: React.FC<LoanCardProps> = ({ loan, scoreData, company }) => {
  const [expanded, setExpanded] = useState(false);

  const userScore = scoreData ? Number(scoreData.total_score) : 0;
  const userPercentile = scoreData ? Number(scoreData.sector_percentile) : 100;
  const revenueCr = company?.annual_revenue_cr || 0;

  const scoreGap = loan.minScore - userScore;
  const isEligible = userScore >= loan.minScore;
  const isClose = !isEligible && scoreGap <= 8;
  const isLocked = !isEligible && scoreGap > 8;

  const progressPercent = Math.min(100, Math.max(0, (userScore / loan.minScore) * 100));
  const tagColors = TAG_COLORS[loan.tagColour] || TAG_COLORS.default;

  const cardStyle = isEligible
    ? { background: 'rgba(90,158,90,0.07)',  border: '1px solid rgba(90,158,90,0.2)' }
    : isClose
    ? { background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', opacity: 0.9 }
    : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', opacity: 0.65, filter: 'grayscale(40%)' };

  return (
    <div className={`rounded-2xl p-6 flex flex-col h-full card-hover transition-all`}
         style={{ ...cardStyle, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
               style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {loan.bankLogo}
          </div>
          <div>
            <h3 className="font-semibold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>{loan.bank}</h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block"
                  style={{ background: tagColors.bg, color: tagColors.text, border: `1px solid ${tagColors.border}` }}>
              {loan.tag}
            </span>
          </div>
        </div>

        {isEligible ? (
          <span className="badge-eligible text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> ELIGIBLE
          </span>
        ) : isClose ? (
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
            Need {scoreGap} pts
          </span>
        ) : (
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-dim)' }}>
            <Lock className="w-2.5 h-2.5" /> LOCKED
          </span>
        )}
      </div>

      <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{loan.scheme}</h4>
      <p className="text-xs mb-4 font-semibold" style={{ color: '#5a9e5a' }}>{loan.highlight}</p>

      {/* Score bar */}
      <div className="p-3 rounded-xl mb-4 flex justify-between items-center text-xs font-mono-code"
           style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <span style={{ color: 'var(--text-muted)' }}>Required: <strong style={{ color: 'var(--text-primary)' }}>{loan.minScore}</strong></span>
        <span style={{ color: 'var(--text-muted)' }}>Yours: <strong style={{ color: isEligible ? '#7bc47b' : '#f59e0b' }}>{userScore}</strong></span>
      </div>

      {!isEligible && (
        <div className="mb-4">
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{
              width: `${progressPercent}%`,
              background: isClose
                ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                : 'linear-gradient(90deg, rgba(90,158,90,0.4), rgba(90,158,90,0.6))'
            }} />
          </div>
        </div>
      )}

      {/* Chips */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        {[
          {
            label: 'Rate',
            val: isEligible
              ? <span style={{ color: '#7bc47b' }}>{calculateDynamicRate(loan, { score: userScore, percentile: userPercentile, sector: company?.sector || '', revenueCr }).toFixed(2)}%</span>
              : <span>{loan.rateMin}–{loan.rateMax}%</span>
          },
          {
            label: 'Max Amount',
            val: `₹${isEligible ? calculateDynamicLoanAmountCr(loan, revenueCr).toFixed(1) : loan.maxAmountCr}Cr`
          },
          { label: 'Tenure', val: `${loan.tenureYears}yr` },
        ].map(({ label, val }) => (
          <div key={label} className="rounded-xl p-2.5"
               style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-[9px] uppercase tracking-wider mb-1 font-semibold" style={{ color: 'var(--text-dim)' }}>{label}</p>
            <p className="text-xs font-bold font-mono-code" style={{ color: 'var(--text-primary)' }}>{val}</p>
          </div>
        ))}
      </div>

      {isEligible && (
        <SavingsCalculator
          greenRate={calculateDynamicRate(loan, { score: userScore, percentile: userPercentile, sector: company?.sector || '', revenueCr })}
          loanAmountLakhs={calculateDynamicLoanAmountCr(loan, revenueCr) * 100}
          tenureYears={loan.tenureYears}
        />
      )}

      {/* Expandable details */}
      <div className="mt-auto pt-4 flex flex-col gap-2">
        <button onClick={() => setExpanded(!expanded)}
                className="text-xs flex items-center justify-center gap-1 py-1 transition-colors font-semibold"
                style={{ color: 'var(--text-dim)' }}>
          {expanded ? 'Hide Details' : 'View Requirements'}
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="text-xs p-3 rounded-xl mb-3 text-left"
                   style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text-muted)' }}>
                <p className="mb-2">{loan.description}</p>
                <ul className="list-disc pl-4 space-y-1">
                  {loan.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2">
          {isEligible ? (
            <motion.a
              href={loan.applyUrl} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold btn-primary"
            >
              Apply Now <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          ) : (
            <button disabled
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-not-allowed"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text-dim)' }}>
              Improve Score to Apply
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanCard;
