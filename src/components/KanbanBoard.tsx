import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
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
import { Column, Task } from "../types";
import { generateId, getPosition } from "../utils";
import { AddColumnBtn, ColumnItem, ColumnList } from "./columns";
import { TaskItem } from "./tasks";

const KanbanBoard = () => {
  const { columns, tasks, setColumns, setTasks } = useAppState();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
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

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const handleDragover = (evt: DragOverEvent) => {
    const { active, over } = evt;
    const activeId = active.id;
    const overId = over?.id;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over?.data.current?.type === "Task";

    if (!overId || !isActiveTask || activeId === overId) return;

    if (isActiveTask && isOverTask) {
      const activeIndex = getPosition(tasks, activeId);
      const overIndex = getPosition(tasks, overId);
      tasks[activeIndex].columnId === tasks[overIndex].columnId;
      setTasks(arrayMove(tasks, activeIndex, overIndex));
    }

    const isOverColumn = over.data.current?.type === "Column";
    if (isActiveTask && isOverColumn) {
      const activeIndex = getPosition(tasks, activeId);
      tasks[activeIndex].columnId === overId;
      setTasks(arrayMove(tasks, activeIndex, activeIndex));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    const currentPosition = getPosition(columns, active.id);
    const newPosition = getPosition(columns, over?.id);
    setColumns(arrayMove(columns, currentPosition, newPosition));
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
          onDragOver={handleDragover}
        >
          <ColumnList />
          <AddColumnBtn onClick={addColumn} />
          {createPortal(
            <DragOverlay>
              {activeColumn && <ColumnItem column={activeColumn} />}
              {activeTask && <TaskItem task={activeTask} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
