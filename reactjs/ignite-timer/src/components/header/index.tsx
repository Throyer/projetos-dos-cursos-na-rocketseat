import { NavLink } from "react-router-dom"

import { Timer, Scroll } from "@phosphor-icons/react"

import * as Styles from "./styles"

import { logo } from "../../assets"

export const Header = () => {
  return (
    <Styles.Container>
      <img src={logo} />

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </Styles.Container>
  )
}