import React from 'react';
import { motion } from 'motion/react';
import { Bolt, PlayCircle, Globe, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden border-b-4 border-black">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center gap-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 border-2 border-black bg-white shadow-[4px_4px_0px_black] font-black text-[10px] uppercase tracking-[0.3em]">
            <Bolt className="w-4 h-4 text-primary" />
            V0.4 // Scope 3 Analytics Active
          </div>

          <h1 className="font-display text-7xl md:text-9xl font-black text-on-surface leading-[0.9] tracking-tighter uppercase italic text-center">
            Institutional <br />
            <span className="text-primary not-italic">ESG Ledger</span>
          </h1>

          <p className="text-xl md:text-2xl text-on-surface-variant max-w-3xl font-black uppercase tracking-widest leading-none opacity-60 italic">
            Transform complex carbon telemetry into boardroom-ready intelligence with cryptographic certainty.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mt-6">
            <button 
              onClick={() => navigate('/auth')}
              className="bg-black text-white font-black px-12 py-6 border-2 border-black hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(37,99,235,1)] transition-all uppercase tracking-widest text-sm"
            >
              Deploy Infrastructure
            </button>
            <button className="bg-white text-black border-2 border-black font-black px-12 py-6 uppercase tracking-widest text-sm shadow-[4px_4px_0px_black] hover:bg-surface-container transition-all flex items-center justify-center gap-3 group">
              <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Audit
            </button>
          </div>
        </motion.div>

        {/* HUD Elements as floating cards */}
        <div className="absolute top-1/4 left-10 hidden xl:block">
           <div className="studio-panel p-6 w-56 -rotate-6">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Node 01</span>
              <div className="h-2 w-full bg-surface-container-high mt-2 border border-black overflow-hidden">
                <div className="h-full bg-black w-2/3" />
              </div>
           </div>
        </div>
        <div className="absolute bottom-1/4 right-10 hidden xl:block">
           <div className="studio-panel p-6 w-56 rotate-3">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Uptime</span>
              <div className="text-3xl font-black tracking-tighter">99.99%</div>
           </div>
        </div>
      </section>

      {/* Metric Bento Section */}
      <section className="py-40 px-6 max-w-7xl mx-auto w-full relative z-20">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b-2 border-black pb-12">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl md:text-7xl font-black text-on-surface uppercase tracking-tight italic leading-none">Precision<br/>Telemetry</h2>
            <p className="text-on-surface-variant max-w-md mt-6 text-xs font-black uppercase tracking-[0.2em] opacity-60">Granular insights engineered for decisive corporate action.</p>
          </div>
          <button className="flex items-center gap-3 font-black text-xs uppercase tracking-widest border-b-2 border-black pb-2 hover:text-primary hover:border-primary transition-all">
            See all modules <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -5, x: -5 }}
            className="studio-panel p-10 flex flex-col gap-8 relative overflow-hidden group shadow-[8px_8px_0px_black] hover:shadow-[12px_12px_0px_rgba(37,99,235,1)] transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 bg-black flex items-center justify-center text-white border-2 border-black group-hover:bg-primary transition-colors">
                <Bolt className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black text-black border-2 border-black px-4 py-1 italic uppercase tracking-widest">LIVE DATA FEED</span>
            </div>
            <div>
              <h3 className="font-display text-3xl font-black text-on-surface mb-3 uppercase tracking-tight italic">Velocity</h3>
              <p className="text-xs font-bold leading-relaxed text-on-surface-variant uppercase tracking-widest opacity-70">Real-time tracking of Scope 1 & 2 outputs with second-level granularity.</p>
            </div>
            <div className="mt-auto pt-8 border-t-2 border-black flex items-baseline gap-3">
              <span className="font-display text-6xl font-black text-on-surface italic">2.4</span>
              <span className="text-on-surface-variant text-[10px] font-black tracking-[0.3em] uppercase opacity-60">kT / DAY</span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -5, x: -5 }}
            className="studio-panel p-10 flex flex-col gap-8 relative overflow-hidden group shadow-[8px_8px_0px_black] hover:shadow-[12px_12px_0px_rgba(37,99,235,1)] transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 bg-black flex items-center justify-center text-white border-2 border-black group-hover:bg-primary transition-colors">
                <Globe className="w-7 h-7" />
              </div>
            </div>
            <div>
              <h3 className="font-display text-3xl font-black text-on-surface mb-3 uppercase tracking-tight italic">Liquidity</h3>
              <p className="text-xs font-bold leading-relaxed text-on-surface-variant uppercase tracking-widest opacity-70">Available verified carbon credits active in our secondary registry.</p>
            </div>
            <div className="mt-auto pt-8 border-t-2 border-black flex items-end gap-2 h-20">
              {[30, 50, 40, 70, 90, 60, 85].map((h, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex-1 border-2 border-black transition-all duration-500",
                    i === 4 ? "bg-primary" : "bg-black/10"
                  )}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -5, x: -5 }}
            className="studio-panel p-10 flex flex-col gap-8 relative overflow-hidden group shadow-[8px_8px_0px_black] hover:shadow-[12px_12px_0px_rgba(37,99,235,1)] transition-all"
          >
            <div className="flex justify-between items-center">
              <div className="w-14 h-14 bg-black flex items-center justify-center text-white border-2 border-black group-hover:bg-primary transition-colors">
                <FileText className="w-7 h-7" />
              </div>
            </div>
            <div>
              <h3 className="font-display text-3xl font-black text-on-surface mb-3 uppercase tracking-tight italic">Ledger</h3>
              <p className="text-xs font-bold leading-relaxed text-on-surface-variant uppercase tracking-widest opacity-70">Cryptographically secured reduction events anchored on our ledger.</p>
            </div>
            <div className="mt-auto pt-8 border-t-2 border-black space-y-3 font-mono text-[9px] uppercase font-black tracking-widest italic overflow-hidden">
              <div className="flex justify-between items-center bg-surface p-2 border border-black">
                <span className="truncate w-1/2">0x8f2a...c91b</span>
                <span className="text-primary italic">VERIFIED</span>
              </div>
              <div className="flex justify-between items-center bg-surface p-2 border border-black opacity-50">
                <span className="truncate w-1/2">0x4b7e...3d2a</span>
                <span className="text-primary italic">VERIFIED</span>
              </div>
              <div className="flex justify-between items-center bg-surface p-2 border border-black opacity-30">
                <span className="truncate w-1/2">0x2c1f...9b8e</span>
                <span className="text-primary italic">VERIFIED</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
