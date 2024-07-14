import styles from "./header.module.css"
import { logo } from "../../assets"

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} />
    </header>
  )
}