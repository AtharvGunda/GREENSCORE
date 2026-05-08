import React from 'react';
import { Leaf, Wallet } from 'lucide-react';
import { cn } from '../../lib/utils';

export function TopHeader() {
  return (
    <header className="bg-surface border-b-2 border-black sticky top-0 z-50 flex justify-between items-center w-full px-6 h-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-black flex items-center justify-center">
          <Leaf className="text-white w-5 h-5" />
        </div>
        <span className="font-display text-2xl font-black uppercase tracking-tighter">GreenScore</span>
      </div>

      <button className="flex items-center gap-2 px-6 py-2 bg-black text-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_rgba(37,99,235,1)] transition-all font-black text-[10px] uppercase tracking-widest">
        <Wallet className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline">Connect Wallet</span>
      </button>
    </header>
  );
}
