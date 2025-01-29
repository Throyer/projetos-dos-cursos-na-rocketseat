import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Hello</h1>
    </ThemeProvider>
  )
}
