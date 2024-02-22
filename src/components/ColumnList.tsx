import React, { useMemo } from "react";
import { Column, Id, Task } from "../types";
import ColumnItem from "./ColumnItem";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

interface ColumnListProps {
  tasks: Task[];
  columns: Column[];
  createTask: (columnId: Id) => void;
  deleteColumn: (id: Id) => void;
  updateColumnTitle: (id: Id, title: string) => void;
}

const ColumnList: React.FC<ColumnListProps> = ({
  tasks,
  columns,
  deleteColumn,
  updateColumnTitle,
  createTask,
}) => {
  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );
  return (
    <SortableContext
      items={columnsIds}
      strategy={horizontalListSortingStrategy}
    >
      <div className="flex gap-4">
        {columns.map((column) => (
          <ColumnItem
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.columnId === column.id)}
            createTask={createTask}
            deleteColumn={deleteColumn}
            updateColumnTitle={updateColumnTitle}
          />
        ))}
      </div>
    </SortableContext>
  );
};

export default ColumnList;
