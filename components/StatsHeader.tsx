
import React from 'react';
import { motion } from 'framer-motion';

interface StatsHeaderProps {
  completedCount: number;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ completedCount }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-black/5 py-10 px-8 mb-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-xs font-black uppercase tracking-[0.5em] text-black">
            FlowState <span className="text-gray-300">v2.26</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mono">System: Operational</p>
          </div>
        </div>
        
        <div className="flex items-end gap-12">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 mono">Cycle Progress</span>
            <div className="flex items-baseline gap-3">
               <motion.span 
                key={completedCount}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="text-5xl font-black text-black leading-none tracking-tighter mono"
               >
                {completedCount.toString().padStart(3, '0')}
               </motion.span>
               <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest pb-1">Units</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StatsHeader;
