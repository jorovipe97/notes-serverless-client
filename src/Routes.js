import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";

// We are also using the exact prop to ensure that it matches the / route exactly. This is because the path / will also match any route that starts with a /
export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            { /* Finally, catch all unmatched routes */}
            <Route component={NotFound} />
        </Switch>
    );
}