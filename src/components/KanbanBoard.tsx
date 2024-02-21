import { useState } from "react";
import { Column, Id } from "../types";
import { generateId } from "../utils";
import AddColumnBtn from "./AddColumnBtn";
import ColumnList from "./ColumnList";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const addNewColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      title: `Column-${columns.length + 1}`,
    };

    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (id: Id) => {
    const newColumns = columns.filter((column) => column.id !== id);
    setColumns(newColumns);
  };

  return (
    <div className="m-auto flex w-full min-h-screen items-center overflow-x-auto px-10">
      <div className="mx-auto flex gap-4 items-center">
        <ColumnList columns={columns} deleteColumn={deleteColumn} />
        <AddColumnBtn onClick={addNewColumn} />
      </div>
    </div>
  );
};

export default KanbanBoard;
