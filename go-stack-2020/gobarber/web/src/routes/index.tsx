import React, { FC } from "react";
import { Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Route from "./Route";

const Routes: FC = () => (
    <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />

        <Route path="/dashboard" component={Dashboard} isPrvate />
    </Switch>
)

export default Routes;

