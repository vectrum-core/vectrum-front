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

// 
function UserWalletTransactions({ account }) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 60 * 1000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);


  const [txList, setTxList] = useState([]);
  const updateTxList = async () => {
    try {
      const res = await api.vectrum.hyperion.get_transfers({ to: "ivannikovdev" });;
      console.log(res)
      if (!account) {
        if (res.actions.length > 0) {
          //setBalance(res[0].split(' ')[0]);
        }
      }
    } catch (error) {
      console.error(error);
      setTxList('0.0000');
    }
  }

  useEffect(() => {
    try {
      updateTxList();
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
                    5,125
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

                    <Paragraph className="fs-18">4,604</Paragraph>
                  </div>

                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      Получено
                    </Paragraph>

                    <Paragraph className="fs-18">658</Paragraph>
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
                percent={40}
              ></Progress>

              <Progress
                className="ant-progress-large"
                showInfo={false}
                strokeColor={{
                  "0%": "#2B332C",
                  "100%": "#199C6F",
                }}
                percent={60}
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
    account: S.profile.getAccount,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(UserWalletTransactions));
