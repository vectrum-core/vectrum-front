import React from "react";
import { hot } from "react-hot-loader";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import Dashboard from "./views/Dashboard/Dashboard";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import "./App.less";



function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={LandingPage} />

        <Route path="/dashboard" component={Dashboard} />

        <Route path="/buy" component={ErrorPage} />
        <Route path="/about" component={ErrorPage} />

        <Route path="/terms" component={ErrorPage} />
        <Route path="/privacy" component={ErrorPage} />

        <Route path="*" component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default hot(module)(App);
