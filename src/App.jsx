import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import api from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const resposta = await api.get("/tasks");
      setTasks(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar as tarefas:", error);
    }
  };

  useEffect(() => {
    loadTasks();
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

  async function onAddTaskSubmit(title, description) {
    try{
      const response = await api.post("/tasks", { title, description });
      console.log(response.data);

      setTasks([...tasks, response.data]);

    }catch(error){
      console.error("Erro ao adicionar a tarefa:", error);
    }
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
