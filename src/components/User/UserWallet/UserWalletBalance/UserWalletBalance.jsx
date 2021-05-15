import React from "react";

import { Card, Row, Col, Typography, Tag } from "antd";
import { Doughnut } from "react-chartjs-2";

import "./UserWalletBalance.less";

const { Title, Paragraph } = Typography;

const chartData = (canvas) => {
  const ctx = canvas.getContext("2d");
  const gradientGreen = ctx.createLinearGradient(0, 0, 0, 100);
  const gradientOrange = ctx.createLinearGradient(0, 0, 60, 100);

  gradientGreen.addColorStop(0, "#60AF83");
  gradientGreen.addColorStop(1, "#28C76F");

  gradientOrange.addColorStop(0, "#FC4A1A");
  gradientOrange.addColorStop(1, "#F7B733");

  return {
    labels: ["В стейках", "Свободно"],
    datasets: [
      {
        data: [3000, 1000],
        backgroundColor: [gradientGreen, gradientOrange],
        hoverBackgroundColor: [gradientGreen, gradientOrange],
      },
    ],
  };
};

export default function UserWalletBalance() {
  return (
    <div className="user-wallet-block user-wallet-balance">
      <Card size="small">
        <Row align="bottom" gutter={[0, { sm: 0, xs: 20 }]}>
          <Col span="12">
            <Title level={5} className="user-wallet-block-title">
              Баланс
            </Title>
          </Col>

          <Col sm={6} span={12}>
            <div className="user-wallet-balance-info">
              <Row gutter={[0, 25]}>
                <Col span={12}>
                  <Paragraph type="secondary" className="fs-14">
                    Текущий баланс
                  </Paragraph>

                  <Paragraph className="fs-24 typography-tag">
                    124,568,521
                    <Tag>VTM</Tag>
                  </Paragraph>

                  <Paragraph type="secondary" className="fs-14 typography-tag">
                    14,675.00
                    <Tag>USD</Tag>
                  </Paragraph>
                </Col>

                <Col span={12}>
                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      В стейках
                    </Paragraph>

                    <Paragraph className="fs-18 typography-tag">
                      124,568,521
                      <Tag>VTM</Tag>
                    </Paragraph>
                  </div>

                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      Свободно
                    </Paragraph>

                    <Paragraph className="fs-18 typography-tag">
                      14,568,521
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
                      text: "85%",
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
