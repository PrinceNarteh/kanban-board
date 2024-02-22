import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo } from "react";
import { useAppState } from "../hooks";
import ColumnItem from "./ColumnItem";

const ColumnList = () => {
  const { columns } = useAppState();
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
          <ColumnItem key={column.id} column={column} />
        ))}
      </div>
    </SortableContext>
  );
};

export default ColumnList;
