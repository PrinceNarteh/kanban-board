import { create } from "zustand";
import { Column, Task } from "./types";

type AppStore = {
  // Column
  columns: Column[];
  setColumns: (columns: Column[]) => void;

  // Task
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  activeTask: Task | null;
  setActiveTask: (task: Task) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  columns: [],
  tasks: [],
  activeTask: null,
  setColumns(columns: Column[]) {
    set(() => ({ columns }));
  },
  setTasks(tasks: Task[]) {
    set(() => ({ tasks }));
  },
  setActiveTask(task: Task | null) {
    set(() => ({ activeTask: task }));
  },
}));
