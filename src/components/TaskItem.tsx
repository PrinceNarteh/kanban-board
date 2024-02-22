import { TrashIcon } from "../icons";
import { Id, Task } from "../types";

interface TaskItemProps {
  task: Task;
  deleteTask: (id: Id) => void;
}

const TaskItem = ({ task, deleteTask }: TaskItemProps) => {
  return (
    <div className="group relative bg-primary p-2.5 h-24 min-h-24 items-center flex text-left rounded-xl border-secondary border-4 hover:ring-2 hover:ring-inset hover:ring-teal-500 cursor-grab">
      {task.content}
      <button
        onClick={() => deleteTask(task.id)}
        className="hidden stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-secondary p-2 opacity-60 hover:opacity-100 rounded-md group-hover:block"
      >
        <TrashIcon />
      </button>
    </div>
  );
};

export default TaskItem;
