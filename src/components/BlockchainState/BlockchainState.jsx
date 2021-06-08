import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";
import { Card, Row, Col, Typography } from "antd";

import BlockchainStateCurrentIssue from "./BlockchainStateCurrentIssue/BlockchainStateCurrentIssue";
import BlockchainStateTransactions from "./BlockchainStateTransactions/BlockchainStateTransactions";

import "./BlockchainState.less";

const { Title } = Typography;



function BlockchainState() {
  const { t } = useTranslation();

  return (
    <div className="blockchain-state">
      <Card bordered={false}>
        <Row
          gutter={[
            { xxl: 30, sm: 20, xs: 20 },
            { xxl: 30, sm: 20, xs: 20 },
          ]}
        >
          <Col span={12}>
            <Title className="blockchain-state-title" level={4}>
              {t('Состояние блокчейна')}
            </Title>
          </Col>

          <Col md={6} xs={12}>
            <BlockchainStateCurrentIssue></BlockchainStateCurrentIssue>
          </Col>

          <Col md={6} xs={12}>
            <BlockchainStateTransactions></BlockchainStateTransactions>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default hot(module)(BlockchainState);
