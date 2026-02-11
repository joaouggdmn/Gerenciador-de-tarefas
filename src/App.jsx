import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/tasks";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  useEffect(
    () => localStorage.setItem("tasks", JSON.stringify(tasks)),
    [tasks],
  );

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        { method: "GET" },
      );
      const data = await response.json();
      setTasks(data);
    }
    if (tasks.length === 0) {
      fetchTasks();
    }
  }, []);

  //ATUALIZA O ESTADO DE UMA TAREFA
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //PRECISO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      //NAO PRECISO ATUALIZAR ESSA TAREFA
      return task;
    });

    setTasks(newTasks);
  }

  function onTaskDelete(taskId) {
    //Para alterar o número de elementos de um array não usamos .map()
    const newTasks = tasks.filter((task) => task.id !== taskId); //pega os elementos que sao diferentes da tarefa deletada e joga para um novo array
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="min-h-screen min-w-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          GERENCIADOR DE TAREFAS
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onTaskDelete={onTaskDelete}
        />
      </div>
    </div>
  );
}

export default App;
