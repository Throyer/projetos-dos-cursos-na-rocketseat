import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from "react-router-dom"

import { Router } from "./router"

import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';

export const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>

    <GlobalStyle />
  </ThemeProvider>
);
