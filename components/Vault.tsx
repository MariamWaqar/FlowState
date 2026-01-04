
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, MonthGroup } from '../types';

interface VaultProps {
  tasks: Task[];
}

const VaultGroup: React.FC<{ group: MonthGroup }> = ({ group }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      className="mb-px bg-white border-b border-gray-100 group transition-colors"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-6">
          <motion.div 
            animate={{ rotate: isOpen ? 90 : 0 }}
            className="text-gray-200 group-hover:text-black transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{group.monthName}</h3>
            <p className="text-[9px] text-gray-300 font-bold mono uppercase">{group.tasks.length} items_stored</p>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden bg-gray-50/30"
          >
            <div className="px-16 pb-8 pt-2 space-y-4">
              {group.tasks.map(task => (
                <div key={task.id} className="flex items-center justify-between text-[11px] mono border-b border-gray-100/50 pb-2">
                  <div className="flex items-center gap-4">
                    <div className={`w-1 h-3 ${task.category === 'Weekday' ? 'bg-black' : 'bg-emerald-950'} opacity-20`}></div>
                    <span className="text-gray-400 line-through lowercase">{task.title}</span>
                  </div>
                  <span className="text-[9px] text-gray-300 font-black">
                    {task.completedAt ? new Date(task.completedAt).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' }) : ''}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Vault: React.FC<VaultProps> = ({ tasks }) => {
  const grouped = tasks.reduce((acc: Record<string, Task[]>, task: Task) => {
    if (!task.completedAt) return acc;
    const date = new Date(task.completedAt);
    const monthKey = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  // Use Object.keys instead of Object.entries to maintain strict type safety for the 'tasks' array.
  // Using grouped[monthName] directly within the map ensures TypeScript treats it as Task[].
  const groups: MonthGroup[] = Object.keys(grouped)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((monthName): MonthGroup => ({ 
      monthName, 
      tasks: grouped[monthName] 
    }));

  return (
    <section className="mt-32 max-w-6xl mx-auto px-8 pb-40">
      <div className="flex items-center gap-10 mb-12">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">Archive_Log</h2>
        <div className="h-[1px] flex-1 bg-gray-100"></div>
      </div>

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 border border-gray-100">
          <AnimatePresence mode="popLayout">
            {groups.map(group => (
              <VaultGroup key={group.monthName} group={group} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 flex items-center justify-center border border-dashed border-gray-200">
          <p className="text-[9px] uppercase tracking-[1em] text-gray-200 font-black">Null_Archive</p>
        </div>
      )}
    </section>
  );
};

export default Vault;
