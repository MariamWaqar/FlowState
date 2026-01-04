
import { Task } from '../types';

const STORAGE_KEY = 'flowstate_2026_tasks';

export const storageService = {
  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  },
  
  loadTasks: (): Task[] => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse tasks from storage", e);
      return [];
    }
  }
};
