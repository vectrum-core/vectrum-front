import React from "react";
import { Switch, Route } from "react-router-dom";

// Views
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

        <Route path="*" component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
