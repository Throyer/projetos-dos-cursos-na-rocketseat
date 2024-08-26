import { Outlet } from "react-router-dom"

import * as Styles from "./styles"

import { Header } from "@components/header"

export const DefaultLayout = () => {
  return (
    <Styles.Container>
      <Header />
      <Outlet />
    </Styles.Container>
  )
}