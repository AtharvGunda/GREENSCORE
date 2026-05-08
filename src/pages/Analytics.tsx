import React from 'react';
import { 
  Globe2, 
  Factory, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Info,
  Download,
  Activity,
  History,
  ZoomIn,
  ZoomOut,
  TrendingUp,
  TrendingDown,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from '../lib/utils';

const velocityData = [
  { name: 'Jan', gross: 10, net: 8 },
  { name: 'Feb', gross: 11, net: 8.5 },
  { name: 'Mar', gross: 9, net: 7 },
  { name: 'Apr', gross: 10, net: 7.5 },
  { name: 'May', gross: 12, net: 8.2 },
  { name: 'Jun', gross: 11, net: 7.8 },
  { name: 'Jul', gross: 9.5, net: 6.5 },
];

const scopeAttribution = [
  { id: 'S3', label: 'Value Chain', type: 'Indirect downstream', value: 55, trend: '+2.1%', trendDir: 'up' },
  { id: 'S2', label: 'Indirect Energy', type: 'Purchased electricity', value: 30, trend: '-4.5%', trendDir: 'down' },
  { id: 'S1', label: 'Direct Emissions', type: 'Owned facilities', value: 15, trend: '-1.2%', trendDir: 'down' },
];

export default function Analytics() {
  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 font-bold text-[10px] text-on-surface-variant uppercase tracking-widest">Q3 2024 Report</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-bold text-[10px] text-primary uppercase tracking-widest">Live Data</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-on-surface mb-6">Carbon Performance Analytics</h1>
          <p className="text-lg text-on-surface-variant leading-relaxed font-light">
            A high-fidelity analysis of current emissions velocity, multi-scope attribution, and active carbon offset performance across the global enterprise portfolio.
          </p>
        </div>
        
        <div className="flex items-center p-1 bg-surface-container-low border border-white/5 rounded-xl w-max">
           {['1M', '3M', '6M', 'YTD', 'ALL'].map((tab) => (
             <button 
              key={tab}
              className={cn(
                "px-5 py-2.5 text-xs font-bold transition-all rounded-lg",
                tab === 'YTD' ? "bg-surface border border-white/10 text-on-surface shadow-xl" : "text-on-surface-variant hover:text-on-surface"
              )}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-8 h-48 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
          <div className="flex justify-between items-start relative z-10">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-primary/70" />
              Global GreenScore
            </span>
            <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded text-[10px] font-mono">
              <ArrowUpRight className="w-3 h-3" /> 2.4
            </span>
          </div>
          <div className="relative z-10 mt-auto">
            <div className="font-display text-5xl font-bold text-on-surface mb-2">84.2</div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary w-[84%]" />
               </div>
               <span className="whitespace-nowrap italic">Top 12% global</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-8 h-48 relative overflow-hidden group border-l-2 border-l-secondary/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
          <div className="flex justify-between items-start relative z-10">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] flex items-center gap-2">
              <Factory className="w-4 h-4 text-secondary/70" />
              Total Emissions
            </span>
            <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded text-[10px] font-mono">
              <ArrowDownRight className="w-3 h-3" /> 5.2%
            </span>
          </div>
          <div className="relative z-10 mt-auto">
            <div className="font-display text-5xl font-bold text-on-surface mb-1 tracking-tight">12.4<span className="text-2xl text-on-surface-variant font-light ml-1">K</span></div>
            <div className="text-xs text-on-surface-variant font-medium uppercase tracking-widest opacity-60">Metric tons CO2e YTD</div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-8 h-48 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
          <div className="flex justify-between items-start relative z-10">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-tertiary/70" />
              Active Offsets
            </span>
            <Info className="w-4 h-4 text-on-surface-variant/30" />
          </div>
          <div className="relative z-10 mt-auto">
            <div className="font-display text-5xl font-bold text-on-surface mb-1">4,250</div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
               <span className="w-2 h-2 rounded-full bg-tertiary" />
               <span className="italic">Verified registry credits secured</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-8 flex flex-col relative min-h-[480px]">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-xl font-bold text-on-surface mb-1">Emissions Velocity vs. Mitigation</h3>
              <p className="text-sm text-on-surface-variant font-light">Monthly net carbon position (MtCO2e)</p>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 border-t border-dashed border-on-surface-variant/50" />
                <span className="text-on-surface-variant">Gross</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-primary" />
                <span className="text-on-surface">Net Position</span>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 w-full pr-4">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                 <defs>
                   <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#4edea3" stopOpacity={0.15}/>
                     <stop offset="95%" stopColor="#4edea3" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                 <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#bbcabf', fontSize: 10, fontWeight: 500 }} 
                  dy={10}
                 />
                 <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#bbcabf', fontSize: 10, fontWeight: 500 }} 
                  dx={-10}
                 />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                   labelStyle={{ color: '#dde4dd', fontWeight: 'bold', marginBottom: '4px' }}
                 />
                 <Area 
                  type="monotone" 
                  dataKey="net" 
                  stroke="#4edea3" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorNet)" 
                  activeDot={{ r: 6, stroke: '#0B1020', strokeWidth: 4 }}
                 />
                 <Line 
                  type="monotone" 
                  dataKey="gross" 
                  stroke="#374151" 
                  strokeDasharray="5 5" 
                  strokeWidth={1.5} 
                  dot={false}
                 />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Scope Attribution Sidebar */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-8 flex flex-col min-h-[480px]">
          <div className="flex justify-between items-start mb-10">
            <h3 className="text-xl font-bold text-on-surface">Scope Attribution</h3>
            <button className="p-2 border border-white/5 rounded-lg text-on-surface-variant hover:text-primary transition-all">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-8 flex-1">
             {scopeAttribution.map((scope) => (
               <div key={scope.id} className="space-y-4">
                 <div className="flex justify-between items-end">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-white/5 flex items-center justify-center font-mono text-[10px] font-bold text-on-surface-variant">
                       {scope.id}
                     </div>
                     <div className="min-w-0">
                       <h4 className="font-bold text-on-surface text-sm truncate">{scope.label}</h4>
                       <p className="text-[10px] text-on-surface-variant uppercase tracking-widest truncate">{scope.type}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="font-mono text-lg font-bold text-on-surface">{scope.value}%</div>
                     <div className={cn(
                       "flex items-center justify-end gap-1 font-mono text-[10px] font-bold",
                       scope.trendDir === 'up' ? "text-error" : "text-primary"
                     )}>
                       {scope.trendDir === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                       {scope.trend}
                     </div>
                   </div>
                 </div>
                 <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${scope.value}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r",
                        scope.id === 'S1' ? "from-primary to-primary" : 
                        scope.id === 'S2' ? "from-secondary to-secondary" : "from-outline-variant to-outline-variant"
                      )}
                    />
                 </div>
               </div>
             ))}
          </div>

          <button className="mt-8 w-full py-4 rounded-xl border border-white/10 text-on-surface font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center justify-center gap-3">
            <Download className="w-4 h-4 text-primary" />
            Export Audit Report
          </button>
        </div>
      </div>

      {/* Global Map Section */}
      <div className="glass-panel rounded-3xl p-8 flex flex-col min-h-[500px]">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-xl font-bold text-on-surface mb-1">Geographic Intensity Map</h3>
            <p className="text-sm text-on-surface-variant font-light">Real-time facility output tracking and hotspot modeling.</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-lg border border-white/5 text-on-surface-variant hover:text-on-surface transition-all bg-white/5">
              <ZoomIn className="w-5 h-5" />
            </button>
            <button className="p-2.5 rounded-lg border border-white/5 text-on-surface-variant hover:text-on-surface transition-all bg-white/5">
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 w-full rounded-2xl bg-surface-container-lowest border border-white/5 relative overflow-hidden flex items-center justify-center group cursor-crosshair">
           <img 
            alt="World Map Visualization" 
            className="w-full h-full object-cover opacity-30 mix-blend-screen scale-110 transition-transform duration-[20s] group-hover:scale-100"
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"
           />
           
           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
           
           {/* Static Data Points */}
           <div className="absolute top-[35%] left-[25%] group/point">
             <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
               <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_#4edea3]" />
             </div>
             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 glass-panel rounded-xl p-4 opacity-0 group-hover/point:opacity-100 transition-all pointer-events-none scale-95 group-hover/point:scale-100 backdrop-blur-2xl border-primary/20">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">NA East Cluster</span>
                <span className="font-mono text-sm text-primary font-bold">2.4k MtCO2e <span className="text-on-surface-variant ml-2 font-normal">STABLE</span></span>
             </div>
           </div>

           <div className="absolute top-[45%] left-[65%] group/point">
             <div className="w-12 h-12 bg-error/20 rounded-full flex items-center justify-center animate-pulse delay-500">
               <div className="w-2.5 h-2.5 bg-error rounded-full shadow-[0_0_20px_#ffb4ab]" />
             </div>
             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 glass-panel rounded-xl p-4 opacity-0 group-hover/point:opacity-100 transition-all pointer-events-none scale-95 group-hover/point:scale-100 backdrop-blur-2xl border-error/20">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-1">EU Central Hub</span>
                <span className="font-mono text-sm text-error font-bold">5.8k MtCO2e <span className="text-white bg-error/20 px-1 rounded ml-2">+1.2%</span></span>
             </div>
           </div>

           <div className="absolute bottom-6 left-6 flex gap-6 bg-surface-container/60 backdrop-blur-xl border border-white/5 rounded-xl px-5 py-3 shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#4edea3]" />
                <span className="text-[10px] font-bold text-on-surface-variant tracking-[0.15em] uppercase">Nominal Output</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-error shadow-[0_0_8px_#ffb4ab]" />
                <span className="text-[10px] font-bold text-on-surface-variant tracking-[0.15em] uppercase">High Intensity</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
