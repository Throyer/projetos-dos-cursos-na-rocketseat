import { Outlet } from "react-router-dom"

import { Header } from "../../components/header"

import * as Styles from "./styles"

export const DefaultLayout = () => {
  return (
    <Styles.Container>
      <Header />
      <Outlet />
    </Styles.Container>
  )
}