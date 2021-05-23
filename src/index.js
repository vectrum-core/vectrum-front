import React from "react";
import ReactDOM from "react-dom";
import { setConfig, AppContainer } from "react-hot-loader";
import Providers from "./Providers";
import App from "./App";
import "./i18n";
import "./assets/styles/style.less";



setConfig({
  reloadHooks: false,
});


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Providers>
        <Component />
      </Providers>
    </AppContainer>,
    document.getElementById("root"),
  );
};

render(App);

// webpack Hot Module Replacement API
if (module.hot) {
  // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
  // while `hot` would configure HMR for the CURRENT module
  module.hot.accept("./App", () => {
    // if you are using harmony modules ({modules:false})
    render(App);
    // in all other cases - re-require App manually
    render(require("./App"));
  });
}
