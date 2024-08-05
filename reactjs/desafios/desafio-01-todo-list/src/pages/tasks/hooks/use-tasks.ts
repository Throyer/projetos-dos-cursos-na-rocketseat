import { useState } from "react";
import { api, Task } from "@services/tasks";

export const useTasks = () => {
  const initialTasks = api.find();

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  
  const totalDoneTasks = tasks.filter(task => task.done).length;
  
  const update = (id: string, isDone: boolean) => {
    api.update(id, isDone)
    setTasks(state => state.map(item => {
      if (item.id === id) {
        item.done = isDone;
        return item;
      }
      return item;
    }));

  }
  
  const remove = (id: string) => {
    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return;
    }

    api.remove(id);
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }
  
  const create = (task: Task) => {
    api.create(task);
    setTasks(state => [task, ...state])
  }

  return {
    update,
    remove,
    create,
    totalDoneTasks,
    tasks
  }
}