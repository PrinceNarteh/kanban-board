import React, { useMemo } from "react";
import { Column, Id } from "../types";
import ColumnItem from "./ColumnItem";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

interface ColumnListProps {
  columns: Column[];
  deleteColumn: (id: Id) => void;
  updateColumnTitle: (id: Id, title: string) => void;
}

const ColumnList: React.FC<ColumnListProps> = ({
  columns,
  deleteColumn,
  updateColumnTitle,
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
            deleteColumn={deleteColumn}
            updateColumnTitle={updateColumnTitle}
          />
        ))}
      </div>
    </SortableContext>
  );
};

export default ColumnList;
