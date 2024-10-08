import { NavLink } from "react-router-dom"
import { Timer, Scroll } from "@phosphor-icons/react"

import * as Styles from "./styles"

import { IGNITE_LOGO_SVG } from "@assets/ignite"


export const Header = () => {
  return (
    <Styles.Container>
      <img src={IGNITE_LOGO_SVG} />

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