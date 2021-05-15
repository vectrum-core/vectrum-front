import React from "react";
import { Link } from "react-router-dom";

import { Card, Row, Col, Typography, Form, Input, Select, Button } from "antd";

import IconSelectArrow from "../../../assets/images/icons/IconSelectArrow.svg";

import "./DashbordTradingExchange.less";

const { Title } = Typography;
const { Option } = Select;

const currencySelector = (
  <Form.Item name="prefix">
    <Select
      defaultValue="USD"
      suffixIcon={() => <img src={IconSelectArrow} alt="arrow" />}
    >
      <Option value="VTM">VTM</Option>
      <Option value="USD">USD</Option>
      <Option value="BTC">BTC</Option>
      <Option value="ETH">ETH</Option>
    </Select>
  </Form.Item>
);

export default function DashbordTradingExchange() {
  return (
    <div className="dashbord-trading-exchange">
      <Card bordered={false}>
        <Row
          gutter={[
            { xxl: 30, sm: 20 },
            { xl: 30, sm: 20, xs: 20 },
          ]}
        >
          <Col span={12}>
            <Title level={4}>Биржа</Title>
          </Col>

          <Col md={6} span={12}>
            <Card bordered={false}>
              <Col span={12}>
                <Title level={5}>Купить VTM</Title>

                <Form className="floating-label-form" layout="vertical">
                  <Form.Item label="Сколько VTM покупаем" name="amount-buy">
                    <Input addonBefore="VTM" size="large" allowClear></Input>
                  </Form.Item>

                  <Form.Item label="Какую монету тратим" name="currency-give">
                    <Input
                      addonBefore={currencySelector}
                      size="large"
                      allowClear
                    ></Input>
                  </Form.Item>

                  <Form.Item label="Введите адрес" name="address-buy">
                    <Input size="large" allowClear></Input>
                  </Form.Item>

                  <Form.Item className="form-action">
                    <Link to="/dashboard/trading-exchange/success">
                      <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        block
                      >
                        Купить VTM
                      </Button>
                    </Link>
                  </Form.Item>
                </Form>
              </Col>
            </Card>
          </Col>

          <Col md={6} span={12}>
            <Card bordered={false}>
              <Col span={12}>
                <Title level={5} type="secondary">
                  Продать VTM
                </Title>

                <Form className="floating-label-form" layout="vertical">
                  <Form.Item label="Сколько VTM продаете" name="amount-sell">
                    <Input addonBefore="VTM" size="large" allowClear></Input>
                  </Form.Item>

                  <Form.Item label="Какую монету получаем" name="currency-get">
                    <Input
                      addonBefore={currencySelector}
                      size="large"
                      allowClear
                    ></Input>
                  </Form.Item>

                  <Form.Item label="Введите адрес" name="address-sell">
                    <Input size="large" allowClear></Input>
                  </Form.Item>

                  <Form.Item className="form-action">
                    <Link to="/dashboard/trading-exchange/success">
                      <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        block
                        disabled
                      >
                        Продать VTM
                      </Button>
                    </Link>
                  </Form.Item>
                </Form>
              </Col>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
