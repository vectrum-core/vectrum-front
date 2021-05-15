import React from "react";

import { Card, Row, Col, Typography, Select } from "antd";
import UserWalletBalance from "./UserWalletBalance/UserWalletBalance";
import UserWalletIncome from "./UserWalletIncome/UserWalletIncome";
import UserWalletProfit from "./UserWalletProfit/UserWalletProfit";
import UserWalletTransactions from "./UserWalletTransactions/UserWalletTransactions";

import IconSelectArrow from "../../../assets/images/icons/IconSelectArrow.svg";

import "./UserWallet.less";

const { Title } = Typography;
const { Option } = Select;

export default function UserWallet() {
  return (
    <div className="user-wallet">
      <Card bordered={false}>
        <Row
          gutter={[
            { xxl: 30, sm: 20, xs: 20 },
            { xxl: 30, sm: 20, xs: 20 },
          ]}
        >
          <Col sm={6} xs={12}>
            <Title level={4} className="user-wallet-title">
              Мой кошелёк
            </Title>
          </Col>

          <Col sm={6} xs={12}>
            <div className="user-wallet-filter">
              <Select
                defaultValue="Сегодня"
                size="small"
                suffixIcon={() => <img src={IconSelectArrow} alt="arrow" />}
              >
                <Option value="Сегодня">Сегодня</Option>
                <Option value="Неделя">Неделя</Option>
                <Option value="Месяц">Месяц</Option>
                <Option value="Год">Год</Option>
                <Option value="c">За все время</Option>
              </Select>

              <Select
                defaultValue="VTM"
                size="small"
                suffixIcon={() => <img src={IconSelectArrow} alt="arrow" />}
              >
                <Option value="VTM">VTM</Option>
                <Option value="USD">USD</Option>
                <Option value="BTC">BTC</Option>
                <Option value="ETH">ETH</Option>
              </Select>
            </div>
          </Col>

          <Col md={6} span={12}>
            <UserWalletBalance></UserWalletBalance>
          </Col>

          <Col md={6} span={12}>
            <UserWalletIncome></UserWalletIncome>
          </Col>

          <Col md={6} span={12}>
            <UserWalletProfit></UserWalletProfit>
          </Col>

          <Col md={6} span={12}>
            <UserWalletTransactions></UserWalletTransactions>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
