import { clipboard } from "@assets/files";
import { createStyles } from "@utils/css-modules";

import css from "./empty.module.scss";

const styles = createStyles(css);

export const Empty = () => (
  <div className={styles("container")}>
    <img src={clipboard} alt="ícone de prancheta" />
    <p>
      <strong>Você ainda não tem tarefas cadastradas</strong>
      Crie tarefas e organize seus itens a fazer
    </p>
  </div>
)