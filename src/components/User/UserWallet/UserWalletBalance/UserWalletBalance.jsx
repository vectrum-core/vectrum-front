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

import "./UserWalletBalance.less";

const { Title, Paragraph } = Typography;



function UserWalletBalance({
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


  const [balance, setBalance] = useState(0);
  const updateBalance = async () => {
    if (!account) return;
    try {
      const res = await api.vectrum.rpc.get_currency_balance('eosio.token', account, 'VTM');
      if (res.length > 0) {
        setBalance(parseInt(res[0].split(' ')[0]));
      }
    } catch (error) { console.error(error); }
  }


  const [staked, setStaked] = useState(0);
  const updateStaked = async () => {
    if (!account) return;
    try {
      const res = await api.vectrum.rpc.get_account(account);
      if (res.voter_info) {
        setStaked(parseInt(res.voter_info.staked) / 1000);
      }
    } catch (error) { console.error(error); }
  }
  const sum = balance + staked;
  let stakedPercent = '0';
  if (sum > 0) {
    stakedPercent = (staked / sum * 100).toFixed(0);
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
      updateBalance();
      updateStaked();
    } catch (error) { console.log(error); }
  }, [time]);

  const chartData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradientGreen = ctx.createLinearGradient(0, 0, 0, 100);
    const gradientOrange = ctx.createLinearGradient(0, 0, 60, 100);

    gradientGreen.addColorStop(0, "#60AF83");
    gradientGreen.addColorStop(1, "#28C76F");

    gradientOrange.addColorStop(0, "#FC4A1A");
    gradientOrange.addColorStop(1, "#F7B733");

    return {
      labels: [t("В стейках"), t("Свободно")],
      datasets: [
        {
          data: [staked, balance],
          backgroundColor: [gradientGreen, gradientOrange],
          hoverBackgroundColor: [gradientGreen, gradientOrange],
        },
      ],
    };
  };

  return (
    <div className="user-wallet-block user-wallet-balance">
      <Card size="small">
        <Row align="bottom" gutter={[0, { sm: 0, xs: 20 }]}>
          <Col span="12">
            <Title level={5} className="user-wallet-block-title">
              {t('Баланс')}
            </Title>
          </Col>

          <Col sm={6} span={12}>
            <div className="user-wallet-balance-info">
              <Row gutter={[0, 25]}>
                <Col span={12}>
                  <Paragraph type="secondary" className="fs-14">
                    {t('Текущий баланс')}
                  </Paragraph>

                  <Paragraph className="fs-24 typography-tag">
                    <NumberFormat
                      displayType='text' thousandSeparator
                      decimalScale={4} fixedDecimalScale={4}
                      value={sum} defaultValue='0'
                    />
                    <Tag>VTM</Tag>
                  </Paragraph>

                  <Paragraph type="secondary" className="fs-14 typography-tag">
                    <NumberFormat
                      displayType='text' thousandSeparator
                      decimalScale={2} fixedDecimalScale={2}
                      value={sum * price} defaultValue='0'
                    />
                    <Tag>USD</Tag>
                  </Paragraph>
                </Col>

                <Col span={12}>
                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      {t('В стейках')}
                    </Paragraph>

                    <Paragraph className="fs-18 typography-tag">
                      <NumberFormat
                        displayType='text' thousandSeparator
                        decimalScale={0} fixedDecimalScale={0}
                        value={staked} defaultValue='0'
                      />
                      <Tag>VTM</Tag>
                    </Paragraph>
                  </div>

                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      {t('Свободно')}
                    </Paragraph>

                    <Paragraph className="fs-18 typography-tag">
                      <NumberFormat
                        displayType='text' thousandSeparator
                        decimalScale={0} fixedDecimalScale={0}
                        value={balance} defaultValue='0'
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
                id="user-wallet-balance-chart"
                width={100}
                height={100}
                data={chartData}
                legend={{ display: false }}
                options={{
                  elements: {
                    center: {
                      text: stakedPercent + "%",
                      color: "#ffffff",
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

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(UserWalletBalance));
