import { create } from "zustand";
import { Column, Task } from "./types";

type AppStore = {
  // Column
  columns: Column[];
  setColumns: (columns: Column[]) => void;

  // Task
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  columns: [],
  tasks: [],
  setColumns: (columns: Column[]) => {
    set(() => ({ columns }));
  },
  setTasks: (tasks: Task[]) => {
    set(() => ({ tasks }));
  },
}));
