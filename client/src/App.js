import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AlertState from "./context/Alert/AlertState";
import AuthState from "./context/Auth/AuthState";
import ContactState from "./context/Contact/ContactState";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alerts";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/register";
import Login from "./components/auth/login";

import PrivateRoute from './components/routing/privateRoute'

import "./App.css";

import setAuthToken from './utils/setAuthToken'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute path="/" exact component={Home} />
                  <Route path="/about" exact component={About} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/login" exact component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
