import React, { useState } from 'react';
import { Zap, Droplets, Trash2, Sun, FileCheck, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScoreData {
  energy_score: number; water_score: number; waste_score: number;
  renewables_score: number; governance_score: number;
}
interface InsightsPanelProps { scoreData: ScoreData; }

const INSIGHT_TEMPLATES: Record<string, any> = {
  energy_score: {
    icon: Zap, title: 'Reduce Energy Intensity',
    description: 'Your energy intensity is above sector average.',
    action: 'Switch to LED lighting and variable frequency drives — typical payback: 18 months.',
    impact: 12, resource: { label: 'BEE Energy Audit Guide', url: 'https://beeindia.gov.in/content/designated-consumers' }
  },
  water_score: {
    icon: Droplets, title: 'Improve Water Recycling',
    description: 'Your water recycling rate is below the sector average.',
    action: 'Install closed-loop cooling systems or rainwater harvesting.',
    impact: 8, resource: { label: 'CGWB Water Management', url: 'https://cgwb.gov.in' }
  },
  waste_score: {
    icon: Trash2, title: 'Reduce Waste Intensity',
    description: 'Waste generation is higher than your sector average.',
    action: 'Partner with certified recyclers. Consider EPR compliance.',
    impact: 6, resource: { label: 'CPCB Waste Guidelines', url: 'https://cpcb.nic.in' }
  },
  renewables_score: {
    icon: Sun, title: 'Add Renewable Energy',
    description: 'You generate lower renewable energy vs sector average.',
    action: 'Rooftop solar has 5–7 year payback. Eligible for MNRE subsidy.',
    impact: 10, resource: { label: 'MNRE Solar Scheme', url: 'https://mnre.gov.in/solar' }
  },
  governance_score: {
    icon: FileCheck, title: 'Formalise Environmental Governance',
    description: 'Governance score is low — no documented policy or targets.',
    action: 'Publish an environmental policy (1-page is sufficient). Set a 3-year reduction target.',
    impact: 10, resource: { label: 'BRSR Guidance Note', url: 'https://www.sebi.gov.in/legal/circulars/may-2021/business-responsibility-and-sustainability-reporting-by-listed-entities_50032.html' }
  }
};

const InsightCard: React.FC<{ insight: any; score: number }> = ({ insight, score }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = insight.icon;

  const urgencyColor = score >= 60 ? '#5a9e5a' : score >= 40 ? '#f59e0b' : '#ef4444';
  const urgencyBg   = score >= 60 ? 'rgba(90,158,90,0.08)'  : score >= 40 ? 'rgba(245,158,11,0.06)' : 'rgba(239,68,68,0.06)';

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className="rounded-2xl p-4 cursor-pointer card-hover"
      style={{
        background: urgencyBg,
        border: `1px solid rgba(255,255,255,0.07)`,
        borderLeft: `3px solid ${urgencyColor}`,
        boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-start">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
               style={{ background: `${urgencyColor}18`, border: `1px solid ${urgencyColor}30` }}>
            <Icon className="w-4.5 h-4.5" style={{ color: urgencyColor, width: '1.1rem', height: '1.1rem' }} />
          </div>
          <div>
            <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{insight.title}</h4>
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{insight.description}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 ml-3">
          <span className="text-xs font-mono-code font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${urgencyColor}20`, border: `1px solid ${urgencyColor}40`, color: urgencyColor }}>
            +{insight.impact} pts
          </span>
          {expanded ? <ChevronUp className="w-4 h-4" style={{ color: 'var(--text-dim)' }} />
                    : <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-dim)' }} />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 pl-13" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingLeft: '3.25rem' }}>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Action: </span>
                {insight.action}
              </p>
              <a href={insight.resource.url} target="_blank" rel="noreferrer"
                 onClick={e => e.stopPropagation()}
                 className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-80 transition-opacity"
                 style={{ color: '#5a9e5a' }}>
                {insight.resource.label} <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InsightsPanel: React.FC<InsightsPanelProps> = ({ scoreData }) => {
  const scoresArray = Object.entries(scoreData)
    .filter(([key]) => key.endsWith('_score') && key !== 'total_score')
    .sort(([, a], [, b]) => (a as number) - (b as number))
    .slice(0, 2);

  return (
    <div className="rounded-2xl p-6 mb-6" style={{
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
    }}>
      <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
        Actionable Insights
      </h3>
      <div className="space-y-3">
        {scoresArray.map(([key, score]) => {
          const insight = INSIGHT_TEMPLATES[key];
          if (!insight) return null;
          return <InsightCard key={key} insight={insight} score={score as number} />;
        })}
      </div>
    </div>
  );
};

export default InsightsPanel;
