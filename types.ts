
export type Category = 'Weekday' | 'Weekend';

export interface Task {
  id: string;
  title: string;
  category: Category;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

export interface MonthGroup {
  monthName: string; // e.g., "January 2026"
  tasks: Task[];
}
