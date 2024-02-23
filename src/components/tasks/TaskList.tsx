import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskItem } from ".";
import { useAppState } from "../../hooks";
import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { getPosition } from "../../utils";
import { Task } from "../../types";
import { createPortal } from "react-dom";

export const TaskList = () => {
  const { tasks, setTasks } = useAppState();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const handleDragStart = (evt: DragStartEvent) => {
    if (evt.active.data.current?.type === "Task") {
      setActiveTask(evt.active.data.current.task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    const currentPosition = getPosition(tasks, active.id);
    const newPosition = getPosition(tasks, over?.id);
    const newArray = arrayMove(tasks, currentPosition, newPosition);
    setTasks(newArray);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        {createPortal(
          <DragOverlay>
            {activeTask ? <TaskItem task={activeTask} /> : null}
          </DragOverlay>,
          document.body
        )}
      </SortableContext>
    </DndContext>
  );
};
