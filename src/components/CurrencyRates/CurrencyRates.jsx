import React, { useState, useEffect } from "react";

import { Descriptions } from "antd";

import { TriangleUpIcon, TriangleDownIcon } from "../Icons/Icons";
import { api } from "../../store/configureStore";

import "./CurrencyRates.less";

const colors = {
  up: "#00CD71",
  down: "#FC4A1A",
};

export default function CurrencyRates() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    setTime(Date.now());
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 60 * 1000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  const [currencyRates, setCurrencyRates] = useState({
    VTM: { symbol: 'VTM', price: '0', upOrDown: 'up', upOrDownPercent: '0' },
    BTC: { symbol: 'BTC', price: '0', upOrDown: 'up', upOrDownPercent: '0' },
    ETH: { symbol: 'ETH', price: '0', upOrDown: 'up', upOrDownPercent: '0' },
  });
  const updateCurrencyRates = async () => {
    try {
      const res = await api.getCurrencyRates();
      if (res.ok)
        setCurrencyRates(res.result);
    } catch (error) { console.log(error); }
  }

  useEffect(() => {
    try {
      updateCurrencyRates();
    } catch (error) { console.log(error); }
  }, [time]);

  return (
    <div className="currency-rates">
      <Descriptions>
        <Descriptions.Item>
          <b>VTM</b>
        </Descriptions.Item>
        <Descriptions.Item className="ant-descriptions-item-centred">
          <b>${currencyRates['VTM'].price}</b>
        </Descriptions.Item>
        <Descriptions.Item>
          <div className="currency-rates-diff">
            {currencyRates['VTM'].upOrDown === 'up'
              ? <TriangleUpIcon style={{ color: colors.up }}></TriangleUpIcon>
              : <TriangleDownIcon style={{ color: colors.down }}></TriangleDownIcon>
            }
            <b>
              {currencyRates['VTM'].upOrDown === 'up' ? '+' : '-'}
              {currencyRates['VTM'].upOrDownPercent}%
            </b>
          </div>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions>
        <Descriptions.Item>BTC</Descriptions.Item>
        <Descriptions.Item className="ant-descriptions-item-centred">
          ${currencyRates['BTC'].price}
        </Descriptions.Item>
        <Descriptions.Item>
          <div className="currency-rates-diff">
            {currencyRates['BTC'].upOrDown === 'up'
              ? <TriangleUpIcon style={{ color: colors.up }}></TriangleUpIcon>
              : <TriangleDownIcon style={{ color: colors.down }}></TriangleDownIcon>
            }
            {currencyRates['BTC'].upOrDown === 'up' ? '+' : '-'}
            {currencyRates['BTC'].upOrDownPercent}%
          </div>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions>
        <Descriptions.Item>ETH</Descriptions.Item>
        <Descriptions.Item className="ant-descriptions-item-centred">
          ${currencyRates['ETH'].price}
        </Descriptions.Item>
        <Descriptions.Item>
          <div className="currency-rates-diff">
            {currencyRates['ETH'].upOrDown === 'up'
              ? <TriangleUpIcon style={{ color: colors.up }}></TriangleUpIcon>
              : <TriangleDownIcon style={{ color: colors.down }}></TriangleDownIcon>
            }
            {currencyRates['ETH'].upOrDown === 'up' ? '+' : '-'}
            {currencyRates['ETH'].upOrDownPercent}%
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
