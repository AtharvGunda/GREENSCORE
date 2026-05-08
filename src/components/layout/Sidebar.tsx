import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  LayoutDashboard, 
  Store, 
  FileText, 
  Calculator, 
  Settings,
  Leaf,
  LogOut,
  User
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Executive Overview', path: '/dashboard' },
  { icon: BarChart3, label: 'Carbon Analytics', path: '/analytics' },
  { icon: Store, label: 'Green Marketplace', path: '/marketplace' },
  { icon: FileText, label: 'Reports Center', path: '/reports' },
  { icon: Calculator, label: 'Calculator', path: '/calculator' },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col h-screen w-72 bg-surface-dim border-r-2 border-black py-8 px-6 space-y-10 sticky top-0">
      <div className="px-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-black flex items-center justify-center">
          <Leaf className="text-white w-5 h-5" />
        </div>
        <span className="font-display text-2xl font-black tracking-tighter uppercase leading-none">Green<br/>Score</span>
      </div>

      <div className="px-4 py-6 flex flex-col gap-4 border-2 border-black bg-white shadow-[4px_4px_0px_black]">
        <div className="w-12 h-12 bg-black flex items-center justify-center overflow-hidden">
          <User className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-black text-xs uppercase tracking-widest truncate">Sarah Jenkins</span>
          <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest truncate opacity-60">Chief Sustainability</span>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <div className="px-2 py-2 mb-4 border-b-2 border-black/10">
          <span className="text-[10px] font-black text-on-surface uppercase tracking-[0.25em]">Navigation</span>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-4 py-3 transition-all duration-200 group border-2",
              isActive 
                ? "bg-black text-white border-black" 
                : "text-on-surface hover:border-black border-transparent"
            )}
          >
            <item.icon className={cn("w-5 h-5")} />
            <span className="font-black text-[11px] uppercase tracking-widest">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-8 border-t-2 border-black space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-4 px-4 py-3 border-2 transition-all duration-200",
            isActive ? "bg-black text-white border-black" : "text-on-surface-variant border-transparent hover:border-black hover:text-on-surface"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-black text-[11px] uppercase tracking-widest">Settings</span>
        </NavLink>
        <button className="w-full flex items-center gap-4 px-4 py-3 text-error hover:bg-error/5 transition-all duration-200 border-2 border-transparent hover:border-error">
          <LogOut className="w-5 h-5" />
          <span className="font-black text-[11px] uppercase tracking-widest">Terminate</span>
        </button>
      </div>
    </aside>
  );
}
