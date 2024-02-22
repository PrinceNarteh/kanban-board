import React, { useState } from "react";
import { Column, Id, Task } from "../types";
import { PlusIcon, TrashIcon } from "../icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ColumnItemProps {
  tasks: Task[];
  column: Column;
  createTask: (columnId: Id) => void;
  deleteColumn: (id: Id) => void;
  updateColumnTitle: (id: Id, title: string) => void;
}

const ColumnItem: React.FC<ColumnItemProps> = ({
  tasks,
  column,
  deleteColumn,
  updateColumnTitle,
  createTask,
}) => {
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
              onChange={(e) => updateColumnTitle(column.id, e.target.value)}
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
      <div className="flex-grow">
        {tasks.map((task) => (
          <p>{task.content}</p>
        ))}
      </div>
      <button
        onClick={() => createTask(column.id)}
        className="flex-center w-full hover:bg-primary p-2 border-secondary border-4 rounded-md gap-2 hover:text-teal-500 duration-300"
      >
        <PlusIcon />
        <span>Add Task</span>
      </button>
    </div>
  );
};

export default ColumnItem;
