import { Task } from "./task";
import { find, create, remove, update } from "./task-storage";

const api = {
  find, create, remove, update
}

export type {
  Task
}

export {
  api
}