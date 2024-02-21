import React from "react";
import { Column, Id } from "../types";
import ColumnItem from "./ColumnItem";

interface ColumnListProps {
  columns: Column[];
  deleteColumn: (id: Id) => void;
}

const ColumnList: React.FC<ColumnListProps> = ({ columns, deleteColumn }) => {
  return (
    <div className="flex gap-4">
      {columns.map((column) => (
        <ColumnItem
          key={column.id}
          column={column}
          deleteColumn={deleteColumn}
        />
      ))}
    </div>
  );
};

export default ColumnList;
