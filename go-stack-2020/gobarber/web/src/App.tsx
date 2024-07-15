import React, { FC } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Providers from './hooks';
import Routes from './routes';

import GlobalStyle from "./styles/global";

const App: FC = () => (
    <Router>
        <Providers>
            <Routes />
        </Providers>

        <GlobalStyle />
    </Router>
);

export default App;
