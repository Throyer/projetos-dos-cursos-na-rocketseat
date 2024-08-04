import { createStyles } from "../../../../utils/css-modules";

import css from "./header.module.scss";

const styles = createStyles(css);

interface HeaderProps {
  total: number;
  done: number;
}

export const Header = ({ total, done }: HeaderProps) => {
  return (
    <header className={styles("container")}>
      <aside>
        <p>Tarefas criadas</p>
        <span>{total}</span>
      </aside>

      <aside>
        <p>Concluídas</p>
        <span>{done} de {total}</span>
      </aside>
    </header>
  )
}