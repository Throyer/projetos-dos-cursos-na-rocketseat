import css from "./header.module.css";

import { logo } from "@assets/files";
import { createStyles } from "@utils/css-modules";

const styles = createStyles(css);

export const Header = () => {
  return (
    <header className={styles('header')}>
      <img src={logo} />
    </header>
  )
}