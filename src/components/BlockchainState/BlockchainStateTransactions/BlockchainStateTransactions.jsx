import React from "react";

import { Line } from "react-chartjs-2";
import { Card, Row, Col, Typography } from "antd";

import "./BlockchainStateTransactions.less";

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
        lineTension: 0,
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
        data: [10000, 7000, 6000, 8000],
      },
    ],
  };
};

export default function BlockchainStateTransactions() {
  return (
    <div className="blockchain-state-transactions">
      <Card size="small">
        <Row>
          <Col span={12}>
            <Title level={5}>Количество транзакций</Title>
          </Col>

          <Col span={12}>
            <Line
              id="blockchain-state-transactions-chart"
              data={chartData}
              legend={{ display: false }}
            ></Line>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
