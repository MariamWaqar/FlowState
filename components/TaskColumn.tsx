
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, Task } from '../types';
import TaskItem from './TaskItem';

interface TaskColumnProps {
  title: string;
  category: Category;
  tasks: Task[];
  onAddTask: (title: string, category: Category) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ 
  title, category, tasks, onAddTask, onToggleTask, onDeleteTask 
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTask(inputValue.trim(), category);
    setInputValue('');
  };

  const isWeekday = category === 'Weekday';

  return (
    <div className="flex flex-col h-full bg-white/40 backdrop-blur-sm border border-gray-100 p-10">
      <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 ${isWeekday ? 'bg-black' : 'bg-emerald-800'}`}></div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-black">
            {title}
          </h2>
        </div>
        <span className="text-xl font-black text-gray-200 mono">
          {tasks.length.toString().padStart(2, '0')}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mb-10 relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`INPUT_${category.toUpperCase()}_OBJECTIVE`}
          className="w-full bg-transparent py-4 text-[11px] font-bold uppercase tracking-widest border-b-2 border-gray-100 focus:border-black outline-none transition-all placeholder:text-gray-200 mono"
        />
        <motion.button 
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>
      </form>

      <div className="flex-1 overflow-y-auto pr-3">
        <AnimatePresence initial={false} mode="popLayout">
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={onToggleTask} 
              onDelete={onDeleteTask} 
            />
          ))}
        </AnimatePresence>
        
        {tasks.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-10 py-12 pointer-events-none">
            <p className="text-[9px] uppercase tracking-[1em] font-black text-black">Empty_Field</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
