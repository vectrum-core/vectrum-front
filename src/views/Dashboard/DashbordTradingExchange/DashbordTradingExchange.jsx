import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";
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



function DashbordTradingExchange() {
  const { t } = useTranslation();
  // TODO получение рейтов
  /* TODO это внешний кошелек
     - как вариант https://pancakeswap.finance/ в BSC за USDT
     - при покупке,
       нужно выдавать адрес куда отправлять оплату (мерчант),
       фиксировать поступление оплаты (мерчант),
       и начислять на аккаунт получателя в блокчейне VECTRUM
     - при продаже,
       выдать пользователю аккаунт куда отправить VTM,
       фиксировать что транзакция подтверждена
       отправить средства на адрес пользователя
  */
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
            <Title level={4}>{t('Биржа')}</Title>
          </Col>

          <Col md={6} span={12}>
            <Card bordered={false}>
              <Col span={12}>
                <Title level={5}>{t('Купить VTM')}</Title>

                <Form className="floating-label-form" layout="vertical">
                  <Form.Item label={t("Сколько VTM покупаем")} name="amount-buy">
                    <Input addonBefore="VTM" size="large" allowClear />
                  </Form.Item>

                  <Form.Item label={t("Какую монету тратим")} name="currency-give">
                    <Input
                      addonBefore={currencySelector}
                      size="large"
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item label={t("Введите адрес")} name="address-buy">
                    <Input size="large" allowClear />
                  </Form.Item>

                  <Form.Item className="form-action">
                    <Link to="/dashboard/trading-exchange/success">
                      <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        block
                      >{t("Купить VTM")}</Button>
                    </Link>
                  </Form.Item>
                </Form>
              </Col>
            </Card>
          </Col>

          <Col md={6} span={12}>
            <Card bordered={false}>
              <Col span={12}>
                <Title level={5} type="secondary">{t("Продать VTM")}</Title>

                <Form className="floating-label-form" layout="vertical">
                  <Form.Item label={t("Сколько VTM продаете")} name="amount-sell">
                    <Input addonBefore="VTM" size="large" allowClear />
                  </Form.Item>

                  <Form.Item label={t("Какую монету получаем")} name="currency-get">
                    <Input
                      addonBefore={currencySelector}
                      size="large"
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item label={t("Введите адрес")} name="address-sell">
                    <Input size="large" allowClear />
                  </Form.Item>

                  <Form.Item className="form-action">
                    <Link to="/dashboard/trading-exchange/success">
                      <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        block
                        disabled
                      >{t("Продать VTM")}</Button>
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

export default hot(module)(DashbordTradingExchange);
