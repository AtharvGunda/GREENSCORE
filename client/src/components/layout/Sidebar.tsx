import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
    <aside className="hidden lg:flex flex-col h-screen w-72 bg-bg-card border-r border-[#dde5b6] py-8 px-6 space-y-10 sticky top-0">
      <Link to="/" className="px-2 flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 bg-green-primary rounded-md flex items-center justify-center">
          <Leaf className="text-[#f0ead2] w-5 h-5" />
        </div>
        <span className="font-bold text-2xl tracking-tight text-text-primary leading-none">GreenScore</span>
      </Link>

      <div className="px-4 py-6 flex flex-col gap-4 border border-[#dde5b6] bg-bg-subtle shadow-sm rounded-md">
        <div className="w-12 h-12 bg-[#dde5b6] rounded-md flex items-center justify-center overflow-hidden">
          <User className="text-text-primary w-6 h-6" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-sm text-text-primary truncate">Sarah Jenkins</span>
          <span className="text-xs text-text-muted font-mono truncate">Chief Sustainability</span>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <div className="px-2 py-2 mb-4 border-b border-[#dde5b6]">
          <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Navigation</span>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-4 py-3 transition-all duration-200 group border rounded-md",
              isActive 
                ? "bg-green-primary/10 text-green-primary border-transparent font-bold" 
                : "text-text-muted hover:bg-[#dde5b6]/50 hover:text-text-primary border-transparent"
            )}
          >
            <item.icon className={cn("w-5 h-5")} />
            <span className="font-bold text-sm tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-8 border-t border-[#dde5b6] space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-4 px-4 py-3 border rounded-md transition-all duration-200",
            isActive ? "bg-green-primary/10 text-green-primary border-transparent font-bold" : "text-text-muted border-transparent hover:bg-[#dde5b6]/50 hover:text-text-primary"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-bold text-sm tracking-wide">Settings</span>
        </NavLink>
        <button className="w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 border border-transparent rounded-md">
          <LogOut className="w-5 h-5" />
          <span className="font-bold text-sm tracking-wide">Terminate</span>
        </button>
      </div>
    </aside>
  );
}
