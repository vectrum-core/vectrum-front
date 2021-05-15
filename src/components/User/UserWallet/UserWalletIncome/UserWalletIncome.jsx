import React from "react";

import { Card, Row, Col, Typography, Tag, Progress } from "antd";

import "./UserWalletIncome.less";

const { Title, Paragraph } = Typography;

export default function UserWalletIncome() {
  return (
    <div className="user-wallet-block user-wallet-income">
      <Card size="small">
        <Row gutter={[0, { sm: 0, xs: 20 }]}>
          <Col span="12">
            <Title level={5} className="user-wallet-block-title">
              Поступления
            </Title>
          </Col>

          <Col sm={6} span={12}>
            <div className="user-wallet-income-info">
              <Row gutter={[0, 25]}>
                <Col span={12}>
                  <Paragraph type="secondary" className="fs-14">
                    Оборот по счету
                  </Paragraph>

                  <Paragraph className="fs-24 typography-tag">
                    5,125
                    <Tag>VTM</Tag>
                  </Paragraph>

                  <Paragraph type="secondary" className="fs-14 typography-tag">
                    675
                    <Tag>USD</Tag>
                  </Paragraph>
                </Col>

                <Col span={12}>
                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      Отправлено
                    </Paragraph>

                    <Paragraph className="fs-18 typography-tag">
                      4,604
                      <Tag>VTM</Tag>
                    </Paragraph>
                  </div>

                  <div className="user-wallet-list-item">
                    <Paragraph type="secondary" className="fs-14">
                      Получено
                    </Paragraph>

                    <Paragraph className="fs-18 typography-tag">
                      658
                      <Tag>VTM</Tag>
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
