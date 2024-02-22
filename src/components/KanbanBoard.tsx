import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useAppState } from "../hooks";
import { Column } from "../types";
import { generateId, getPosition } from "../utils";
import AddColumnBtn from "./columns/AddColumnBtn";
import ColumnItem from "./columns/ColumnItem";
import ColumnList from "./columns/ColumnList";

const KanbanBoard = () => {
  const { columns, setColumns } = useAppState();
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const addColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      title: `Column-${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;

    const currentPosition = getPosition(columns, active.id);
    const newPosition = getPosition(columns, over?.id);

    const newColumns = arrayMove(columns, currentPosition, newPosition);

    setColumns(newColumns);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="m-auto flex w-full min-h-screen items-center overflow-x-auto px-10">
      <div className="mx-auto flex gap-4 items-center">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <ColumnList />
          <AddColumnBtn onClick={addColumn} />
          {createPortal(
            <DragOverlay>
              {activeColumn ? <ColumnItem column={activeColumn} /> : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
