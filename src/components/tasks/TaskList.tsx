import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { TaskItem } from ".";
import { useAppState } from "../../hooks";
import { Id } from "../../types";
import { getPosition } from "../../utils";

export const TaskList = ({ columnId }: { columnId: Id }) => {
  const { tasks, setTasks, setActiveTask } = useAppState();
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
      <SortableContext items={tasksIds}>
        <div className="flex flex-col">
          {tasks
            .filter((task) => task.columnId === columnId)
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
