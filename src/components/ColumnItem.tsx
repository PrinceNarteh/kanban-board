import React from "react";
import { Column } from "../types";

interface ColumnItemProps {
  column: Column;
}

const ColumnItem: React.FC<ColumnItemProps> = ({ column }) => {
  return <div>{column.title}</div>;
};

export default ColumnItem;
