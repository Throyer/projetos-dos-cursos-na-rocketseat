import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"

import { Router } from "./router"

import { GlobalStyle } from "./styles/global"
import { defaultTheme } from "./styles/themes/default"

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      
      <GlobalStyle />
    </ThemeProvider>
  )
}
