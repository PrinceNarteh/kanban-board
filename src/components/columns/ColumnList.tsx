import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { AddColumnBtn, ColumnItem } from ".";
import { useAppState } from "../../hooks";
import { generateId } from "../../utils";
import { Column } from "../../types";

export const ColumnList = () => {
  const { columns, setColumns } = useAppState();
  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const addColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      title: `Column-${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  return (
    <SortableContext items={columnsIds}>
      <div className="flex gap-4">
        {columns.map((column) => (
          <ColumnItem key={column.id} column={column} />
        ))}
        <AddColumnBtn onClick={addColumn} />
      </div>
    </SortableContext>
  );
};
