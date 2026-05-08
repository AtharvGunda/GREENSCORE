import React from 'react';
import { Leaf, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function Auth() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <main className="w-full h-screen flex flex-col lg:flex-row overflow-hidden bg-background">
      {/* Left Pane: Cinematic Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-surface-dim overflow-hidden flex-col justify-between p-20 z-0 border-r-4 border-black">
        <div 
          className="absolute inset-0 z-[-1] grayscale opacity-40 mix-blend-multiply bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072')` }}
        />
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-black flex items-center justify-center">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <span className="font-display text-4xl font-black text-on-surface tracking-tighter uppercase italic">GreenScore</span>
        </div>

        <div className="max-w-xl">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-8xl font-black text-on-surface leading-[0.85] tracking-tighter uppercase italic mb-8"
          >
            Verified <br />
            <span className="text-primary not-italic">Ledger</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-on-surface-variant font-black uppercase tracking-widest leading-none opacity-60 italic"
          >
            Access executive-grade carbon analytics and manage your ESG portfolio with institutional precision.
          </motion.p>
        </div>

        <div className="text-[10px] font-black uppercase tracking-[0.4em] italic opacity-40">
          SECURE PROTOCOL v4.2.1 // CRYPTOGRAPHIC AUTH ENABLED
        </div>
      </div>

      {/* Right Pane: Authentication Flow */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-surface relative z-10 p-12">
        <div className="absolute top-12 left-12 flex items-center gap-3 lg:hidden">
          <div className="w-8 h-8 bg-black flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="font-display text-2xl font-black text-on-surface tracking-tighter uppercase italic">GreenScore</span>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-[440px] flex flex-col"
        >
          <div className="mb-12 border-b-4 border-black pb-8">
            <h2 className="font-display text-5xl font-black text-on-surface uppercase tracking-tight italic">Welcome</h2>
            <p className="text-xs font-black uppercase tracking-[0.2em] mt-3 opacity-60 italic">Sign in to your enterprise account.</p>
          </div>

          <div className="flex flex-col gap-4 mb-10">
            <button className="w-full h-14 studio-panel flex items-center justify-center gap-4 bg-white hover:bg-surface-container transition-all font-black uppercase tracking-widest text-xs">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#000"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#000"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#000"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#000"></path>
              </svg>
              Continue with Google
            </button>
            <button className="w-full h-14 studio-panel flex items-center justify-center gap-4 bg-white hover:bg-surface-container transition-all font-black uppercase tracking-widest text-xs">
              <svg className="w-5 h-5" viewBox="0 0 21 21">
                <path d="M1 1h9v9H1z" fill="#000"></path>
                <path d="M1 11h9v9H1z" fill="#000"></path>
                <path d="M11 1h9v9h-9z" fill="#000"></path>
                <path d="M11 11h9v9h-9z" fill="#000"></path>
              </svg>
              Continue with Microsoft
            </button>
          </div>

          <div className="flex items-center gap-6 mb-10 italic">
            <div className="flex-1 h-0.5 bg-black/10" />
            <span className="text-[10px] font-black text-on-surface uppercase tracking-[0.3em]">OR ENTRY</span>
            <div className="flex-1 h-0.5 bg-black/10" />
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.25em] ml-1 italic" htmlFor="email">Corporate End-Point</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30" />
                <input 
                  className="w-full h-16 bg-white border-2 border-black py-3 pl-14 pr-6 text-on-surface placeholder:text-black/20 focus:outline-none focus:bg-primary/5 transition-all font-black italic uppercase text-xs tracking-widest" 
                  id="email" 
                  placeholder="ID@ENTERPRISE.LAYER" 
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-on-surface uppercase tracking-[0.25em] italic" htmlFor="password">Security String</label>
                <a className="text-[10px] font-black text-primary uppercase tracking-widest underline decoration-2 underline-offset-4" href="#">Recall</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30" />
                <input 
                  className="w-full h-16 bg-white border-2 border-black py-3 pl-14 pr-6 text-on-surface placeholder:text-black/20 focus:outline-none focus:bg-primary/5 transition-all font-black italic uppercase text-xs tracking-widest" 
                  id="password" 
                  placeholder="********" 
                  type="password"
                  required
                />
              </div>
            </div>

            <button 
              className="mt-4 w-full h-18 bg-black text-white font-black py-4 px-6 border-2 border-black hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_rgba(37,99,235,1)] transition-all uppercase tracking-[0.3em] text-sm italic" 
              type="submit"
            >
              Initialize Session
            </button>
          </form>

          <div className="mt-12 pt-8 border-t-2 border-black flex flex-col gap-2">
             <p className="text-center text-[10px] font-black text-on-surface-variant uppercase tracking-widest opacity-60">
              Not authenticated? <a className="text-primary underline decoration-2 underline-offset-4 ml-1" href="#">Request Node Access</a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
