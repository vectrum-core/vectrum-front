import React from "react";

import { Row, Col } from "antd";
import UserWallet from "../../../components/User/UserWallet/UserWallet";
import TransactionHistory from "../../../components/TransactionHistory/TransactionHistory";
import BlockchainState from "../../../components/BlockchainState/BlockchainState";
import StakingCalculator from "../../../components/StakingCalculator/StakingCalculator";

import "./DashboardWallet.less";

export default function DashboardWallet() {
  return (
    <div className="dashboard-wallet">
      <Row gutter={[0, { xxl: 60, xl: 30, sm: 20, xs: 20 }]}>
        <Col span={12}>
          <UserWallet></UserWallet>
        </Col>

        <Col span={12}>
          <TransactionHistory></TransactionHistory>
        </Col>

        <Col span={12}>
          <BlockchainState></BlockchainState>
        </Col>

        <Col span={12}>
          <StakingCalculator></StakingCalculator>
        </Col>
      </Row>
    </div>
  );
}
