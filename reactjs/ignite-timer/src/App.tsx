import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"

import { Router } from "./router"

import { GlobalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"
import { CyclesProvider } from "./contexts/cycles"

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </BrowserRouter>
      
      <GlobalStyle />
    </ThemeProvider>
  )
}
