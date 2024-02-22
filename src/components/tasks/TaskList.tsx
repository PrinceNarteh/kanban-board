import { TaskItem } from ".";
import { useAppState } from "../../hooks";

export const TaskList = () => {
  const { tasks } = useAppState();
  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-auto">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
