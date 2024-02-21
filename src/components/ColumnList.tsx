import React from "react";
import { Column } from "../types";
import ColumnItem from "./ColumnItem";

interface ColumnListProps {
  columns: Column[];
}

const ColumnList: React.FC<ColumnListProps> = ({ columns }) => {
  return (
    <div className="flex gap-4">
      {columns.map((column) => (
        <ColumnItem key={column.id} column={column} />
      ))}
    </div>
  );
};

export default ColumnList;
