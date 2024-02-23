import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { ColumnItem } from ".";
import { useAppState } from "../../hooks";

export const ColumnList = () => {
  const { columns } = useAppState();
  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  return (
    <SortableContext items={columnsIds}>
      <div className="flex gap-4">
        {columns.map((column) => (
          <ColumnItem key={column.id} column={column} />
        ))}
      </div>
    </SortableContext>
  );
};
