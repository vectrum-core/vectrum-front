import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import * as S from "../../../store/selectors";
import * as A from "../../../store/actions";
import { api } from "../../../store/configureStore";
import NumberFormat from 'react-number-format';

import { Card, Row, Col, Typography, Tag } from "antd";
import { Doughnut } from "react-chartjs-2";

import "./BlockchainStateCurrentIssue.less";

const { Title, Paragraph } = Typography;



const blockchainInfoInit = {
  server_version: "",
  chain_id: "",
  head_block_num: 0,
  last_irreversible_block_num: 0,
  last_irreversible_block_id: "",
  head_block_id: "",
  head_block_time: "",
  head_block_producer: "",
  virtual_block_cpu_limit: 0,
  virtual_block_net_limit: 0,
  block_cpu_limit: 0,
  block_net_limit: 0,
  server_version_string: "",
  fork_db_head_block_num: 0,
  fork_db_head_block_id: "",
  server_full_version_string: ""
};

const vtmStatsInit = {
  issuer: "eosio",
  max_supply: "10000000000.0000 VTM",
  supply: "1000000000.0000 VTM",
};

const vtmStakedInit = "0.0000 VTM";



function BlockchainStateCurrentIssue(props = {}) {
  const { account } = props;
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

  const [blockchainInfo, setBlockchainInfo] = useState(blockchainInfoInit);
  const updateBlockchainInfo = async () => {
    try {
      const res = await api.vectrum.rpc.get_info();
      setBlockchainInfo(res);
    } catch (error) {
      console.error(error);
      setBlockchainInfo(blockchainInfoInit);
    }
  }

  const [vtmStats, setVtmStats] = useState(vtmStatsInit);
  const updateVtmStats = async () => {
    try {
      const res = await api.vectrum.rpc.get_currency_stats('eosio.token', 'VTM');
      setVtmStats(res.VTM);
    } catch (error) {
      console.error(error);
      setVtmStats(vtmStatsInit);
    }
  }

  const [vtmStaked, setVtmStaked] = useState(vtmStakedInit);
  const updateVtmStaked = async () => {
    try {
      const res = await api.vectrum.rpc.get_currency_balance('eosio.token', account, 'VTM');
      setVtmStaked(res[0]);
    } catch (error) {
      console.error(error);
      setVtmStaked(vtmStakedInit);
    }
  }



  useEffect(() => {
    try {
      updateBlockchainInfo();
      updateVtmStats();
      updateVtmStaked();
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
      labels: [t("В стейках"), t("Свободно")],
      datasets: [
        {
          data: [vtmStats.supply.split(' ')[0], vtmStaked.split(' ')[0]],
          backgroundColor: [gradientGreen, gradientOrange],
          hoverBackgroundColor: [gradientGreen, gradientOrange],
        },
      ],
    };
  };

  const vtmUsdPrice = '0.02';
  const vtmVolume = (0 + vtmUsdPrice * vtmStats.supply.split(' ')[0]).toFixed(2);
  const vtmStakedPercent = (vtmStaked.split(' ')[0] / vtmStats.supply.split(' ')[0] * 100).toFixed(2);

  return (
    <div className="blockchain-state-current-issue">
      <Card size="small">
        <Row>
          <Col span="12">
            <Title level={5}>{t("Текущая эмиссия")}</Title>
          </Col>

          <Col span={12}>
            <div className="blockchain-state-current-issue-info">
              <Row align="bottom" gutter={[0, 25]}>
                <Col sm={6} span={12}>
                  <Row gutter={[0, 24]}>
                    <Col>
                      <Paragraph type="secondary" className="fs-14">
                        {t("Текущая эмиссия")}
                      </Paragraph>

                      <Paragraph className="fs-24 typography-tag">
                        <NumberFormat
                          displayType={'text'}
                          defaultValue={0}
                          thousandSeparator
                          value={vtmStats.supply.split(' ')[0]}
                        />
                        <Tag>VTM</Tag>
                      </Paragraph>

                      <Paragraph
                        type="secondary"
                        className="fs-14 typography-tag"
                      >
                        <NumberFormat
                          displayType={'text'}
                          defaultValue={0}
                          thousandSeparator
                          value={vtmVolume}
                        />
                        <Tag>USD</Tag>
                      </Paragraph>
                    </Col>

                    <Col>
                      <Paragraph type="secondary" className="fs-14">
                        {t("В стейках")}
                      </Paragraph>
                      <Paragraph type="secondary" className="fs-18">
                        <NumberFormat
                          displayType={'text'}
                          defaultValue={0}
                          thousandSeparator
                          fixedDecimalScale={true}
                          decimalScale={2}
                          value={vtmStakedPercent}
                        />%
                      </Paragraph>

                      <Paragraph type="secondary" className="fs-14">
                        {t("Блок")}
                      </Paragraph>
                      <Paragraph type="secondary" className="fs-18">
                        <NumberFormat
                          displayType={'text'}
                          defaultValue={0}
                          thousandSeparator
                          value={blockchainInfo.head_block_num}
                        />
                      </Paragraph>

                      <Paragraph type="secondary" className="fs-14">
                        {t("Max эмиссия")}
                      </Paragraph>
                      <Paragraph
                        type="secondary"
                        className="fs-18 typography-tag"
                      >
                        <NumberFormat
                          displayType={'text'}
                          defaultValue={0}
                          thousandSeparator
                          value={vtmStats.max_supply.split(' ')[0]}
                        />
                        <Tag>VTM</Tag>
                      </Paragraph>
                    </Col>
                  </Row>
                </Col>

                <Col sm={6} span={12}>
                  <Doughnut
                    id="blockchain-state-current-issue-chart"
                    width={100}
                    height={100}
                    data={chartData}
                    legend={{ display: false }}
                    options={{
                      elements: {
                        center: {
                          text: vtmStakedPercent + '%',
                          fontStyle: "Roboto",
                          sidePadding: 30,
                          minFontSize: 18,
                          lineHeight: 25,
                        },
                      },
                    }}
                  ></Doughnut>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    account: 'eosio.stake', // TODO
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(BlockchainStateCurrentIssue));
