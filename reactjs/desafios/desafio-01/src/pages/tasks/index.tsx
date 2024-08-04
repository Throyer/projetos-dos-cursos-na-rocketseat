import { Form } from "./components/form";
import { Header } from "./components/header";

import { createStyles } from "../../utils/css-modules";

import css from "./tasks.module.scss";

import { Task } from "../../services/tasks/task";
import { Item } from "./components/item";
import { useState } from "react";
import { Empty } from "./components/empty";

const styles = createStyles(css);

interface TasksProps {
  tasks: Task[]
}

export const Tasks = ({ tasks: initialTasks }: TasksProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const doneTasks = tasks.filter(task => task.done).length;

  const handleChange = (id: string, isDone: boolean) => {
    setTasks(state => state.map(item => {
      if (item.id === id) {
        item.done = isDone;
        return item;
      }
      return item;
    }));
  }

  const handleRemove = (id: string) => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  }

  const handleCreate = (task: Task) => {
    setTasks(state => [...state, task])
  }

  return (
    <section className={styles("content")}>
      <Form onCreate={handleCreate} />
      <div className={styles("tasks")}>
        <Header total={tasks.length} done={doneTasks} />
        {Boolean(tasks.length) && (
          <div className={styles("items")}>
            {tasks.map(({ id, title, done: isDone }) => (
              <Item
                key={id}
                title={title}
                done={isDone}
                onChange={(state) => handleChange(id, state)}
                onRemove={() => handleRemove(id)}
              />
            ))}
          </div>
        )}

        {!Boolean(tasks.length) && (
          <Empty />
        )}
      </div>
    </section>
  )
}