import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  FileText, 
  Calculator,
  Home
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-t border-white/5 flex justify-around items-center h-20 px-2 pb-safe">
      <NavLink
        to="/"
        className={({ isActive }) => cn(
          "flex flex-col items-center justify-center w-16 h-full transition-all duration-300",
          isActive ? "text-primary scale-110" : "text-on-surface-variant"
        )}
      >
        <Home className="w-5 h-5 mb-1" />
        <span className="text-[10px] uppercase font-bold tracking-widest">Home</span>
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) => cn(
          "flex flex-col items-center justify-center w-16 h-full transition-all duration-300",
          isActive ? "text-primary scale-110" : "text-on-surface-variant"
        )}
      >
        <LayoutDashboard className="w-5 h-5 mb-1" />
        <span className="text-[10px] uppercase font-bold tracking-widest">Stats</span>
      </NavLink>

      <NavLink
        to="/marketplace"
        className={({ isActive }) => cn(
          "flex flex-col items-center justify-center w-16 h-full transition-all duration-300",
          isActive ? "text-primary scale-110" : "text-on-surface-variant"
        )}
      >
        <Store className="w-5 h-5 mb-1" />
        <span className="text-[10px] uppercase font-bold tracking-widest">Market</span>
      </NavLink>

      <NavLink
        to="/reports"
        className={({ isActive }) => cn(
          "flex flex-col items-center justify-center w-16 h-full transition-all duration-300",
          isActive ? "text-primary scale-110" : "text-on-surface-variant"
        )}
      >
        <FileText className="w-5 h-5 mb-1" />
        <span className="text-[10px] uppercase font-bold tracking-widest">Vault</span>
      </NavLink>

      <NavLink
        to="/calculator"
        className={({ isActive }) => cn(
          "flex flex-col items-center justify-center w-16 h-full transition-all duration-300",
          isActive ? "text-primary scale-110" : "text-on-surface-variant"
        )}
      >
        <Calculator className="w-5 h-5 mb-1" />
        <span className="text-[10px] uppercase font-bold tracking-widest">Model</span>
      </NavLink>
    </nav>
  );
}
