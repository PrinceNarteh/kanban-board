import { useState } from "react";
import { Column } from "../types";
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

  return (
    <div className="m-auto flex w-full min-h-screen items-center overflow-x-auto px-10">
      <div className="mx-auto flex gap-4">
        <ColumnList columns={columns} />
        <AddColumnBtn onClick={addNewColumn} />
      </div>
    </div>
  );
};

export default KanbanBoard;
