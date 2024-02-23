import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useMemo, useState } from "react";
import { useAppState } from "../../hooks";
import { PlusIcon, TrashIcon } from "../../icons";
import { Column, Id, Task } from "../../types";
import { generateId } from "../../utils";
import { TaskList } from "../tasks";

interface ColumnItemProps {
  column: Column;
}

export const ColumnItem: React.FC<ColumnItemProps> = ({ column }) => {
  const { setColumns, columns, tasks, setTasks } = useAppState();
  const [editMode, setEditMode] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const addTask = (columnId: Id) => {
    const newTask: Task = {
      columnId,
      id: generateId(),
      content: `Task ${
        tasks.filter((task) => task.columnId === columnId).length + 1
      }`,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTitle = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  };

  const deleteColumn = (id: Id) => {
    const newColumns = columns.filter((column) => column.id !== id);
    setColumns(newColumns);
  };

  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={styles}
        className="bg-secondary w-80 h-[500px] max-h-[500px] rounded-md flex flex-col opacity-50 border-2 border-teal-500/70"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={styles}
      className="bg-secondary w-80 h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-primary h-14 rounded-md cursor-grab p-3 font-bold border-secondary border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex-center bg-secondary px-2 py-1 text-sm rounded-full">
            0
          </div>
          {editMode ? (
            <input
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
              value={column.title}
              onChange={(e) => updateTitle(column.id, e.target.value)}
              className="bg-primary border rounded outline-none px-2 focus:border-teal-500"
            />
          ) : (
            <span>{column.title}</span>
          )}
        </div>
        <TrashIcon
          onClick={() => deleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-white hover:bg-secondary rounded px-1 py-2 duration-300"
        />
      </div>
      <div className="flex-grow overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          <TaskList
            tasks={tasks.filter((task) => task.columnId === column.id)}
          />
        </SortableContext>
      </div>
      <button
        onClick={() => addTask(column.id)}
        className="flex-center w-full hover:bg-primary p-2 border-secondary border-4 rounded-md gap-2 hover:text-teal-500 duration-300"
      >
        <PlusIcon />
        <span>Add Task</span>
      </button>
    </div>
  );
};
