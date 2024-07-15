import css from "./header.module.css";

import { logo } from "../../assets";
import { createStyles } from "../../utils/css-modules-utils";

const styles = createStyles(css);

export const Header = () => {
  return (
    <header className={styles('header')}>
      <img src={logo} />
    </header>
  )
}