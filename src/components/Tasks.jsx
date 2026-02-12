import { CheckIcon, ChevronRight, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks(props) {
  const navigate = useNavigate();

  function onSeeDetails(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);

    navigate(`/task-details?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {props.tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <Button
            onClick={() => props.onTaskClick(task.id)}
            className={`text-left bg-slate-400 w-full text-white p-2 flex gap-1 rounded-md ${task.isCompleted && "line-through"}`}
          >
            {task.title}
            {task.isCompleted && <CheckIcon />}
          </Button>

          <Button
            onClick={() => onSeeDetails(task)}
            className="bg-slate-400 text-white p-2 rounded-md"
          >
            <ChevronRight />
          </Button>

          <Button
            onClick={() => props.onTaskDelete(task.id)}
            className="bg-slate-400 text-white p-2 rounded-md"
          >
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}
export default Tasks;
