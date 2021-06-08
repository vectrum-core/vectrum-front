import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import * as S from "../../../../store/selectors";
import * as A from "../../../../store/actions";
import { api } from "../../../../store/configureStore";
import NumberFormat from 'react-number-format';

import { Card, Row, Col, Typography, Tag, Progress } from "antd";

import "./UserWalletIncome.less";

const { Title, Paragraph } = Typography;



function UserWalletIncome({
  account,
}) {
  const { t } = useTranslation();

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

  // TODO считать на бэке оборот
  const [state, setState] = useState({ received: 100000, sended: 70000, });
  const { received, sended } = state;
  const sum = received + sended;

  const updateStats = async () => {
    if (!account) return;
    try {
      const res = {};//await api.?(account);
      if (res.ok) {
      }
    } catch (error) { console.error(error); }
  }

  // TODO забирать на бэке прайсы
  const [price, setPrice] = useState(0.02);
  const updateRates = async () => {
    try {
      const res = {};//await api.?();
      if (res.ok) {
      }
    } catch (error) { console.error(error); }
  }

  useEffect(() => {
    try {
      updateRates();
      updateStats();
    } catch (error) { console.log(error); }
  }, [time]);

  return (
    <div className="user-wallet-block user-wallet-income">
      <Card size="small">
        <Row gutter={[0, { sm: 0, xs: 20 }]}>
          <Col span="12">
            <Title level={5} className="user-wallet-block-title">
              Поступления
            </Title>
          </Col>

          <Col sm={6} span={12}>
            <div className="user-wallet-income-info">
              <Row gutter={[0, 25]}>
                <Col span={12}>
                  <Paragraph type="secondary" className="fs-14">
                    Оборот по счету
                  </Paragraph>

                  <Paragraph className="fs-24 typography-tag">
                    <NumberFormat
                      displayType='text' thousandSeparator
                      decimalScale={0} fixedDecimalScale={0}
                      value={sum} defaultValue='0'
                    />
                    <Tag>VTM</Tag>
                  </Paragraph>

                  <Paragraph type="secondary" className="fs-14 typography-tag">
                    <NumberFormat
                      displayType='text' thousandSeparator
                      decimalScale={0} fixedDecimalScale={0}
                      value={sum * price} defaultValue='0'
                    />
                    <Tag>USD</Tag>
                  </Paragraph>
                </Col>

                <Col span={12}>
                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      Отправлено
                    </Paragraph>

                    <Paragraph className="fs-18 typography-tag">
                      <NumberFormat
                        displayType='text' thousandSeparator
                        decimalScale={0} fixedDecimalScale={0}
                        value={sended} defaultValue='0'
                      />
                      <Tag>VTM</Tag>
                    </Paragraph>
                  </div>

                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      Получено
                    </Paragraph>

                    <Paragraph className="fs-18 typography-tag">
                      <NumberFormat
                        displayType='text' thousandSeparator
                        decimalScale={0} fixedDecimalScale={0}
                        value={received} defaultValue='0'
                      />
                      <Tag>VTM</Tag>
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col sm={6} span={12}>
            <div className="user-wallet-block-progress-wrapper">
              <Progress
                className="ant-progress-large"
                showInfo={false}
                strokeColor={{
                  "0%": "#FC4A1A",
                  "100%": "#F7B733",
                }}
                percent={sended / sum * 100}
              ></Progress>

              <Progress
                className="ant-progress-large"
                showInfo={false}
                strokeColor={{
                  "0%": "#2B332C",
                  "100%": "#199C6F",
                }}
                percent={received / sum * 100}
              ></Progress>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    account: S.profile.getAccount(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(UserWalletIncome));
