import { ButtonHTMLAttributes } from "react"

import { createStyles } from "../../utils/css-modules";

import css from "./button.module.scss";

const styles = createStyles(css);

export const Button = ({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={styles("container")} {...rest}>
      {children}
    </button>
  )
}
