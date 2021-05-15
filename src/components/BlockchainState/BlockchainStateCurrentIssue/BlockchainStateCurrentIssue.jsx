import React from "react";

import { Card, Row, Col, Typography, Tag } from "antd";
import { Doughnut } from "react-chartjs-2";

import "./BlockchainStateCurrentIssue.less";

const { Title, Paragraph } = Typography;

export default function BlockchainStateCurrentIssue() {
  const chartData = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradientGreen = ctx.createLinearGradient(0, 0, 0, 100);
    const gradientOrange = ctx.createLinearGradient(0, 0, 60, 100);

    gradientGreen.addColorStop(0, "#2B332C");
    gradientGreen.addColorStop(1, "#199C6F");

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

  return (
    <div className="blockchain-state-current-issue">
      <Card size="small">
        <Row>
          <Col span="12">
            <Title level={5}>Текущая эмиссия</Title>
          </Col>

          <Col span={12}>
            <div className="blockchain-state-current-issue-info">
              <Row align="bottom" gutter={[0, 25]}>
                <Col sm={6} span={12}>
                  <Row gutter={[0, 24]}>
                    <Col>
                      <Paragraph type="secondary" className="fs-14">
                        Текущая эмиссия
                      </Paragraph>

                      <Paragraph className="fs-24 typography-tag">
                        1,500,000,000
                        <Tag>VTM</Tag>
                      </Paragraph>

                      <Paragraph
                        type="secondary"
                        className="fs-14 typography-tag"
                      >
                        320,675.00
                        <Tag>USD</Tag>
                      </Paragraph>
                    </Col>

                    <Col>
                      <Paragraph type="secondary" className="fs-14">
                        В стейках
                      </Paragraph>
                      <Paragraph type="secondary" className="fs-18">
                        93%
                      </Paragraph>

                      <Paragraph type="secondary" className="fs-14">
                        Блок
                      </Paragraph>
                      <Paragraph type="secondary" className="fs-18">
                        1.002
                      </Paragraph>

                      <Paragraph type="secondary" className="fs-14">
                        Max эмиссия
                      </Paragraph>
                      <Paragraph
                        type="secondary"
                        className="fs-18 typography-tag"
                      >
                        10,000,000,000
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
                          text: "93%",
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
