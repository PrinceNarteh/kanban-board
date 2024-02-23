import { create } from "zustand";
import { Column, Id, Task } from "./types";
import { generateId } from "./utils";

type AppStore = {
  // Column
  columns: Column[];
  setColumns: (columns: Column[]) => void;

  // Task
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
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
  addTask: (columnId: Id) => {
    set((state) => {
      const newTask: Task = {
        columnId,
        id: generateId(),
        content: `Task ${
          state.tasks.filter((task) => task.columnId === columnId).length + 1
        }`,
      };

      return {
        tasks: [...state.tasks, newTask],
      };
    });
  },
  deleteTask: (id: Id) => {
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      return {
        tasks: newTasks,
      };
    });
  },
}));
