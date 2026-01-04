
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Task, Category } from './types';
import { storageService } from './services/storage';
import StatsHeader from './components/StatsHeader';
import TaskColumn from './components/TaskColumn';
import Vault from './components/Vault';

// Fallback for random UUID generation if crypto.randomUUID is not available
const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = storageService.loadTasks();
    setTasks(savedTasks);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      storageService.saveTasks(tasks);
    }
  }, [tasks, isLoaded]);

  const addTask = (title: string, category: Category) => {
    const newTask: Task = {
      id: generateId(),
      title,
      category,
      completed: false,
      createdAt: Date.now()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nowCompleted = !t.completed;
        return {
          ...t,
          completed: nowCompleted,
          completedAt: nowCompleted ? Date.now() : undefined
        };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const activeTasks = useMemo(() => tasks.filter(t => !t.completed), [tasks]);
  const weekdayTasks = useMemo(() => activeTasks.filter(t => t.category === 'Weekday'), [activeTasks]);
  const weekendTasks = useMemo(() => activeTasks.filter(t => t.category === 'Weekend'), [activeTasks]);
  const completedTasks = useMemo(() => tasks.filter(t => t.completed), [tasks]);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] selection:bg-black selection:text-white">
      <StatsHeader completedCount={completedTasks.length} />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="flex-1 max-w-6xl mx-auto w-full px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 border border-gray-100 mb-20 shadow-2xl">
          <TaskColumn 
            title="Weekday Operations"
            category="Weekday"
            tasks={weekdayTasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
          <TaskColumn 
            title="Weekend Protocol"
            category="Weekend"
            tasks={weekendTasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </div>

        <Vault tasks={completedTasks} />
      </motion.main>

      <footer className="mt-auto py-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-8 flex justify-between items-center text-[9px] uppercase tracking-[0.4em] font-black text-gray-300 mono">
          <p>FLOWSTATE CORE v2.26 // LOGGED_IN</p>
          <p>STABLE_BRANCH_09-2026</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
