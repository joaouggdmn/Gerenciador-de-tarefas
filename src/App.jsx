import { useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/tasks";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Estudar React",
      description:
        "Estudar os conceitos básicos de React, como componentes, props e estado.",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Fazer Exercícios",
      description:
        "Praticar os exercícios de React para reforçar o aprendizado.",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Criar Projeto",
      description:
        "Desenvolver um projeto simples utilizando React para aplicar os conhecimentos adquiridos.",
      isCompleted: false,
    },
  ]);

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

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px]">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          GERENCIADOR DE TAREFAS
        </h1>
        <AddTask />
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
