import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import api from '../services/api';
import ReportButton from '../components/report/ReportButton';

const ScoreReport = () => {
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

  if (loading) return <div className="p-8 text-center text-gray-400">Loading report...</div>;

  if (!scoreData) return <div className="p-8 text-center text-gray-400">No score available.</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-4xl mx-auto p-6 space-y-8 bg-bg-card text-text-primary border border-[#dde5b6] shadow-sm rounded-lg my-8">
      {/* Header */}
      <div className="border-b border-[#dde5b6] pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">Official GreenScore Report</h1>
          <p className="text-text-muted mt-1 font-mono text-sm">Calculated on: {new Date(scoreData.calculated_at).toLocaleDateString()}</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black font-mono text-green-primary">{scoreData.total_score}</div>
          <div className="text-sm font-bold tracking-widest uppercase text-text-muted mt-1">{scoreData.score_tier}</div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b border-[#dde5b6] pb-2 text-text-primary">Pillar Breakdown</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-[#dde5b6] rounded-md shadow-sm bg-bg-subtle hover:bg-[#dde5b6]/20 transition-colors">
            <h3 className="font-bold flex justify-between text-text-secondary">Energy & Carbon <span className="font-mono text-green-primary">{scoreData.energy_score}/100</span></h3>
            <p className="text-sm text-text-muted mt-2 font-mono">Weight: 40% | Based on BRSR P6-A, P6-B</p>
          </div>
          <div className="p-4 border border-[#dde5b6] rounded-md shadow-sm bg-bg-subtle hover:bg-[#dde5b6]/20 transition-colors">
            <h3 className="font-bold flex justify-between text-text-secondary">Water Management <span className="font-mono text-green-primary">{scoreData.water_score}/100</span></h3>
            <p className="text-sm text-text-muted mt-2 font-mono">Weight: 20% | Based on BRSR P6-C</p>
          </div>
          <div className="p-4 border border-[#dde5b6] rounded-md shadow-sm bg-bg-subtle hover:bg-[#dde5b6]/20 transition-colors">
            <h3 className="font-bold flex justify-between text-text-secondary">Waste Management <span className="font-mono text-green-primary">{scoreData.waste_score}/100</span></h3>
            <p className="text-sm text-text-muted mt-2 font-mono">Weight: 20% | Based on BRSR P6-D</p>
          </div>
          <div className="p-4 border border-[#dde5b6] rounded-md shadow-sm bg-bg-subtle hover:bg-[#dde5b6]/20 transition-colors">
            <h3 className="font-bold flex justify-between text-text-secondary">Renewables <span className="font-mono text-green-primary">{scoreData.renewables_score}/100</span></h3>
            <p className="text-sm text-text-muted mt-2 font-mono">Weight: 10% | Based on BRSR P6 Leadership</p>
          </div>
          <div className="p-4 border border-[#dde5b6] rounded-md shadow-sm bg-bg-subtle hover:bg-[#dde5b6]/20 transition-colors">
            <h3 className="font-bold flex justify-between text-text-secondary">Governance <span className="font-mono text-green-primary">{scoreData.governance_score}/100</span></h3>
            <p className="text-sm text-text-muted mt-2 font-mono">Weight: 10% | Based on BRSR P6 Governance</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-8 no-print border-t border-[#dde5b6]">
        {company && scoreData && emissions ? (
          <ReportButton company={company} scoreData={scoreData} emissions={emissions} />
        ) : (
          <button className="px-4 py-2 bg-bg-subtle text-text-muted rounded-md border border-[#dde5b6] font-medium" disabled>
            Loading PDF...
          </button>
        )}
        <Link to="/dashboard" className="px-4 py-2 bg-bg-subtle text-text-primary rounded-md border border-[#dde5b6] hover:bg-[#dde5b6] font-medium no-print transition-colors">
          Back to Dashboard
        </Link>
      </div>
    </motion.div>
  );
};

export default ScoreReport;
