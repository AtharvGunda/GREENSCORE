import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Store, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoanSchemesPanel from '../components/marketplace/LoanSchemesPanel';
import { LOAN_SCHEMES } from '../constants/loanProducts';
import { getSectorRelevantLoans, getEligibleLoans } from '../utils/financingEngine';

const Marketplace = () => {
  const [loading, setLoading] = useState(true);
  const [scoreData, setScoreData] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scoreRes, meRes] = await Promise.all([
          api.get('/score/current').catch(() => ({ data: null })),
          api.get('/auth/me').catch(() => ({ data: { user: {} } })),
        ]);
        setScoreData(scoreRes.data);
        setCompany(meRes.data.user);
      } catch (err) {
        console.error('Failed to fetch marketplace data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="p-8 text-center flex items-center justify-center min-h-[60vh]">
      <div className="space-y-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#5a9e5a] border-t-transparent animate-spin mx-auto" />
        <p className="text-sm font-mono-code" style={{ color: 'var(--text-muted)' }}>Loading marketplace…</p>
      </div>
    </div>
  );

  const userSector = company?.sector || '';
  const userScore  = scoreData ? Number(scoreData.total_score) : 0;
  const eligibleLoansCount = getEligibleLoans(getSectorRelevantLoans(LOAN_SCHEMES, userSector), userScore).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto px-4 py-8 relative z-10"
    >
      {/* Page header */}
      <div className="mb-10 relative overflow-hidden rounded-2xl p-8"
           style={{
             background: 'linear-gradient(135deg, rgba(90,158,90,0.12) 0%, rgba(13,31,15,0.8) 100%)',
             border: '1px solid rgba(90,158,90,0.2)',
             boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
           }}>
        {/* Decorative glow */}
        <div className="absolute top-[-40px] right-[-40px] w-[250px] h-[250px] rounded-full pointer-events-none"
             style={{ background: 'radial-gradient(circle, rgba(90,158,90,0.15) 0%, transparent 70%)' }} />

        <div className="flex items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
               style={{ background: 'rgba(90,158,90,0.15)', border: '1px solid rgba(90,158,90,0.3)', boxShadow: '0 0 20px rgba(90,158,90,0.2)' }}>
            <Store className="w-6 h-6 text-[#7bc47b]" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-4xl mb-2" style={{ color: 'var(--text-primary)' }}>
              Green Loan Marketplace
            </h1>
            {scoreData ? (
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Your GreenScore is{' '}
                <strong className="font-display text-lg" style={{ color: '#7bc47b' }}>
                  {Number(scoreData.total_score).toFixed(1)}
                </strong>
                . You qualify for{' '}
                <strong style={{ color: '#7bc47b' }}>{eligibleLoansCount}</strong>
                {' '}exclusive green financing products.
              </p>
            ) : (
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Calculate your GreenScore to unlock tailored financing options.{' '}
                <Link to="/carbon/input"
                  className="inline-flex items-center gap-1 font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: '#5a9e5a' }}>
                  Get Started <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </p>
            )}
          </div>

          {/* Score pill */}
          {scoreData && (
            <div className="hidden md:flex flex-col items-center gap-1 ml-auto">
              <span className="text-[10px] font-mono-code uppercase tracking-wider" style={{ color: 'var(--text-dim)' }}>
                Your Score
              </span>
              <div className="text-3xl font-display" style={{ color: '#7bc47b' }}>
                {Number(scoreData.total_score).toFixed(1)}
              </div>
              <span className="text-[10px] font-mono-code" style={{ color: 'var(--text-dim)' }}>/ 100</span>
            </div>
          )}
        </div>
      </div>

      {/* Loan Grid */}
      <LoanSchemesPanel scoreData={scoreData} company={company} />
    </motion.div>
  );
};

export default Marketplace;
