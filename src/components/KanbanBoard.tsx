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
import { Column, Id, Task } from "../types";
import { generateId, getPosition } from "../utils";
import AddColumnBtn from "./AddColumnBtn";
import ColumnList from "./ColumnList";
import ColumnItem from "./ColumnItem";
import { createPortal } from "react-dom";
import { useAppState } from "../hooks";

const KanbanBoard = () => {
  const { columns } = useAppState();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      columnId,
      id: generateId(),
      content: `Task ${
        tasks.filter((task) => task.columnId === columnId).length + 1
      }`,
    };

    setTasks([...tasks, newTask]);
  };

  const handleDragStart = (event: DragStartEvent) => {
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
          <ColumnList
            createTask={createTask}
            columns={columns}
            deleteColumn={deleteColumn}
            updateColumnTitle={updateColumnTitle}
            tasks={tasks}
          />
          <AddColumnBtn onClick={addNewColumn} />
          {createPortal(
            <DragOverlay>
              {activeColumn ? (
                <ColumnItem
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                  createTask={createTask}
                  column={activeColumn}
                  deleteColumn={deleteColumn}
                  updateColumnTitle={updateColumnTitle}
                />
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
