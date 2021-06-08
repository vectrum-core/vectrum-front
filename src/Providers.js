import React, { Suspense } from "react";
import { hot } from "react-hot-loader";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import localforage from "localforage";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { ConfigProvider } from "antd";
import { Chart, defaults } from "react-chartjs-2";
import ruRU from "antd/lib/locale/ru_RU";
import i18n from "./i18n";
import configureStore from "./store";
import { vectrumChain, appName } from "./constants";

import { UALProvider } from 'ual-reactjs-renderer';
import { Scatter } from 'ual-scatter';
import { Ledger } from 'ual-ledger';



localforage.config({
  name: "VECTRUM",
  version: 1.0,
  storeName: "keyValuePairs",
});


const config = {
  locale: ruRU,
};

defaults.doughnut.cutoutPercentage = 60;
defaults.global.elements.arc.borderWidth = 0;
defaults.line.maintainAspectRatio = false;
defaults.line.scales = {
  xAxes: [
    {
      gridLines: {
        display: false,
        drawBorder: false,
      },
    },
  ],
  yAxes: [
    {
      gridLines: {
        drawBorder: false,
        borderDash: [8, 4],
        color: "#D3D8DD",
        lineWidth: 1,
      },
      ticks: {
        fontFamily: "Roboto, sans-serif",
        lineHeight: 3,
      },
    },
  ],
};

Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      var ctx = chart.chart.ctx;

      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || "Roboto";
      var txt = `${centerConfig.text} в стейках`;
      var color = centerConfig.color || "#000";
      var maxFontSize = centerConfig.maxFontSize || 24;
      var sidePadding = centerConfig.sidePadding || 30;
      var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
      ctx.font = "24px " + fontStyle;

      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = chart.innerRadius * 2;

      var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      var minFontSize = centerConfig.minFontSize;
      var lineHeight = centerConfig.lineHeight || 25;
      var wrapText = false;

      if (minFontSize === undefined) {
        minFontSize = 24;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      var words = txt.split(" ");
      var line = "";
      var lines = [];

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = words[n] + " ";
        } else {
          line = testLine;
        }
      }

      centerY -= (lines.length / 2) * lineHeight;

      for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], centerX, centerY);
        centerY += lineHeight;
      }

      ctx.fillText(line, centerX, centerY);
    }
  },
});

// TODO
// import { withUAL } from 'ual-reactjs-renderer';
// https://github.com/EOSIO/ual-reactjs-renderer/blob/develop/examples/src/ButtonWebViewReact.tsx
const scatter = new Scatter([vectrumChain], { appName });
const ledger = new Ledger([vectrumChain]);


const { store, persistor } = configureStore();

const Providers = ({ children }) => {
  return (
    <Suspense fallback={null}>
      <UALProvider chains={[vectrumChain]} authenticators={[scatter, ledger]} appName={appName}>
        <StoreProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ConfigProvider {...config}>
              <I18nextProvider i18n={i18n}>
                <Router>
                  {children}
                </Router>
              </I18nextProvider>
            </ConfigProvider>
          </PersistGate>
        </StoreProvider>
      </UALProvider>
    </Suspense>
  );
}

export default hot(module)(Providers);
