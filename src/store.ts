import { create } from "zustand";
import { Column, Id, Task } from "./types";
import { generateId } from "./utils";

type AppStore = {
  columns: Column[];
  tasks: Task[];
  addColumn: () => void;
  updateColumnTitle: (id: Id, title: string) => void;
  deleteColumn: (id: Id) => void;
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
}));
