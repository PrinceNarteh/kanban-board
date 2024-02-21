import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { Column, Id } from "../types";
import { generateId, getPosition } from "../utils";
import AddColumnBtn from "./AddColumnBtn";
import ColumnList from "./ColumnList";
import ColumnItem from "./ColumnItem";
import { createPortal } from "react-dom";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

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

  const handleDragStart = (event: DragStartEvent) => {
    console.log("DRAG START", event);

    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;

    setColumns((columns) => {
      const currentPosition = getPosition(columns, active.id);
      const newPosition = getPosition(columns, over?.id);

      return arrayMove(columns, currentPosition, newPosition);
    });
  };

  return (
    <div className="m-auto flex w-full min-h-screen items-center overflow-x-auto px-10">
      <div className="mx-auto flex gap-4 items-center">
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <ColumnList columns={columns} deleteColumn={deleteColumn} />
          <AddColumnBtn onClick={addNewColumn} />
          {createPortal(
            <DragOverlay>
              {activeColumn ? (
                <ColumnItem column={activeColumn} deleteColumn={deleteColumn} />
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
