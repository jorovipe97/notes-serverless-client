import React from "react";
import { Route, Redirect } from "react-router-dom";
/**
 * Redirects to login if user is visiting a page without
 * being authenticated:
 * eg: dashboard, notes, etc.
 * @param {*} param0 
 */
export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    return (
        <Route
            // path, exact, etc props
            {...rest}
            render={(props) => {
                // console.log(`${props.location.pathname} - ${props.location
                //     .search}`);
                // The render prop function has access to all the same route props (match, location and history)
                return appProps.isAuthenticated
                    ? <C {...props} {...appProps} />
                    : <Redirect
                        to={`/login?redirect=${props.location.pathname}${props.location
                            .search}`}
                    />}}
        />
    );
}