import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskItem } from ".";
import { useAppState } from "../../hooks";
import { useMemo } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { getPosition } from "../../utils";

export const TaskList = () => {
  const { tasks, setTasks } = useAppState();
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    const currentPosition = getPosition(tasks, active.id);
    const newPosition = getPosition(tasks, over?.id);
    const newArray = arrayMove(tasks, currentPosition, newPosition);
    setTasks(newArray);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
