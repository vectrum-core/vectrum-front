import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import * as S from "../../store/selectors";
import * as A from "../../store/actions";
import { api } from "../../store/configureStore";


import { Line } from "react-chartjs-2";
import { Card, Row, Col, Form, Input, Typography } from "antd";

import "./StakingCalculator.less";

const { Title } = Typography;




function getContinuousRate(timePassedAfterActivation = 0) {
  const useconds_per_month = 30 * 24 * 3600 * 1000;
  let rate = 0;

  if (timePassedAfterActivation <= 3 * useconds_per_month) {
    const startRate = 3000; // 30%
    const endRate = 1000;   // 10%
    const timeInterval = timePassedAfterActivation;
    const delta = (startRate - endRate) * (timeInterval) / (3 * useconds_per_month);
    rate = (startRate) - delta;

  } else if (timePassedAfterActivation <= 15 * useconds_per_month) {
    const startRate = 1000; // 10%
    const endRate = 500;    // 5%
    const timeInterval = timePassedAfterActivation - 3 * useconds_per_month;
    const delta = (startRate - endRate) * (timeInterval) / (12 * useconds_per_month);
    rate = (startRate) - delta;

  } else if (timePassedAfterActivation <= 27 * useconds_per_month) {
    const startRate = 500; // 5%
    const endRate = 100;   // 1%
    const timeInterval = timePassedAfterActivation - 15 * useconds_per_month;
    const delta = (startRate - endRate) * (timeInterval) / (12 * useconds_per_month);
    rate = (startRate) - delta;

  } else {
    rate = 100; // 1%
  }

  return rate / (100 * 100);
}

function StakingCalculator() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);


  const vtmStatsInit = {
    issuer: "eosio",
    max_supply: "10000000000.0000 VTM",
    supply: "1000000000.0000 VTM",
  };
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


  const vtmStakedInit = "0.0000 VTM";
  const [vtmStaked, setVtmStaked] = useState(vtmStakedInit);
  const updateVtmStaked = async () => {
    try {
      const res = await api.vectrum.rpc.get_currency_balance('eosio.token', 'eosio.stake', 'VTM');
      setVtmStaked(res[0]);
    } catch (error) {
      console.error(error);
      setVtmStaked(vtmStakedInit);
    }
  }

  const eosioGlobalInit = {
    thresh_activated_stake_time: new Date().toISOString(),
  };
  const [eosioGlobal, setEosioGlobal] = useState(eosioGlobalInit);
  const updateEosioGlobal = async () => {
    try {
      const res = await api.vectrum.rpc.get_table_rows({
        json: true,               // Get the response as json
        code: 'eosio',      // Contract that we target
        scope: 'eosio',         // Account that owns the data
        table: 'global',        // Table name
        limit: 1,                // Maximum number of rows that we want to get
        reverse: false,           // Optional: Get reversed data
        show_payer: false          // Optional: Show ram payer
      });
      setEosioGlobal(res.rows[0]);
    } catch (error) {
      console.error(error);
      setEosioGlobal(eosioGlobalInit);
    }
  }

  const eosioGlobalInit4 = {
    bpay_factor: 100000,
    continuous_rate: "0.29999999999999999",
    upay_factor: 12500,
    vpay_factor: 100000,
  };
  const [eosioGlobal4, setEosioGlobal4] = useState(eosioGlobalInit4);
  const updateEosioGlobal4 = async () => {
    try {
      const res = await api.vectrum.rpc.get_table_rows({
        json: true,               // Get the response as json
        code: 'eosio',      // Contract that we target
        scope: 'eosio',         // Account that owns the data
        table: 'global4',        // Table name
        limit: 1,                // Maximum number of rows that we want to get
        reverse: false,           // Optional: Get reversed data
        show_payer: false          // Optional: Show ram payer
      });
      setEosioGlobal4(res.rows[0]);
    } catch (error) {
      console.error(error);
      setEosioGlobal4(eosioGlobalInit4);
    }
  }



  useEffect(() => {
    try {
      updateVtmStats();
      updateVtmStaked();
      updateEosioGlobal();
      updateEosioGlobal4();
    } catch (error) { console.log(error); }
  }, [time]);




  const [inputVtm, setInputVtm] = useState('1000000');
  const onInputVtmChange = (e) => {
    e.preventDefault();
    setInputVtm(e.target.value);
  }
  const [outputVtm, setOutputVtm] = useState('');
  const onOutputVtmChange = (e) => {
    e.preventDefault();
    setOutputVtm(e.target.value);
  }

  const [chartData12, setChartData12] = useState([]);
  const [chartData12Labels, setChartLabels] = useState([]);

  useEffect(() => {
    try {
      const threshActivatedStakeTime = new Date(
        eosioGlobal.thresh_activated_stake_time // + 'Z'
      ).getTime();
      let deltaTime = Date.now() - threshActivatedStakeTime;

      let input = parseFloat(inputVtm) || 0;
      let rate = parseFloat(eosioGlobal4.continuous_rate);
      let supply = parseFloat(vtmStats.supply.split(' ')[0]);
      supply = supply + input;
      let staked = parseFloat(vtmStaked.split(' ')[0]);
      staked = staked + input;

      // грубо на фикс процент за сутки
      //const output = (input / staked * supply * (rate / 30)).toFixed(2);
      //setOutputVtm(output);

      // todo накопительный процент
      let day = 1;
      let outputSum = 0;
      let supplySum = supply;
      const data12 = [];
      const labels = [];
      let m = 0;
      while (day < 361) {
        deltaTime = deltaTime + day * 24 * 3600 * 1000;
        let rateInTime = getContinuousRate(deltaTime);
        outputSum += input / staked * supplySum * (rateInTime / 30);
        supplySum += supplySum * (rateInTime / 30);

        if (Math.floor(day / 30) > m) {
          data12.push(outputSum);
          m = Math.floor(day / 30);
          labels.push(m);
        }
        day++;
      }

      setOutputVtm(outputSum.toFixed(2));
      setChartData12(data12);
      setChartLabels(labels);

    } catch (error) { console.log(error); }
  }, [
    inputVtm,
    eosioGlobal.thresh_activated_stake_time,
    eosioGlobal4.continuous_rate,
    vtmStaked,
    vtmStats.supply,
  ]);


  const chartData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);

    gradient.addColorStop(1, "rgba(25, 156, 111, 0.1)");
    gradient.addColorStop(0, "rgba(25, 156, 111, 0.4)");

    return {
      labels: chartData12Labels,//["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], // ?
      datasets: [
        {
          label: "",
          fill: true,
          backgroundColor: gradient,
          borderColor: "#6C757D",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#199C6F",
          pointBorderWidth: 0,
          pointHoverRadius: 5,
          borderWidth: 0.9,
          pointHoverBackgroundColor: "#199C6F",
          pointHoverBorderColor: "#199C6F",
          pointRadius: 3.5,
          data: chartData12, // ?
        },
      ],
    };
  };

  return (
    <div className="staking-calculator">
      <Card bordered={false}>
        <Row gutter={[30, 30]}>
          <Col span={12}>
            <Title level={4}>Калькулятор вознаграждения от стейкинга</Title>
          </Col>

          <Col md={6} xs={12}>
            <Form className="floating-label-form" layout="vertical">
              <Form.Item label="Введите значение депозита" name="deposite">
                <Input
                  type="number"
                  //allowClear
                  size="large" addonBefore="VTM"
                  value={inputVtm}
                  onChange={onInputVtmChange}
                />
                {' '}
              </Form.Item>

              <Form.Item
                label="Через 1 год вы можете заработать"
                name="prediction"
              >
                <Input
                  type="number"
                  //allowClear
                  size="large" addonBefore="VTM"
                  value={outputVtm}
                //onChange={onOutputVtmChange}
                />
                {' '}
              </Form.Item>
            </Form>
          </Col>

          <Col md={6} xs={12}>
            <Line
              id="staking-calculator-chart"
              data={chartData}
              legend={{ display: false }}
            ></Line>
          </Col>
        </Row>
      </Card>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(StakingCalculator));
