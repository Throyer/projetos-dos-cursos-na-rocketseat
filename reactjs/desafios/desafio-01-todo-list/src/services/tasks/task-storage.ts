import { createStorage } from "@utils/storage";
import { Task } from "./task";

const LOCAL_STORAGE_TASKS_KEY_VALUE = "todos@tasks";

const storage = createStorage<Task[]>(LOCAL_STORAGE_TASKS_KEY_VALUE, []);

const find = (): Task[] => {
  const tasks = storage.get();
  return tasks;
}

const create = (task: Task): void => {
  const tasks = storage.get();
  storage.set([task, ...tasks]);
}

const remove = (id: string): void => {
  const tasks = storage.get();
  storage.set([...tasks.filter(task => task.id !== id)]);
}

const update = (id: string, done: boolean): void => {
  const tasks = storage.get();
  storage.set([...tasks.map(task => {
    if (task.id === id) {
      task.done = done;
      return task;
    }
    return task;
  })]);
}

export {
  create, find, remove,
  update
};
