import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
// Collapse menu on react using boostrap: https://www.bennettnotes.com/bootstrap-navbar-collapse-reactjs/
function App() {
  return (
    <div className="App container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Scratch</Link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes />
    </div>
  );
}

export default App;
