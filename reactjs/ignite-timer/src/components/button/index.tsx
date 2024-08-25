import { ButtonHTMLAttributes } from "react"

import * as Styles from "./styles"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Styles.Variant
}

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return <Styles.Container variant={variant} {...props}>Enviar</Styles.Container>
}