import React from 'react';
import { 
  Building2, 
  Landmark, 
  BarChart, 
  ArrowUpRight, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Terminal,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const facilities = [
  { 
    id: 1, 
    bank: 'Global Standard Bank', 
    name: 'Eco-Advantage Term Loan', 
    type: 'ESG LINKED', 
    rate: 'SOFR + 1.2%', 
    icon: Landmark, 
    variant: 'primary',
    description: 'High-liquidity loan facility with rates indexed to real-time GreenScore improvements.'
  },
  { 
    id: 2, 
    bank: 'Meridian Capital Trust', 
    name: 'Sustainable Revolving Credit', 
    type: 'GREEN BOND', 
    rate: '4.15% Fixed', 
    icon: Building2, 
    variant: 'tertiary',
    description: 'Specialized revolving credit line backed by high-permanence carbon credits.'
  },
];

export default function Marketplace() {
  return (
    <div className="space-y-10 pb-20">
      {/* Hero / Eligibility Section */}
      <section className="bg-surface-container-low rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-xl relative z-10">
            <h1 className="font-display text-4xl font-bold text-on-surface mb-4">Premium Financing</h1>
            <p className="text-lg text-on-surface-variant font-light leading-relaxed mb-8">
              Unlock exclusive institutional rates and sustainability-linked loan facilities curated for enterprises maintaining a <span className="text-primary font-medium">Tier 1 GreenScore</span>.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-surface-bright border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold text-on-surface uppercase tracking-widest">Verified Enterprise</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2">
                <BarChart className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Tier 1 Eligible</span>
              </div>
            </div>
          </div>

          {/* Score Tracker visualization */}
          <div className="w-full md:w-auto min-w-[320px] glass-panel rounded-2xl p-8 flex flex-col items-center justify-center relative z-10 border-white/10 group-hover:border-primary/30 transition-colors">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-4">Current GreenScore</span>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-display text-6xl font-bold text-primary tracking-tighter">842</span>
              <span className="text-xl text-on-surface-variant font-light italic">/ 1000</span>
            </div>
            
            <div className="w-full h-3 bg-surface-bright rounded-full overflow-hidden relative mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '84.2%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-tertiary to-primary rounded-full relative"
              >
                 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/20" />
              </motion.div>
              {/* Markers */}
              <div className="absolute top-0 left-[60%] h-full w-px bg-background" />
              <div className="absolute top-0 left-[80%] h-full w-px bg-background shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            
            <div className="w-full flex justify-between font-mono text-[9px] text-on-surface-variant uppercase tracking-widest">
              <span>Tier 3</span>
              <span>Tier 2</span>
              <span className="text-primary font-bold">Tier 1</span>
            </div>
          </div>
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Product Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-end justify-between border-b border-white/5 pb-4">
            <h2 className="text-2xl font-bold text-on-surface">Curated Facilities</h2>
            <button className="flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary transition-colors uppercase tracking-widest">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((fac) => (
              <motion.div 
                key={fac.id}
                whileHover={{ y: -5 }}
                className="glass-panel p-8 rounded-2xl flex flex-col min-h-[300px] border-white/5 hover:border-primary/20 transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-surface-bright flex items-center justify-center border border-white/10 group-hover:text-primary transition-colors">
                    <fac.icon className="w-6 h-6" />
                  </div>
                  <span className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-bold border",
                    fac.variant === 'primary' ? "bg-primary/10 text-primary border-primary/20" : "bg-tertiary/10 text-tertiary border-tertiary/20"
                  )}>
                    {fac.type}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">{fac.name}</h3>
                  <p className="text-sm text-on-surface-variant font-medium mb-4">{fac.bank}</p>
                  <p className="text-sm text-on-surface-variant font-light leading-relaxed">{fac.description}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-end">
                   <div>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">Variable Rate</span>
                      <span className={cn("text-2xl font-bold tracking-tight", fac.variant === 'primary' ? "text-primary" : "text-tertiary")}>{fac.rate}</span>
                   </div>
                   <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-on-surface text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                      View Details
                   </button>
                </div>
              </motion.div>
            ))}

            {/* Featured Wide Component */}
            <div className="md:col-span-2 glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 border-l-4 border-l-primary shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
               <div className="flex-1 space-y-4">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-surface-bright border border-white/10 rounded text-[9px] font-bold text-on-surface uppercase tracking-widest">New Listing</span>
                    <span className="px-2 py-1 bg-secondary/10 border border-secondary/20 rounded text-[9px] font-bold text-secondary uppercase tracking-widest">Score Tier 1 Exclusive</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold text-on-surface">Net-Zero Transition Facility</h3>
                  <p className="text-on-surface-variant font-light max-w-md leading-relaxed">
                    Specialized capital allocation for large-scale fixed asset electrification and Scope 1 removal infrastructure.
                  </p>
               </div>
               
               <div className="w-full md:w-auto p-8 rounded-2xl bg-surface-container border border-white/10 flex flex-col items-center md:items-end min-w-[240px] shadow-inner">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Inaugural Base Rate</span>
                  <span className="text-5xl font-display font-bold text-primary mb-8 tracking-tighter">3.95%</span>
                  <button className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-tertiary text-on-primary font-bold text-xs uppercase tracking-widest hover:opacity-90 shadow-xl shadow-primary/10 transition-all">
                    Initiate Application
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* Comparison Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="glass-panel p-8 rounded-3xl border-white/5 sticky top-28 backdrop-blur-3xl shadow-2xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <Terminal className="w-5 h-5 text-on-surface" />
                <h3 className="text-xl font-bold text-on-surface">Compare Facilities</h3>
              </div>
              <p className="text-sm text-on-surface-variant font-light mb-8 leading-relaxed">
                Add up to 3 loan facilities to parse rates, loan covenants, and ESG linkage triggers side-by-side.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="h-16 rounded-xl border border-dashed border-white/10 bg-white/5 flex items-center justify-center group cursor-pointer hover:border-primary/40 transition-all">
                  <span className="text-[10px] font-bold text-on-surface-variant/40 group-hover:text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Slot 1
                  </span>
                </div>
                <div className="h-16 rounded-xl border border-dashed border-white/10 bg-white/5 flex items-center justify-center group cursor-pointer hover:border-primary/40 transition-all">
                  <span className="text-[10px] font-bold text-on-surface-variant/40 group-hover:text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Slot 2
                  </span>
                </div>
                <div className="h-16 rounded-xl border border-dashed border-white/10 bg-white/5 flex items-center justify-center opacity-30 grayscale">
                  <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">Locked</span>
                </div>
              </div>

              <button className="w-full py-4 rounded-xl bg-surface-container-high border border-white/10 text-on-surface-variant font-bold text-xs uppercase tracking-widest cursor-not-allowed" disabled>
                Run Comparison Analysis
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
