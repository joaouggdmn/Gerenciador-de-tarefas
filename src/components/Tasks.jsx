import { ChevronRight, TrashIcon } from "lucide-react";

function Tasks(props) {
  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {props.tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => props.onTaskClick(task.id)}
            className={`text-left bg-slate-400 w-full text-white p-2 rounded-md ${task.isCompleted && "line-through"}`}
          >
            {task.title}
          </button>

          <button className="bg-slate-400 text-white p-2 rounded-md">
            <ChevronRight />
          </button>
          <button
            onClick={() => props.onTaskDelete(task.id)}
            className="bg-slate-400 text-white p-2 rounded-md"
          >
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}
export default Tasks;
