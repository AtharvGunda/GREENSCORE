import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  progress?: number;
}

export function MetricCard({ 
  label, 
  value, 
  subValue, 
  trend, 
  trendDirection, 
  icon: Icon,
  variant = 'primary',
  className,
  progress
}: MetricCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "studio-panel p-6 flex flex-col justify-between min-h-[160px] relative overflow-hidden group transition-transform hover:-translate-y-1 hover:-translate-x-1",
        className
      )}
    >
      <div className="flex justify-between items-start relative z-10">
        <span className="text-[10px] uppercase font-black tracking-[0.2em] text-on-surface flex items-center gap-2">
          <Icon className={cn("w-4 h-4", variant === 'primary' ? 'text-primary' : 'text-on-surface')} />
          {label}
        </span>
        {trend && (
          <span className={cn(
            "flex items-center gap-1 px-2 py-1 border-2 border-black text-[10px] font-black",
            trendDirection === 'up' ? "text-primary " : "text-error"
          )}>
            {trend}
          </span>
        )}
      </div>

      <div className="relative z-10 mt-auto">
        <div className="font-display text-5xl font-black text-on-surface mb-2 leading-none tracking-tighter">
          {value}
        </div>
        {subValue && (
          <div className="text-xs text-on-surface-variant font-bold uppercase tracking-widest leading-tight opacity-70">
            {subValue}
          </div>
        )}
        {progress !== undefined && (
          <div className="mt-6 space-y-2">
             <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span>Progress</span>
                <span>{progress}%</span>
             </div>
             <div className="h-1.5 bg-surface-container-high border border-black overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-black"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
