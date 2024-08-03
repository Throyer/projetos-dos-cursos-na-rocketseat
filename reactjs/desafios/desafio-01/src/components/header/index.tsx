import { logo } from "../../assets";
import { createStyles } from "../../utils/css-modules";

import css from "./header.module.scss";

const styles = createStyles(css);

export const Header = () => {
  return (
    <header className={styles('header')}>
      <img src={logo} />
    </header>
  )
}