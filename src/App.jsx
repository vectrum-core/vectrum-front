import React from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { Switch, Route, Redirect } from "react-router-dom";

import LandingPage from "./views/LandingPage/LandingPage";
import Dashboard from "./views/Dashboard/Dashboard";

import AboutPage from "./views/AboutPage/AboutPage";
import BuyPage from "./views/BuyPage/BuyPage";
import DocsPage from "./views/DocsPage/DocsPage";
import ExplorerPage from "./views/ExplorerPage/ExplorerPage";
import FaqPage from "./views/FaqPage/FaqPage";

import TermsPage from "./views/TermsPage/TermsPage";
import PrivacyPage from "./views/PrivacyPage/PrivacyPage";

import ErrorPage from "./views/ErrorPage/ErrorPage";
import * as S from "./store/selectors";
import "./App.less";



function App(props) {
  const { isAuthenticated } = props;

  // TODO дашборд только если вошел
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Redirect to="/dashboard" /> : <LandingPage />}
        </Route>
        <Route path="/dashboard" component={Dashboard} />

        <Route path="/about" component={AboutPage} />
        <Route path="/buy" component={BuyPage} />
        <Route path="/docs" component={DocsPage} />
        <Route path="/explorer" component={ExplorerPage} />
        <Route path="/faq" component={FaqPage} />

        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />

        <Route path="*" component={ErrorPage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: S.profile.isAuthenticated(state),
  };
}

export default connect(mapStateToProps)(hot(module)(App));
