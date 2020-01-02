import React from "react";
import { Route } from "react-router-dom";

export default function AppliedRoute({ component: C, appProps, ...rest }) {
    // <Route component> takes precedence over <Route render> so don’t use both in the same <Route>.
    return (
        <Route {...rest} render={props => <C {...props} {...appProps} />} />
    );
}