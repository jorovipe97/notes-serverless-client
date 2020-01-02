import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import { Auth } from "aws-amplify";

// Collapse menu on react using boostrap: https://www.bennettnotes.com/bootstrap-navbar-collapse-reactjs/
function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  // https://serverless-stack.com/chapters/load-the-state-from-the-session.html
  // If we pass in an empty list of variables, then it’ll only run our function on the FIRST render.
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout(e) {
    e.preventDefault();
    // Removes the user session from local storage (AWS aplify saves)
    // session on localStorage
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  // The <></> or Fragment component can be thought of as a placeholder component. We need this because in the case the user is not logged in, we want to render two links. To do this we would need to wrap it inside a single component, like a div. But by using the Fragment component it tells React that the two links are inside this component but we don’t want to render any extra HTML.
  return (
    !isAuthenticating &&
    <div className="App container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Scratch</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {
              isAuthenticated
                ? <li className="nav-item">
                  <a className="btn nav-link" onClick={handleLogout}>Logout</a>
                </li>
                : <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
            }
          </ul>
        </div>
      </nav>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default withRouter(App);
