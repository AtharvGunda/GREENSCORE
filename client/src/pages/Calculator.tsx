import React, { useState } from 'react';
import { 
  Building2, 
  Cloud, 
  Truck, 
  ShoppingBag, 
  Settings2, 
  FlaskConical, 
  ArrowRight,
  TrendingDown,
  Info,
  Zap,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function Calculator() {
  const [sector, setSector] = useState('Manufacturing');
  const [energy, setEnergy] = useState(14500);
  const [fuel, setFuel] = useState(2800);
  const [waste, setWaste] = useState(450);
  const [renewables, setRenewables] = useState(true);

  const calculateScore = () => {
    // Mock calculation
    let base = 60;
    if (renewables) base += 12;
    // ... inverse relationships with energy etc
    return Math.min(95, base + (50000 - energy) / 5000 + (10000 - fuel) / 1000);
  };

  const score = Math.round(calculateScore());

  return (
    <div className="space-y-10 pb-20">
      <header className="max-w-3xl">
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-on-surface mb-4 tracking-tight">Enterprise Carbon Modeler</h1>
        <p className="text-lg text-on-surface-variant font-light leading-relaxed">
          Dynamically model your footprint. Adjust variables in real-time to forecast ESG ratings and identify high-impact reduction strategies.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Sector Profile */}
          <section className="glass-panel rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary opacity-40" />
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-on-surface flex items-center gap-3">
                <Building2 className="w-5 h-5 text-primary" />
                Industry Sector Profiling
              </h2>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Step 01</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'Manufacturing', icon: Settings2 },
                { id: 'Technology', icon: Cloud },
                { id: 'Logistics', icon: Truck },
                { id: 'Retail', icon: ShoppingBag },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSector(item.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all group",
                    sector === item.id 
                      ? "bg-primary/10 border-primary text-primary shadow-[0_0_20px_rgba(78,222,163,0.2)]" 
                      : "bg-surface-container border-white/5 text-on-surface-variant hover:border-white/20"
                  )}
                >
                  <item.icon className={cn("w-8 h-8 mb-4 transition-transform group-hover:scale-110", sector === item.id ? "fill-primary/20" : "")} />
                  <span className="text-xs font-bold uppercase tracking-wider">{item.id}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Parameters */}
          <section className="glass-panel rounded-3xl p-8 relative">
            <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
              <h2 className="text-xl font-bold text-on-surface flex items-center gap-3">
                <Target className="w-5 h-5 text-secondary" />
                Emissions Parameters
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Live Calculation</span>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <label className="text-sm font-bold text-on-surface block mb-1">Facility Energy Consumption</label>
                    <p className="text-xs text-on-surface-variant font-light">Scope 2 Emissions (Grid Electricity)</p>
                  </div>
                  <div className="font-mono text-sm text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-lg">
                    {energy.toLocaleString()} MWh
                  </div>
                </div>
                <input 
                  type="range" min="0" max="50000" step={100} 
                  value={energy} onChange={(e) => setEnergy(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <label className="text-sm font-bold text-on-surface block mb-1">Fleet Fuel Usage</label>
                    <p className="text-xs text-on-surface-variant font-light">Scope 1 Emissions (Direct Combustion)</p>
                  </div>
                  <div className="font-mono text-sm text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1.5 rounded-lg">
                    {fuel.toLocaleString()} Gal/mo
                  </div>
                </div>
                <input 
                  type="range" min="0" max="10000" step={50} 
                  value={fuel} onChange={(e) => setFuel(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-secondary"
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <label className="text-sm font-bold text-on-surface block mb-1">Waste to Landfill</label>
                    <p className="text-xs text-on-surface-variant font-light">Scope 3 Emissions (End-of-life)</p>
                  </div>
                  <div className="font-mono text-sm text-tertiary bg-tertiary/10 border border-tertiary/20 px-3 py-1.5 rounded-lg">
                    {waste.toLocaleString()} Tons/yr
                  </div>
                </div>
                <input 
                  type="range" min="0" max="2000" step={10} 
                  value={waste} onChange={(e) => setWaste(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-tertiary"
                />
              </div>
            </div>
          </section>

          {/* Scenarios */}
          <section className="glass-panel rounded-3xl p-8 border-l-4 border-l-secondary-container">
            <h2 className="text-xl font-bold text-on-surface mb-8 flex items-center gap-3">
              <FlaskConical className="w-5 h-5 text-secondary-container" />
              What-If Scenarios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => setRenewables(!renewables)}
                className={cn(
                "p-6 rounded-2xl border transition-all cursor-pointer flex items-start gap-5",
                renewables ? "bg-surface border-primary/30" : "bg-white/5 border-white/5 hover:border-white/20"
              )}>
                <div className={cn(
                  "w-6 h-6 rounded border-2 flex items-center justify-center mt-1 transition-colors",
                  renewables ? "bg-primary border-primary" : "border-white/20"
                )}>
                  {renewables && <div className="w-2 h-2 bg-background rotate-45" />}
                </div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Switch 50% to Renewables</h4>
                  <p className="text-xs text-on-surface-variant font-light mb-3 italic">Transition facility energy sourcing.</p>
                  <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold">
                    <TrendingDown className="w-3 h-3" /> -3,200 tCO2e
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:border-white/20 transition-all cursor-not-allowed grayscale opacity-60 flex items-start gap-5">
                <div className="w-6 h-6 rounded border-2 border-white/10 mt-1" />
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Electrify 30% of Fleet</h4>
                  <p className="text-xs text-on-surface-variant font-light mb-3 italic tracking-tight">Requires Tier 2 Green Marketplace Access.</p>
                  <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
                    <TrendingDown className="w-3 h-3" /> -850 tCO2e
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-4 flex flex-col gap-8 sticky top-28">
          <section className="glass-panel rounded-3xl p-8 flex flex-col items-center shadow-2xl relative overflow-hidden">
             <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
             
             <h3 className="text-lg font-bold text-on-surface w-full mb-10">Projected Rating</h3>
             
             {/* Gauge Simulation */}
             <div className="relative w-56 h-56 flex items-center justify-center mb-10 group">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                  <motion.circle 
                    initial={{ strokeDashoffset: 283 }}
                    animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="50" cy="50" r="45" fill="none" stroke="url(#projectedGradient)" strokeWidth="10" strokeLinecap="round" strokeDasharray="283" 
                  />
                  <defs>
                    <linearGradient id="projectedGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3cddc7" />
                      <stop offset="100%" stopColor="#4edea3" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex flex-col items-center justify-center text-center relative z-10 transition-transform group-hover:scale-110">
                   <motion.span 
                    key={score}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-display text-7xl font-bold text-on-surface tracking-tighter"
                   >
                     {score}
                   </motion.span>
                   <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] font-mono mt-2">B+ Rating</span>
                </div>
             </div>

             <div className="w-full space-y-6">
                <div className="space-y-3">
                   <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      <span>Emissions Intensity</span>
                      <span className="text-on-surface">12.4k tCO2e</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        className="h-full bg-gradient-to-r from-error to-error-container"
                      />
                   </div>
                   <div className="flex items-center gap-2 text-error text-[10px] font-bold uppercase tracking-widest justify-end">
                      <Info className="w-3 h-3" /> High vs baseline
                   </div>
                </div>

                <div className="divider" />

                <div className="space-y-4">
                   {[
                    { label: 'Scope 1 (Direct)', val: 25, color: 'bg-secondary' },
                    { label: 'Scope 2 (Energy)', val: 65, color: 'bg-primary' },
                    { label: 'Scope 3 (Other)', val: 10, color: 'bg-on-surface-variant' },
                   ].map((item) => (
                     <div key={item.label} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3 text-on-surface-variant">
                           <div className={cn("w-2 h-2 rounded-full", item.color)} />
                           {item.label}
                        </div>
                        <span className="font-mono text-on-surface font-bold">{item.val}%</span>
                     </div>
                   ))}
                </div>

                <button className="w-full py-4 mt-4 rounded-xl bg-gradient-to-tr from-primary/20 to-tertiary/20 backdrop-blur-xl border border-white/10 text-on-surface font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3 group">
                   Generate Impact Report
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
