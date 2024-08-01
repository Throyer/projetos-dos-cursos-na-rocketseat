import { InputHTMLAttributes } from "react";

import { createStyles } from "../../utils/css-modules";

import css from "./input.module.scss";

const styles = createStyles(css);

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={styles('input')} {...props} />
}