import { Page } from "./page";
import { Task } from "./task";

import tasks from "../../fakes/tasks.json";

export const findAll = (): Page<Task> => {
  return {
    content: tasks,
    page: 0,
    size: 10,
    totalElements: 5,
    totalPages: 1
  }
}