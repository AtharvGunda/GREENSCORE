import React from 'react';
import { 
  Building2, 
  Landmark, 
  Leaf, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  History,
  Terminal,
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const entities = [
  { name: 'Apex Manufacturing', id: '8492-A', score: 92, rating: 'A+', status: 'VERIFIED' },
  { name: 'Lumina Energy', id: '3120-B', score: 78, rating: 'B+', status: 'PENDING AUDIT' },
  { name: 'Vanguard Logistics', id: '9941-C', score: 45, rating: 'C-', status: 'FLAGGED' },
  { name: 'EcoBuild Materials', id: '2215-D', score: 85, rating: 'A', status: 'VERIFIED' },
];

const logs = [
  { event: 'Data model updated for Apex Mfg', time: '2 mins ago', type: 'system', variant: 'primary' },
  { event: 'API Sync failed for Region EU-West', time: '14 mins ago', type: 'gateway', variant: 'error' },
  { event: 'Admin Sarah Jenkins approved loan #492', time: '1 hr ago', type: 'manual', variant: 'secondary' },
];

export default function Admin() {
  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.25em]">Admin Protocol v2.8</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-on-surface">Global Command Center</h1>
          <p className="text-lg text-on-surface-variant font-light mt-4">Platform-wide executive metrics and health indicators.</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-xl">
           <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest flex items-center gap-3">
             <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             Live Telemetry Sync: Active
           </span>
        </div>
      </div>

      {/* Metric Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
          { label: 'Total active companies', value: '2,451', trend: '+12%', dir: 'up', icon: Building2, color: 'text-primary' },
          { label: 'Total Capital Deployed', value: '$1.24B', trend: '+8.4%', dir: 'up', icon: Landmark, color: 'text-secondary' },
          { label: 'Emissions Offset (MtCO2e)', value: '84.5M', trend: '-4.2%', dir: 'down', icon: Leaf, color: 'text-tertiary' },
         ].map((stat, i) => (
           <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all group"
           >
             <div className="flex justify-between items-start mb-6">
                <div className={cn("w-12 h-12 rounded-xl bg-surface-bright flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform", stat.color)}>
                   <stat.icon className="w-6 h-6" />
                </div>
                <span className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded border",
                  stat.dir === 'up' ? "text-primary bg-primary/10 border-primary/20" : "text-error bg-error/10 border-error/20"
                )}>
                  {stat.dir === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.trend}
                </span>
             </div>
             <div>
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-1 opacity-70">{stat.label}</p>
                <p className="text-5xl font-display font-bold text-on-surface tracking-tight">{stat.value}</p>
             </div>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Registry Table */}
        <div className="lg:col-span-8 glass-panel rounded-3xl overflow-hidden border-white/5 shadow-2xl flex flex-col min-h-[500px]">
           <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-surface-container/20">
              <h3 className="text-xl font-bold text-on-surface">Entity Registry</h3>
              <div className="flex items-center gap-3">
                 <div className="relative flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                    <input 
                      type="text" 
                      placeholder="Search global registry..." 
                      className="bg-background border border-white/10 rounded-lg text-sm pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:border-primary/50 transition-all shadow-inner"
                    />
                 </div>
                 <button className="p-2 border border-white/10 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors bg-white/5">
                    <Filter className="w-4 h-4" />
                 </button>
              </div>
           </div>

           <div className="overflow-x-auto flex-1">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-surface-container-high/40 text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] border-b border-white/5">
                       <th className="px-8 py-4">SME Entity</th>
                       <th className="px-8 py-4">GreenScore</th>
                       <th className="px-8 py-4">Approval Status</th>
                       <th className="px-8 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {entities.map((ent, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors group cursor-pointer">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center font-bold text-on-surface border border-white/5 shadow-md">
                                 {ent.name[0]}
                              </div>
                              <div>
                                 <p className="font-bold text-on-surface text-sm">{ent.name}</p>
                                 <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-60">ID: {ent.id}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-2">
                              <span className={cn(
                                "font-mono font-bold text-sm",
                                ent.score > 80 ? "text-primary" : ent.score > 60 ? "text-secondary" : "text-error"
                              )}>{ent.rating}</span>
                              <span className="text-[10px] text-on-surface-variant font-medium">({ent.score}/100)</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className={cn(
                             "px-3 py-1 rounded-lg text-[9px] font-bold border uppercase tracking-widest",
                             ent.status === 'VERIFIED' ? "bg-primary/10 text-primary border-primary/20" :
                             ent.status === 'FLAGGED' ? "bg-error/10 text-error border-error/20" :
                             "bg-surface-container-high text-on-surface-variant border-white/10"
                           )}>
                             {ent.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button className="p-2 text-on-surface-variant hover:text-primary transition-all">
                              <MoreVertical className="w-4 h-4" />
                           </button>
                        </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Side Panels */}
        <div className="lg:col-span-4 space-y-8">
           {/* Loan Queue */}
           <section className="glass-panel p-8 rounded-3xl flex flex-col h-[340px]">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                 <div className="flex items-center gap-3">
                   <Clock className="w-5 h-5 text-secondary" />
                   <h3 className="text-xl font-bold text-on-surface">Approvals</h3>
                 </div>
                 <span className="bg-secondary/10 text-secondary font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-secondary/20 tracking-tighter">3 PENDING</span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                 <div className="p-4 rounded-xl bg-surface border border-white/10 hover:border-secondary transition-all group">
                    <div className="flex justify-between items-start mb-2">
                       <p className="font-bold text-sm text-on-surface">Solar Array Funding</p>
                       <span className="font-mono text-sm text-secondary font-bold">$2.5M</span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-light mb-4 italic">Requested by: Lumina Energy</p>
                    <div className="flex gap-2">
                       <button className="flex-1 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 font-bold text-[10px] uppercase tracking-widest hover:bg-primary transition-all hover:text-on-primary">APPROVE</button>
                       <button className="flex-1 py-1.5 rounded-lg border border-white/10 text-on-surface-variant font-bold text-[10px] uppercase tracking-widest hover:text-error hover:border-error transition-all">REJECT</button>
                    </div>
                 </div>
              </div>
           </section>

           {/* Audit Log */}
           <section className="glass-panel p-8 rounded-3xl flex flex-col h-[300px]">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                 <History className="w-5 h-5 text-on-surface" />
                 <h3 className="text-xl font-bold text-on-surface">System Audit</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-6 pr-1">
                 {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 items-start relative pb-6 last:pb-0">
                       {i < logs.length - 1 && <div className="absolute left-[11px] top-6 bottom-0 w-px bg-white/5" />}
                       <div className={cn(
                        "w-6 h-6 shrink-0 mt-1 rounded-lg border flex items-center justify-center",
                        log.variant === 'primary' ? "bg-primary/10 border-primary/20 text-primary" :
                        log.variant === 'error' ? "bg-error/10 border-error/20 text-error" : 
                        "bg-secondary/10 border-secondary/20 text-secondary"
                       )}>
                         <Terminal className="w-3 h-3" />
                       </div>
                       <div>
                          <p className="text-xs font-semibold text-on-surface leading-tight mb-1">{log.event}</p>
                          <p className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest opacity-60">
                             {log.type} // {log.time}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
