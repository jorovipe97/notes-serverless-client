import React from "react";
import { Route, Redirect } from "react-router-dom";

// This method takes the querystring param we want to read and returns it.
function querystring(name, url = window.location.href) {
    name = name.replace(/[[]]/g, "\\$&");

    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return "";
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Redirects to / if user is visiting a page being
 * authenticated example: login, or signup
 * @param {*} param0 
 */
export default function UnauthenticatedRoute({ component: C, appProps, ...rest }) {
    const redirect = querystring("redirect");
    return (
        <Route
            {...rest}
            render={props =>
                !appProps.isAuthenticated
                    ? <C {...props} {...appProps} />
                    : <Redirect to={redirect == '' || redirect == null? '/' : redirect} />}
        />
    );
}