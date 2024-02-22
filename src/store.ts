import { create } from "zustand";
import { Column, Id, Task } from "./types";
import { generateId } from "./utils";

type AppStore = {
  // Column
  columns: Column[];
  addColumn: () => void;
  setColumns: (columns: Column[]) => void;
  updateColumnTitle: (id: Id, title: string) => void;
  deleteColumn: (id: Id) => void;

  // Task
  tasks: Task[];
  addTask: (columnId: Id) => void;
  deleteTask: (id: Id) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  columns: [],
  tasks: [],
  addColumn: () => {
    set((state) => {
      const newColumn: Column = {
        id: generateId(),
        title: `Column-${state.columns.length + 1}`,
      };
      return { columns: [...state.columns, newColumn] };
    });
  },
  setColumns: (columns: Column[]) => {
    set(() => ({ columns }));
  },
  updateColumnTitle: (id: Id, title: string) => {
    set((state) => {
      const newColumns = state.columns.map((col) => {
        if (col.id !== id) return col;
        return { ...col, title };
      });

      return { columns: newColumns };
    });
  },
  deleteColumn: (id: Id) => {
    set((state) => {
      const newColumns = state.columns.filter((column) => column.id !== id);
      return { columns: newColumns };
    });
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
