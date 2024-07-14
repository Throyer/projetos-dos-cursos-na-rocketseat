import { PencilLine } from "@phosphor-icons/react";

import css from "./sidebar.module.css"

import { createStyles } from "../../utils/css-modules-utils"

const styles = createStyles(css);

const cover = "https://pbs.twimg.com/profile_banners/503553062/1505825395";

export const Sidebar = () => {
  return (
    <aside className={styles('sidebar')}>
      <img
        className={styles('cover')}
        src={cover}
      />

      <div className={styles('profile')}>
        <img src="https://github.com/throyer.png" />

        <strong>Renato Henrique</strong>
        <span>Desenvolvedor Senior.</span>
      </div>

      <footer>
        <a href="#editar">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}