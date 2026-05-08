import React from 'react';
import { 
  Leaf, 
  Download, 
  Wind, 
  Zap, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { MetricCard } from '@/src/components/shared/MetricCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { name: 'Peer A', value: 40 },
  { name: 'Peer B', value: 30 },
  { name: 'Industry Avg', value: 55 },
  { name: 'GreenScore (You)', value: 84, isMain: true },
  { name: 'Peer C', value: 45 },
  { name: 'Peer D', value: 35 },
];

const events = [
  { type: 'Quarterly Emissions Report', date: 'Oct 12, 2024', impact: '-15 tCO2e', status: 'Verified', icon: Wind },
  { type: 'Solar Panel Installation (HQ)', date: 'Oct 05, 2024', impact: '+2 Score', status: 'Processing', icon: Zap },
  { type: 'Offset Purchase (Forestry)', date: 'Sep 28, 2024', impact: '-50 tCO2e', status: 'Verified', icon: Leaf },
];

export default function Dashboard() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b-4 border-black pb-10">
        <div className="max-w-2xl">
          <h1 className="font-display text-7xl font-black text-on-surface mb-4 leading-none tracking-tighter uppercase italic">Executive<br/>Overview</h1>
          <p className="text-xl text-on-surface-variant font-bold uppercase tracking-widest opacity-60">Real-time enterprise sustainability performance and financing eligibility.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <button className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-black bg-white font-black text-xs uppercase tracking-[0.2em] hover:bg-surface-container-high transition-all shadow-[4px_4px_0px_black]">
            <Download className="w-4 h-4" />
            Export Audit
          </button>
          <button className="flex items-center justify-center gap-2 px-10 py-4 bg-black text-white font-black text-xs uppercase tracking-[0.2em] transform transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_rgba(37,99,235,1)]">
            Apply for Green Loan
          </button>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard 
          label="Current GreenScore" 
          value="84" 
          trend="+2%" 
          trendDirection="up" 
          icon={Leaf} 
          subValue="Top 15% in Manufacturing. Eligible for premium rates."
          progress={84}
          variant="primary"
        />
        <MetricCard 
          label="Net Emissions" 
          value="1,240" 
          subValue="tCO2e annual total. 65% of target reached."
          icon={Wind} 
          variant="tertiary"
          progress={65}
        />
        <MetricCard 
          label="Approved Financing" 
          value="$2.5M" 
          subValue="Prime Rate. Sustainability Linked Loan ready."
          icon={ShieldCheck} 
          variant="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Industry Benchmarking Chart */}
        <div className="lg:col-span-2 studio-panel p-10 flex flex-col min-h-[450px]">
          <div className="flex justify-between items-start mb-14">
            <div>
              <h3 className="text-3xl font-black text-on-surface uppercase tracking-tight italic">Industry Peer Comparison</h3>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-2 opacity-60">YTD performance vs sector average</p>
            </div>
            <select className="bg-white border-2 border-black font-black text-[10px] uppercase tracking-widest px-4 py-2 outline-none cursor-pointer hover:bg-surface-container transition-all">
              <option>YTD Performance</option>
              <option>Last 12 Months</option>
            </select>
          </div>

          <div className="flex-1 w-full mt-auto">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="0" stroke="#EAE9E4" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={{ stroke: '#000', strokeWidth: 2 }} 
                  tickLine={false} 
                  tick={{ fill: '#000', fontSize: 10, fontWeight: 900 }} 
                />
                <YAxis 
                  axisLine={{ stroke: '#000', strokeWidth: 2 }} 
                  tickLine={false} 
                  tick={{ fill: '#000', fontSize: 10, fontWeight: 900 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#F5F4F0' }}
                  contentStyle={{ 
                    backgroundColor: '#FFF', 
                    border: '2px solid #000', 
                    borderRadius: '0',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    fontSize: '10px'
                  }}
                />
                <ReferenceLine y={55} stroke="#2563eb" strokeDasharray="4 4" strokeWidth={2} label={{ position: 'right', value: 'AVG', fill: '#2563eb', fontWeight: 900, fontSize: 10 }} />
                <Bar 
                  dataKey="value" 
                  stroke="#000"
                  strokeWidth={2}
                >
                  {data.map((entry, index) => (
                     <Cell 
                        key={`cell-${index}`} 
                        fill={entry.isMain ? '#2563eb' : '#000'} 
                        fillOpacity={entry.isMain ? 1 : 0.1}
                     />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="studio-panel p-10 flex flex-col">
          <div className="flex items-center gap-4 mb-10 border-b-2 border-black pb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-black text-on-surface uppercase tracking-tight italic">AI Insights</h3>
          </div>

          <div className="space-y-6 flex-1">
            <div className="p-6 border-2 border-black bg-white hover:bg-surface-container transition-all cursor-pointer group shadow-[4px_4px_0px_black]">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-black text-sm uppercase tracking-widest leading-tight">Supply Chain Optimization</h4>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-on-surface-variant font-bold leading-relaxed mb-6 opacity-80 italic">Switching to Vendor B for logistics could reduce scope 3 emissions by 12% next quarter.</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black py-2 px-3 border-2 border-black bg-primary-container text-primary uppercase">+3 Score Impact</span>
              </div>
            </div>

            <div className="p-6 border-2 border-black bg-white hover:bg-surface-container transition-all cursor-pointer group shadow-[4px_4px_0px_black]">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-black text-sm uppercase tracking-widest leading-tight">Energy Audit Due</h4>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-on-surface-variant font-bold leading-relaxed mb-6 opacity-80 italic">Facility 4 is showing irregular consumption patterns during off-hours this week.</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black py-2 px-3 border-2 border-black bg-error/10 text-error uppercase">Action Required</span>
              </div>
            </div>
          </div>
          
          <button className="mt-10 w-full py-4 border-2 border-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all">
            Full Audit Report
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Activity Table */}
      <div className="studio-panel overflow-hidden">
        <div className="p-10 border-b-2 border-black flex justify-between items-center bg-surface-container-low">
          <h3 className="text-3xl font-black text-on-surface uppercase tracking-tight italic">Activity Ledger</h3>
          <button className="px-6 py-2 border-2 border-black font-black text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all">View Timeline</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white border-b-2 border-black italic">
                <th className="px-10 py-6 text-[10px] font-black text-on-surface uppercase tracking-[0.25em]">Event Details</th>
                <th className="px-10 py-6 text-[10px] font-black text-on-surface uppercase tracking-[0.25em]">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-on-surface uppercase tracking-[0.25em]">Timestamp</th>
                <th className="px-10 py-6 text-[10px] font-black text-on-surface uppercase tracking-[0.25em] text-right">Metric Δ</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {events.map((event, i) => (
                <tr key={i} className="hover:bg-white transition-colors group cursor-pointer">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-black flex items-center justify-center text-white border-2 border-black group-hover:scale-110 transition-transform">
                        <event.icon className="w-6 h-6" />
                      </div>
                      <span className="font-black uppercase text-sm tracking-widest">{event.type}</span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className={cn(
                      "px-4 py-1 border-2 border-black text-[10px] font-black uppercase tracking-widest",
                      event.status === 'Verified' 
                        ? "bg-primary text-white" 
                        : "bg-surface text-on-surface opacity-50"
                    )}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-on-surface-variant font-black text-[10px] uppercase tracking-widest opacity-60 italic">{event.date}</td>
                  <td className={cn(
                    "px-10 py-8 text-right font-black text-lg italic",
                    event.impact.startsWith('-') ? "text-primary" : "text-on-surface"
                  )}>
                    {event.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
