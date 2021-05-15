import React from "react";
import { Link } from "react-router-dom";

import { Card, Typography, Button } from "antd";

import IconSuccess from "../../../../assets/images/icons/IconSuccess.svg";

import "./DashbordTradingExchangeResult.less";

const { Title, Text } = Typography;

export default function DashbordTradingExchangeResult() {
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
          Операция произведена <br />
          успешно!
        </Title>

        <Text>Перевод на адрес 1erF44g4sd5f</Text>
        <br />
        <Text>10,000 VTM</Text>

        <Text className="dashbord-trading-exchange-result-action-info fs-18">
          Нажмите на кнопку ниже для перехода в кошелёк
        </Text>

        <Link to="/dashboard">
          <Button type="primary" size="large">
            Мой кошелёк
          </Button>
        </Link>
      </Card>
    </div>
  );
}
