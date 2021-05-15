import React from "react";

import { Line } from "react-chartjs-2";
import { Card, Row, Col, Form, Input, Typography } from "antd";

import "./StakingCalculator.less";

const { Title } = Typography;

const chartData = (canvas) => {
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 100);

  gradient.addColorStop(1, "rgba(25, 156, 111, 0.1)");
  gradient.addColorStop(0, "rgba(25, 156, 111, 0.4)");

  return {
    labels: ["1 фев", "5 фев", "10 фев", "15 фев"],
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
        data: [1000, 5000, 7000, 10000],
      },
    ],
  };
};

export default function StakingCalculator() {
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
                <Input size="large" addonBefore="VTM" allowClear></Input>
              </Form.Item>

              <Form.Item
                label="Через 1 год вы можете заработать"
                name="prediction"
              >
                <Input size="large" addonBefore="VTM" allowClear></Input>
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
