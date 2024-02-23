import { TaskItem } from ".";
import { Task } from "../../types";

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
  console.log(tasks);

  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
