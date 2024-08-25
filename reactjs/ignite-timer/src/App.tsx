import { ThemeProvider } from "styled-components"
import { Button } from "./components/button"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="success" />
      <Button variant="danger" />
      <Button />
      
      <GlobalStyle />
    </ThemeProvider>
  )
}
