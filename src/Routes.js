import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoutes from './components/AppliedRoute';
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";

// We are also using the exact prop to ensure that it matches the / route exactly. This is because the path / will also match any route that starts with a /
export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoutes path="/" exact component={Home} appProps={appProps}/>
            <AppliedRoutes path="/login" exact component={Login} appProps={appProps}/>
            { /* Finally, catch all unmatched routes */}
            <Route component={NotFound} />
        </Switch>
    );
}