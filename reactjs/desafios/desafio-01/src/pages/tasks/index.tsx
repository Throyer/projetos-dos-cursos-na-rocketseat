import { Form } from "./components/form";
import { Header } from "./components/header";

import { createStyles } from "../../utils/css-modules";

import css from "./tasks.module.scss";

import { Task } from "../../services/tasks/task";
import { Item } from "./components/item";

const styles = createStyles(css);

interface TasksProps {
  tasks: Task[]
}

export const Tasks = ({ tasks }: TasksProps) => {
  return (
    <section className={styles("content")}>
      <Form />
      <div className={styles("tasks")}>
        <Header total={tasks.length} done={0} />
        {tasks.length && (
          <div className={styles("items")}>
            {tasks.map(({ id, title, done }) => (
              <Item key={id} title={title} done={done} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}