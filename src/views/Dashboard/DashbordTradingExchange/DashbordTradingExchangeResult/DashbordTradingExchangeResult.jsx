import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation, Trans } from "react-i18next";
import NumberFormat from 'react-number-format';
import { Link } from "react-router-dom";

import { Card, Typography, Button } from "antd";

import IconSuccess from "../../../../assets/images/icons/IconSuccess.svg";

import "./DashbordTradingExchangeResult.less";

const { Title, Text } = Typography;



function DashbordTradingExchangeResult(props = {}) { // TODO передача параметров в компанент
  const {
    amount, symbol, address, chain, txHash,
  } = {
    amount: 10000, symbol: 'VTM', address: 'vectrumgroup',
    chain: 'vectrum', txHash: '0x...',
  }; //props; 
  const { i18n, t } = useTranslation();

  return (
    <div className="dashbord-trading-exchange-result">
      <Card bordered={false}>
        <img
          src={IconSuccess}
          className="dashbord-trading-exchange-result-icon"
          width={70}
          alt="Success icon"
        />

        <Title className="dashbord-trading-exchange-result-title" level={3}>
          <Trans i18n={i18n}>
            Операция произведена <br />
            успешно!
          </Trans>
        </Title>

        <Text>
          {t("Перевод на адрес")}{' '}
          {address} {/* TODO как ссылка на нужный экесплорер на адрес */}
          {/* TODO ссылка на транзакцию в нужном эксплорере */}
        </Text>
        <br />
        <Text>
          <NumberFormat
            displayType='text' thousandSeparator
            value={amount} defaultValue='0'
            suffix={' ' + symbol}
          />
        </Text>

        <Text className="dashbord-trading-exchange-result-action-info fs-18">
          {t("Нажмите на кнопку ниже для перехода в кошелёк")}
        </Text>

        <Link to="/dashboard">
          <Button type="primary" size="large"
          >{t("Мой кошелёк")}</Button>
        </Link>
      </Card>
    </div>
  );
}

export default hot(module)(DashbordTradingExchangeResult);
