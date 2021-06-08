import React, { useState, useEffect } from "react";
import NumberFormat from 'react-number-format';

import { Descriptions } from "antd";

import { TriangleUpIcon, TriangleDownIcon } from "../Icons/Icons";
import { api } from "../../store/configureStore";

import "./CurrencyRates.less";

const colors = {
  up: "#00CD71",
  down: "#FC4A1A",
};


const initRates = {
  VTM: { symbol: 'VTM', price: '0', upOrDown: 'up', upOrDownPercent: '0' },
  BTC: { symbol: 'BTC', price: '0', upOrDown: 'up', upOrDownPercent: '0' },
  ETH: { symbol: 'ETH', price: '0', upOrDown: 'up', upOrDownPercent: '0' },
};

export default function CurrencyRates() {
  const [time, setTime] = useState(0);
  const intervalMs = 60 * 1000;
  useEffect(() => {
    setTime(Date.now());
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, intervalMs);
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  const [currencyRates, setCurrencyRates] = useState(initRates);
  const updateCurrencyRates = async () => {
    try {
      const res = await api.getCurrencyRates();
      if (res.ok)
        setCurrencyRates(res.result);
      else
        setCurrencyRates(initRates);
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
          <b>
            <NumberFormat
              displayType='text' thousandSeparator
              decimalScale={2} fixedDecimalScale={2}
              value={currencyRates['VTM'].price} defaultValue='0'
              prefix={'$'}
            />
          </b>
        </Descriptions.Item>
        <Descriptions.Item>
          <div className="currency-rates-diff">
            {currencyRates['VTM'].upOrDown === 'up'
              ? <TriangleUpIcon style={{ color: colors.up }}></TriangleUpIcon>
              : <TriangleDownIcon style={{ color: colors.down }}></TriangleDownIcon>
            }
            <NumberFormat
              displayType='text' thousandSeparator
              decimalScale={2} fixedDecimalScale={2}
              value={currencyRates['VTM'].upOrDownPercent} defaultValue='0'
              suffix={'%'}
              prefix={currencyRates['VTM'].upOrDown === 'up' ? '+' : '-'}
            />
          </div>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions>
        <Descriptions.Item>BTC</Descriptions.Item>
        <Descriptions.Item className="ant-descriptions-item-centred">
          <NumberFormat
            displayType='text' thousandSeparator
            decimalScale={2} fixedDecimalScale={2}
            value={currencyRates['BTC'].price} defaultValue='0'
            prefix={'$'}
          />
        </Descriptions.Item>
        <Descriptions.Item>
          <div className="currency-rates-diff">
            {currencyRates['BTC'].upOrDown === 'up'
              ? <TriangleUpIcon style={{ color: colors.up }}></TriangleUpIcon>
              : <TriangleDownIcon style={{ color: colors.down }}></TriangleDownIcon>
            }
            <NumberFormat
              displayType='text' thousandSeparator
              decimalScale={2} fixedDecimalScale={2}
              value={currencyRates['BTC'].upOrDownPercent} defaultValue='0'
              suffix={'%'}
              prefix={currencyRates['BTC'].upOrDown === 'up' ? '+' : '-'}
            />
          </div>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions>
        <Descriptions.Item>ETH</Descriptions.Item>
        <Descriptions.Item className="ant-descriptions-item-centred">
          <NumberFormat
            displayType='text' thousandSeparator
            decimalScale={2} fixedDecimalScale={2}
            value={currencyRates['ETH'].price} defaultValue='0'
            prefix={'$'}
          />
        </Descriptions.Item>
        <Descriptions.Item>
          <div className="currency-rates-diff">
            {currencyRates['ETH'].upOrDown === 'up'
              ? <TriangleUpIcon style={{ color: colors.up }}></TriangleUpIcon>
              : <TriangleDownIcon style={{ color: colors.down }}></TriangleDownIcon>
            }
            <NumberFormat
              displayType='text' thousandSeparator
              decimalScale={2} fixedDecimalScale={2}
              value={currencyRates['ETH'].upOrDownPercent} defaultValue='0'
              suffix={'%'}
              prefix={currencyRates['ETH'].upOrDown === 'up' ? '+' : '-'}
            />
          </div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
