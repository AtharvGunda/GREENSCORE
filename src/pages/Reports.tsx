import React from 'react';
import { 
  FileText, 
  Plus, 
  Download, 
  Table, 
  ShieldCheck, 
  History, 
  CheckCircle2, 
  Activity,
  ArrowUpRight,
  TrendingDown,
  Monitor
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const reports = [
  { 
    title: 'Q3 2024 Carbon Emissions Audit', 
    date: 'Generated: Oct 15, 2024', 
    scopes: 'Scope 1, 2 & 3',
    tags: ['TCFD ALIGNED', 'VERIFIED'],
    icon: FileText,
    variant: 'tertiary'
  },
  { 
    title: 'Annual Supply Chain Sustainability', 
    date: 'Generated: Jan 12, 2024', 
    scopes: 'Vendor Analysis',
    tags: ['GRI STANDARDS'],
    icon: Table,
    variant: 'secondary'
  },
];

const auditTrail = [
  { date: 'Oct 15, 2024 • 14:32 UTC', event: 'Q3 Report signed & anchored', tx: '0x8f2a...c91b', active: true },
  { date: 'Oct 10, 2024 • 09:15 UTC', event: 'Data verification by Auditor Node #4', active: false },
  { date: 'Oct 01, 2024 • 00:00 UTC', event: 'Q3 Data collection phase closed', active: false },
];

export default function Reports() {
  return (
    <div className="space-y-10 pb-20">
      <header className="max-w-3xl space-y-4">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-on-surface">ESG Document Vault</h1>
        <p className="text-lg text-on-surface-variant font-light leading-relaxed">
          Securely access, generate, and verify your enterprise sustainability reports. All finalized documents are cryptographically anchored for immutable compliance tracking.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main List */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-xl font-bold text-on-surface">Available Reports</h2>
              <button className="flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary transition-colors uppercase tracking-widest">
                <Plus className="w-4 h-4" /> Generate New
              </button>
           </div>

           <div className="grid gap-4">
              {reports.map((report, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-start gap-5">
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-surface-bright flex items-center justify-center border border-white/10 shrink-0 group-hover:text-primary transition-colors",
                      report.variant === 'tertiary' ? 'text-tertiary' : 'text-secondary'
                    )}>
                      <report.icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors truncate">{report.title}</h4>
                      <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-widest opacity-60">
                        {report.date} • {report.scopes}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {report.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-on-surface-variant uppercase tracking-widest">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/5 hover:border-white/20 text-[10px] font-bold uppercase tracking-widest text-on-surface transition-all">
                      <Download className="w-4 h-4" /> PDF
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/5 hover:border-white/20 text-[10px] font-bold uppercase tracking-widest text-on-surface transition-all">
                      <Table className="w-4 h-4" /> Data
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Pending Report */}
              <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-60">
                 <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '67%' }}
                      className="h-full bg-primary shadow-[0_0_10px_#4edea3]"
                    />
                 </div>
                 
                 <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-surface-bright flex items-center justify-center border border-white/10 shrink-0">
                      <Activity className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-on-surface italic">2024 Energy Transition Roadmap</h4>
                      <p className="text-xs text-on-surface-variant font-medium mt-1">Compiling downstream data... 67% complete</p>
                      <div className="mt-3">
                         <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[8px] font-bold uppercase tracking-widest">Processing</span>
                      </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-8">
           {/* Compliance Tracker */}
           <section className="glass-panel rounded-3xl p-8 bg-surface-container-high/40">
              <div className="flex items-center gap-3 mb-8">
                 <ShieldCheck className="w-5 h-5 text-primary" />
                 <h3 className="text-xl font-bold text-on-surface">Compliance Status</h3>
              </div>
              
              <div className="space-y-6">
                 {[
                  { label: 'TCFD Alignment', val: 100, color: 'bg-primary' },
                  { label: 'GRI Standards', val: 85, color: 'bg-secondary' },
                  { label: 'ISSB Preparation', val: 40, color: 'bg-tertiary' },
                 ].map(item => (
                   <div key={item.label} className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                         <span className="text-on-surface">{item.label}</span>
                         <span className={cn(item.color.replace('bg-', 'text-'))}>{item.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: `${item.val}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           {/* Audit Timeline */}
           <section className="glass-panel rounded-3xl p-8 bg-surface-container-high/40">
              <div className="flex items-center gap-3 mb-8">
                 <History className="w-5 h-5 text-secondary" />
                 <h3 className="text-xl font-bold text-on-surface">Audit Trail</h3>
              </div>
              <div className="relative pl-6 space-y-8 border-l border-white/5 ml-1">
                 {auditTrail.map((item, i) => (
                    <div key={i} className="relative">
                       <div className={cn(
                        "absolute -left-8 top-1 w-3 h-3 rounded-full border-2 border-background z-10",
                        item.active ? "bg-primary shadow-[0_0_10px_#4edea3]" : "bg-surface-bright"
                       )} />
                       <p className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">{item.date}</p>
                       <p className="text-sm font-semibold text-on-surface leading-tight">{item.event}</p>
                       {item.tx && <p className="text-[10px] font-mono text-outline mt-2 bg-white/5 p-1 rounded inline-block">TX: {item.tx}</p>}
                    </div>
                 ))}
              </div>
           </section>
        </div>

        {/* Trajectory visualization */}
        <section className="lg:col-span-12 glass-panel rounded-3xl p-8 min-h-[300px] flex flex-col relative overflow-hidden mt-8">
           <div className="flex justify-between items-center mb-8 relative z-10">
              <h3 className="text-xl font-bold text-on-surface">Net-Zero Trajectory</h3>
              <div className="flex items-center gap-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border-2 border-primary" />
                    Historical
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    Projected
                 </div>
              </div>
           </div>

           <div className="flex-1 w-full relative mt-auto h-40">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
                 <path 
                  d="M0,80 L200,65 L400,75 L600,45 L800,30 L1000,10" 
                  fill="none" 
                  stroke="#4edea3" 
                  strokeWidth="2" 
                  strokeDasharray="0"
                  className="opacity-80"
                 />
                 <path 
                  d="M0,90 L1000,90" 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="1" 
                  strokeDasharray="10 5"
                 />
                 <circle cx="200" cy="65" r="4" fill="#0B1020" stroke="#4edea3" strokeWidth="2" />
                 <circle cx="600" cy="45" r="4" fill="#0B1020" stroke="#4edea3" strokeWidth="2" />
                 <circle cx="1000" cy="10" r="5" fill="#4edea3" className="animate-pulse" />
              </svg>
              <div className="flex justify-between w-full mt-4 font-mono text-[10px] text-on-surface-variant">
                 <span>2020 INCEPTION</span>
                 <span className="text-primary font-bold">2030 TARGET // NET-ZERO</span>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
