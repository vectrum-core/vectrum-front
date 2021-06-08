import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import * as S from "../../../../store/selectors";
import * as A from "../../../../store/actions";
import { api } from "../../../../store/configureStore";
import NumberFormat from 'react-number-format';


import { Card, Row, Col, Typography, Tag, Progress } from "antd";

import "./UserWalletTransactions.less";

const { Title, Paragraph } = Typography;



function UserWalletTransactions({ account }) {
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


  // TODO считать на бэке транзакции
  const [state, setState] = useState({ received: 100000, sended: 70000, });
  const { received, sended } = state;
  const sum = received + sended;


  const updateData = async () => {
    try {
      const res = {};//await api.?();
      if (res.ok) {
      }
    } catch (error) { console.error(error); }
  }

  useEffect(() => {
    try {
      updateData();
    } catch (error) { console.log(error); }
  }, [time]);

  return (
    <div className="user-wallet-block user-wallet-transactions">
      <Card size="small">
        <Row gutter={[0, { sm: 0, xs: 20 }]}>
          <Col span="12">
            <Title level={5} className="user-wallet-block-title">
              Транзакции
            </Title>
          </Col>

          <Col sm={6} span={12}>
            <div className="user-wallet-transactions-info">
              <Row gutter={[0, 25]}>
                <Col span={12}>
                  <Paragraph type="secondary" className="fs-14">
                    Всего транзакций
                  </Paragraph>

                  <Paragraph className="fs-24 typography-tag">
                    <NumberFormat
                      displayType='text' thousandSeparator
                      decimalScale={0} fixedDecimalScale={0}
                      value={sum} defaultValue='0'
                    />
                    <Tag>VTM</Tag>
                  </Paragraph>

                  <Paragraph type="secondary" className="fs-14">
                    за месяц
                  </Paragraph>
                </Col>

                <Col span={12}>
                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      Отправлено
                    </Paragraph>

                    <Paragraph className="fs-18">
                      <NumberFormat
                        displayType='text' thousandSeparator
                        decimalScale={0} fixedDecimalScale={0}
                        value={sended} defaultValue='0'
                      />
                    </Paragraph>
                  </div>

                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      Получено
                    </Paragraph>

                    <Paragraph className="fs-18">
                      <NumberFormat
                        displayType='text' thousandSeparator
                        decimalScale={0} fixedDecimalScale={0}
                        value={received} defaultValue='0'
                      />
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

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(UserWalletTransactions));
