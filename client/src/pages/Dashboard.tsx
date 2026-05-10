import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Wind, Factory, ArrowRight } from 'lucide-react';
import api from '../services/api';
import KPIStrip from '../components/dashboard/KPIStrip';
import EmissionsTrendChart from '../components/dashboard/EmissionsTrendChart';
import PillarRadarChart from '../components/dashboard/PillarRadarChart';
import InsightsPanel from '../components/dashboard/InsightsPanel';
import SectorComparisonBar from '../components/dashboard/SectorComparisonBar';
import ReportButton from '../components/report/ReportButton';
import EcoGauge from '../components/dashboard/EcoGauge';
import FormulaPanel from '../components/report/FormulaPanel';
import { LOAN_SCHEMES } from '../constants/loanProducts';
import { getSectorRelevantLoans, getEligibleLoans, calculateDynamicRate, calculateDynamicLoanAmountCr } from '../utils/financingEngine';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const glass = {
  background: 'rgba(255,255,255,0.05)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
} as React.CSSProperties;

const Dashboard = () => {
  const [scoreData, setScoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<any>(null);
  const [emissions, setEmissions] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scoreRes, meRes, historyRes] = await Promise.all([
          api.get('/score/current'),
          api.get('/auth/me').catch(() => ({ data: { user: {} } })),
          api.get('/carbon/history').catch(() => ({ data: [] }))
        ]);
        setScoreData(scoreRes.data);
        setCompany(meRes.data.user);
        setEmissions(historyRes.data[0] || {});
      } catch (err) {
        console.error('Failed to fetch data', err);
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
        <p className="text-sm font-mono-code" style={{ color: 'var(--text-muted)' }}>Loading your dashboard…</p>
      </div>
    </div>
  );

  if (!scoreData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="p-12 max-w-xl mx-auto text-center mt-20 glass"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)' }}
      >
        <div className="flex justify-center mb-6 gap-[-8px]">
          <Wind className="w-14 h-14 stroke-1" style={{ color: 'rgba(90,158,90,0.3)' }} />
          <Factory className="w-14 h-14 stroke-1 -ml-4" style={{ color: 'rgba(90,158,90,0.3)' }} />
        </div>
        <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--text-primary)' }}>
          Welcome to GreenScore
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          You haven't calculated your GreenScore yet. It takes just 5 minutes.
        </p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/carbon/input" className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-sm">
            Calculate Score Now <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  const chartData = {
    labels: ['Energy', 'Water', 'Waste', 'Renewables', 'Governance'],
    datasets: [{
      label: 'Your Score',
      data: [
        scoreData.energy_score, scoreData.water_score, scoreData.waste_score,
        scoreData.renewables_score, scoreData.governance_score
      ],
      backgroundColor: [
        'rgba(90,158,90,0.7)', 'rgba(90,158,90,0.6)', 'rgba(90,158,90,0.55)',
        'rgba(90,158,90,0.65)', 'rgba(90,158,90,0.5)'
      ],
      hoverBackgroundColor: 'rgba(123,196,123,0.85)',
      borderRadius: 6,
      borderSkipped: false,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutQuart' as const },
    scales: {
      y: {
        max: 100, min: 0,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#7a987a', font: { family: 'JetBrains Mono', size: 11 } },
        border: { color: 'rgba(255,255,255,0.05)' },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#7a987a', font: { family: 'JetBrains Mono', size: 11 } },
        border: { color: 'rgba(255,255,255,0.05)' },
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(13,31,15,0.95)',
        borderColor: 'rgba(90,158,90,0.3)',
        borderWidth: 1,
        titleColor: '#e8f0e8',
        bodyColor: '#7a987a',
        bodyFont: { family: 'JetBrains Mono' },
        callbacks: {
          label: (ctx: any) => ` Score: ${ctx.raw} / 100`
        }
      }
    }
  };

  // Loan savings calculation
  let maxLoanSavings = 0;
  if (company && scoreData) {
    const userSector = company.sector || '';
    const userScore = Number(scoreData.total_score);
    const userPercentile = Number(scoreData.sector_percentile);
    const revenueCr = company.annual_revenue_cr || 0;
    const relevantLoans = getSectorRelevantLoans(LOAN_SCHEMES, userSector);
    const eligibleLoans = getEligibleLoans(relevantLoans, userScore);
    eligibleLoans.forEach(loan => {
      const rate = calculateDynamicRate(loan, { score: userScore, percentile: userPercentile, sector: userSector, revenueCr });
      const amountCr = calculateDynamicLoanAmountCr(loan, revenueCr);
      const annualSaving = (amountCr * 10000000) * ((14 - rate) / 100);
      if (annualSaving > maxLoanSavings) maxLoanSavings = annualSaving;
    });
  }

  const companyIntensity = emissions
    ? (Number(emissions.total_co2e_scope1) + Number(emissions.total_co2e_scope2)) * 1000 / (company?.annual_revenue_cr || 1)
    : 0;
  let trueBenchmarkIntensity = 150;
  if (scoreData && Number(scoreData.energy_score) > 0 && companyIntensity > 0) {
    const ratio = Math.log(Number(scoreData.energy_score) / 100) / -0.693;
    if (ratio > 0) trueBenchmarkIntensity = companyIntensity / ratio;
  }

  const tierColor = scoreData.score_tier === 'Excellent' ? '#7bc47b' :
                    scoreData.score_tier === 'Good'      ? '#5a9e5a' : '#f59e0b';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto px-4 py-8 space-y-6 relative z-10"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-display text-4xl" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
          <p className="text-sm mt-1 font-mono-code" style={{ color: 'var(--text-muted)' }}>
            Sustainability Performance Overview
          </p>
        </div>
        {company && scoreData && emissions && (
          <ReportButton company={company} scoreData={scoreData} emissions={emissions} />
        )}
      </div>

      {/* KPI Strip */}
      <KPIStrip
        score={Number(scoreData.total_score)}
        co2eIntensity={companyIntensity}
        sectorPercentile={Number(scoreData.sector_percentile)}
        loanSavings={maxLoanSavings}
        sectorName={company?.sector || 'Sector'}
      />

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

        {/* GreenScore Card — 4 cols */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
          className="md:col-span-4 p-6 rounded-2xl flex flex-col items-center justify-center text-center card-hover"
          style={{ ...glass, background: 'linear-gradient(135deg, rgba(90,158,90,0.08) 0%, rgba(255,255,255,0.03) 100%)' }}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-6" style={{ color: 'var(--text-muted)' }}>
            Your GreenScore
          </h2>

          <EcoGauge score={Number(scoreData.total_score)} />

          <div className="mt-5 px-5 py-1.5 rounded-full text-sm font-semibold"
               style={{ background: `${tierColor}18`, border: `1px solid ${tierColor}40`, color: tierColor }}>
            {scoreData.score_tier}
          </div>

          <div className="mt-6 w-full pt-4 flex justify-between items-center"
               style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-left">
              <p className="text-xs font-mono-code uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Sector Rank</p>
              <p className="text-xl font-display" style={{ color: 'var(--text-primary)' }}>
                Top {Math.max(1, 100 - Number(scoreData.sector_percentile))}%
              </p>
            </div>
            {scoreData.loan_eligible && (
              <Link to="/marketplace"
                className="text-sm font-semibold hover:text-[#7bc47b] transition-colors flex items-center gap-1"
                style={{ color: '#5a9e5a' }}>
                View Loans <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </motion.div>

        {/* Charts — 8 cols */}
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* 5-Pillar Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="p-6 rounded-2xl card-hover" style={glass}
          >
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-muted)' }}>5-Pillar Breakdown</h3>
            <div className="relative w-full h-[240px]">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
            className="p-6 rounded-2xl card-hover" style={glass}
          >
            <PillarRadarChart scoreData={scoreData} />
          </motion.div>

          {/* Trend chart — full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="md:col-span-2 p-6 rounded-2xl card-hover" style={glass}
          >
            <EmissionsTrendChart companyIntensity={companyIntensity} benchmarkIntensity={trueBenchmarkIntensity} />
          </motion.div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-7">
          <InsightsPanel scoreData={scoreData} />
        </div>
        <div className="md:col-span-5 space-y-5">
          <SectorComparisonBar
            score={scoreData.total_score}
            benchmarkScore={scoreData.sector_benchmark_score}
            sectorName={company?.sector || ''}
          />
          <FormulaPanel
            score={Number(scoreData.total_score)}
            benchmarkIntensity={trueBenchmarkIntensity}
            companyIntensity={companyIntensity}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
