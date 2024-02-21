import React from "react";
import { Column, Id } from "../types";
import { TrashIcon } from "../icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ColumnItemProps {
  column: Column;
  deleteColumn: (id: Id) => void;
}

const ColumnItem: React.FC<ColumnItemProps> = ({ column, deleteColumn }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id,
      data: {
        type: "Column",
        column,
      },
    });

  const styles = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={styles}
      className="bg-secondary w-80 h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-primary h-14 rounded-md cursor-grab p-3 font-bold border-secondary border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex-center bg-secondary px-2 py-1 text-sm rounded-full">
            0
          </div>
          {column.title}
        </div>
        <TrashIcon
          onClick={() => deleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-white hover:bg-secondary rounded px-1 py-2 duration-300"
        />
      </div>
      <div className="flex-grow">Content</div>
      <div>Footer</div>
    </div>
  );
};

export default ColumnItem;
