
import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.98, x: -10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
      className="group flex items-center gap-5 p-5 bg-white border border-gray-100 rounded-none shadow-[4px_4px_0px_rgba(0,0,0,0.02)] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.03)] transition-all mb-4"
    >
      <div 
        className="relative flex items-center justify-center w-6 h-6 cursor-pointer overflow-hidden border border-gray-200"
        onClick={() => onToggle(task.id)}
      >
        <motion.div 
          animate={{ y: task.completed ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`absolute inset-0 ${task.category === 'Weekday' ? 'bg-black' : 'bg-emerald-950'}`}
        />
        {task.completed && (
          <motion.svg 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 w-3 h-3 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </div>

      <span className={`flex-1 text-[13px] font-bold tracking-tight transition-all duration-500 mono ${task.completed ? 'text-gray-300 line-through' : 'text-gray-900'}`}>
        {task.title}
      </span>

      <button 
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-200 hover:text-black transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
};

export default TaskItem;
