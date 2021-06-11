import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import * as S from "../../../../store/selectors";
import * as A from "../../../../store/actions";
import { api } from "../../../../store/configureStore";
import NumberFormat from 'react-number-format';

import { Card, Row, Col, Typography, Tag } from "antd";
import { Doughnut } from "react-chartjs-2";

import "./UserWalletProfit.less";

const { Title, Paragraph } = Typography;



function UserWalletProfit({
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

  // TODO забирать данные по доходу с бэка
  const [state, setState] = useState({ stakeRewards: 100000, bonusRewards: 200000, });
  const { stakeRewards, bonusRewards } = state;
  const sum = stakeRewards + bonusRewards;
  let stakedPercent = '0';
  if (sum > 0) {
    stakedPercent = (stakeRewards / sum * 100).toFixed(0);
  }

  const updateData = async () => {
    try {
      const res = {};//await api.?();
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
      updateData();
    } catch (error) { console.log(error); }
  }, [time]);


  const chartData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradientGreen = ctx.createLinearGradient(0, 0, 0, 100);
    const gradientOrange = ctx.createLinearGradient(0, 0, 60, 100);

    gradientGreen.addColorStop(0, "#2B332C");
    gradientGreen.addColorStop(1, "#199C6F");

    gradientOrange.addColorStop(0, "#FC4A1A");
    gradientOrange.addColorStop(1, "#F7B733");

    return {
      labels: [t("Свободно"), t("В стейках")],
      datasets: [
        {
          data: [bonusRewards, stakeRewards],
          backgroundColor: [gradientGreen, gradientOrange],
          hoverBackgroundColor: [gradientGreen, gradientOrange],
        },
      ],
    };
  };

  return (
    <div className="user-wallet-block user-wallet-profit">
      <Card size="small">
        <Row align="bottom" gutter={[0, { sm: 0, xs: 20 }]}>
          <Col span="12">
            <Title level={5} className="user-wallet-block-title">
              Доход
            </Title>
          </Col>

          <Col sm={6} span={12}>
            <div className="user-wallet-profit-info">
              <Row gutter={[0, 25]}>
                <Col span={12}>
                  <Paragraph type="secondary" className="fs-14">
                    Текущий доход
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
                      Стейкинг
                    </Paragraph>

                    <Paragraph className="fs-18 typography-tag">
                      <NumberFormat
                        displayType='text' thousandSeparator
                        decimalScale={0} fixedDecimalScale={0}
                        value={stakeRewards} defaultValue='0'
                      />
                      <Tag>VTM</Tag>
                    </Paragraph>
                  </div>

                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      Бонусная программа
                    </Paragraph>

                    <Paragraph className="fs-18 typography-tag">
                      <NumberFormat
                        displayType='text' thousandSeparator
                        decimalScale={0} fixedDecimalScale={0}
                        value={bonusRewards} defaultValue='0'
                      />
                      <Tag>VTM</Tag>
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          <Col sm={6} span={12}>
            <div className="user-wallet-block-doughnut">
              <Doughnut
                id="user-wallet-profit-chart"
                width={100}
                height={100}
                data={chartData}
                legend={{ display: false }}
                options={{
                  elements: {
                    center: {
                      text: stakedPercent + '%',
                      fontStyle: "Roboto",
                      sidePadding: 30,
                      minFontSize: 18,
                      lineHeight: 25,
                    },
                  },
                }}
              ></Doughnut>
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

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(UserWalletProfit));
