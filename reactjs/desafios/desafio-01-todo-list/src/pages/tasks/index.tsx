import { createStyles } from "@utils/css-modules";

import { Form } from "./components/form";
import { Header } from "./components/header";
import { Item } from "./components/item";
import { Empty } from "./components/empty";

import { useTasks } from "./hooks/use-tasks";

import css from "./tasks.module.scss";

const styles = createStyles(css);

export const Tasks = () => {
  const {
    tasks,
    totalDoneTasks,
    update,
    remove,
    create
  } = useTasks();

  return (
    <section className={styles("content")}>
      <Form onCreate={create} />
      <div className={styles("tasks")}>
        <Header total={tasks.length} done={totalDoneTasks} />
        
        {Boolean(tasks.length) && (
          <div className={styles("items")}>
            {tasks.map(({ id, title, done: isDone }) => (
              <Item
                key={id}
                title={title}
                done={isDone}
                onChange={(state) => update(id, state)}
                onRemove={() => remove(id)}
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