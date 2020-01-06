import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";
import NotFound from "./containers/NotFound";

// We are also using the exact prop to ensure that it matches the / route exactly. This is because the path / will also match any route that starts with a /
export default function Routes({ appProps }) {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} appProps={appProps} />
            <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
            <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
            <AuthenticatedRoute path="/notes/new" exact component={NewNote} appProps={appProps} />
            {/* By using the route path /notes/:id we are telling the router to send all
            matching routes to our component Notes. This will also end up matching the
            route /notes/new with an id of new. To ensure that doesn’t happen, we put
            our /notes/new route before the pattern matching one. */}
            <AuthenticatedRoute path="/notes/:id" exact component={Notes} appProps={appProps} />
            <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
            { /* Finally, catch all unmatched routes */}
            <Route component={NotFound} />
        </Switch>
    );
}