import { Header } from "./components/header"
import { TaskForm } from "./components/task-form"
import { createStyles } from "./utils/css-modules"

import css from "./app.module.scss";

const styles = createStyles(css)

export const App = () => {
  return (
    <div className={styles('app')}>
      <Header />
      <main>
        <TaskForm />
        <div>
          <div>
            <strong>Tarefas criadas</strong>
            <span>5</span>            
          </div>
          <div>
            <strong>Concluidas</strong>
            <span>2 de 5</span>
          </div>
        </div>
        <ul>
          <li>
            <input type="checkbox" name="checket" />
            <p>description</p>
            <button>trash</button>
          </li>
        </ul>
      </main>
    </div>
  )
}
