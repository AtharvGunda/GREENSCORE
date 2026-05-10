import React, { useState } from 'react';
import { LOAN_SCHEMES } from '../../constants/loanProducts';
import LoanCard from './LoanCard';
import { getSectorRelevantLoans, getEligibleLoans } from '../../utils/financingEngine';
import { motion } from 'motion/react';

interface LoanSchemesPanelProps {
  scoreData: any;
  company: any;
}

const LoanSchemesPanel: React.FC<LoanSchemesPanelProps> = ({ scoreData, company }) => {
  const userScore = scoreData ? Number(scoreData.total_score) : 0;
  const userSector = company?.sector || '';

  const [filter, setFilter] = useState<'all' | 'eligible' | 'sector'>('all');
  const [sortBy, setSortBy] = useState<'rate' | 'amount' | 'score'>('rate');

  let filteredLoans = [...LOAN_SCHEMES];
  if (filter === 'eligible') {
    filteredLoans = getEligibleLoans(getSectorRelevantLoans(filteredLoans, userSector), userScore);
  } else if (filter === 'sector' && userSector) {
    filteredLoans = getSectorRelevantLoans(filteredLoans, userSector);
  }

  filteredLoans.sort((a, b) => {
    if (sortBy === 'rate')   return a.rateMin - b.rateMin;
    if (sortBy === 'amount') return b.maxAmountCr - a.maxAmountCr;
    if (sortBy === 'score')  return a.minScore - b.minScore;
    return 0;
  });

  const filterBtns = [
    { key: 'all',      label: 'All Loans' },
    { key: 'eligible', label: 'Eligible for You' },
    ...(userSector ? [{ key: 'sector', label: `${userSector}` }] : []),
  ] as { key: typeof filter; label: string }[];

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4"
           style={{
             background: 'rgba(255,255,255,0.04)',
             backdropFilter: 'blur(12px)',
             WebkitBackdropFilter: 'blur(12px)',
             border: '1px solid rgba(255,255,255,0.08)',
             boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
           }}>
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {filterBtns.map(({ key, label }) => (
            <motion.button
              key={key}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilter(key)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={filter === key
                ? { background: 'rgba(90,158,90,0.2)', border: '1px solid rgba(90,158,90,0.4)', color: '#7bc47b', boxShadow: '0 0 12px rgba(90,158,90,0.2)' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)' }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold" style={{ color: 'var(--text-muted)' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="input-dark py-1.5 px-3 text-xs"
            style={{ width: 'auto' }}
          >
            <option value="rate">Best Rate</option>
            <option value="amount">Highest Amount</option>
            <option value="score">Lowest Score Req.</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLoans.map((loan, i) => (
          <motion.div
            key={loan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <LoanCard loan={loan} scoreData={scoreData} company={company} />
          </motion.div>
        ))}
      </div>

      {filteredLoans.length === 0 && (
        <div className="text-center p-14 rounded-2xl"
             style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)' }}>
          <p className="text-sm font-mono-code" style={{ color: 'var(--text-dim)' }}>
            No loans match your current filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default LoanSchemesPanel;
