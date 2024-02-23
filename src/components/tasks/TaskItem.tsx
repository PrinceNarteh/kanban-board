import { useState } from "react";
import { useAppState } from "../../hooks";
import { TrashIcon } from "../../icons";
import { Id, Task } from "../../types";

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { tasks, deleteTask, setTasks } = useAppState();
  const [editMode, setEditMode] = useState(false);

  const editTask = (id: Id, content: string) => {
    const newTask = tasks.map((taskItem) => {
      if (taskItem.id !== id) return taskItem;
      return {
        ...taskItem,
        content,
      };
    });
    setTasks(newTask);
  };

  return (
    <div
      onClick={() => setEditMode(true)}
      className="group relative bg-primary p-2.5 h-24 min-h-24 items-center flex text-left rounded-xl border-secondary border-4 hover:ring-2 hover:ring-inset hover:ring-teal-500 cursor-grab"
    >
      {editMode ? (
        <textarea
          onChange={(e) => editTask(task.id, e.target.value)}
          rows={3}
          className="w-full bg-transparent resize-none outline-none"
          onBlur={() => setEditMode(false)}
          value={task.content}
        ></textarea>
      ) : (
        <div>
          <p className="whitespace-pre-wrap h-[90%] overflow-x-auto overflow-y-auto">
            {task.content}
          </p>
          <TrashIcon
            onClick={() => deleteTask(task.id)}
            className="hidden stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-secondary p-2 opacity-60 hover:opacity-100 rounded-md group-hover:block"
          />
        </div>
      )}
    </div>
  );
};
