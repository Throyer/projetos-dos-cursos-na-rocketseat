import React, { ComponentType, FC } from "react";
import { RouteProps as ReactRouteProps, Route as ReactRoute, Redirect } from "react-router-dom";
import { useSession } from "../hooks/session";

interface RouteProps extends ReactRouteProps {
    isPrvate?: boolean;
    component: ComponentType
}

const Route: FC<RouteProps> = ({ isPrvate = false, component: Component, ...rest }) => {

    const { user } = useSession();

    return (
        <ReactRoute
            {...rest}
            render={({ location }) => isPrvate === !!user ? (
                <Component />
            ) : (
                <Redirect to={{
                    pathname: isPrvate ? '/' : '/dashboard',
                    state: { from: location }
                }} />
            )}
        />
    );
}

export default Route;