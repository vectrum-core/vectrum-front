import React from "react";

import { Descriptions } from "antd";

import { TriangleUpIcon, TriangleDownIcon } from "../Icons/Icons";

import "./CurrencyRates.less";

const colors = {
  up: "#00CD71",
  down: "#FC4A1A",
};

export default function CurrencyRates() {
  return (
    <div className="currency-rates">
      <Descriptions>
        <Descriptions.Item>
          <b>VTM</b>
        </Descriptions.Item>
        <Descriptions.Item className="ant-descriptions-item-centred">
          <b>$0.02</b>
        </Descriptions.Item>
        <Descriptions.Item>
          <div className="currency-rates-diff">
            <TriangleUpIcon style={{ color: colors.up }}></TriangleUpIcon>
            +100.00%
          </div>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions>
        <Descriptions.Item>BTC</Descriptions.Item>
        <Descriptions.Item className="ant-descriptions-item-centred">
          $1,656.10
        </Descriptions.Item>
        <Descriptions.Item>
          <div className="currency-rates-diff">
            <TriangleDownIcon style={{ color: colors.down }}></TriangleDownIcon>
            -99.99%
          </div>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions>
        <Descriptions.Item>ETH</Descriptions.Item>
        <Descriptions.Item className="ant-descriptions-item-centred">
          $37,625.00
        </Descriptions.Item>
        <Descriptions.Item>
          <div className="currency-rates-diff">
            <TriangleDownIcon style={{ color: colors.down }}></TriangleDownIcon>
            -1.11%
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
