import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Chart, defaults } from "react-chartjs-2";

import ruRU from "antd/lib/locale/ru_RU";

import App from "./App";

import "./assets/styles/style.less";

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

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider {...config}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
