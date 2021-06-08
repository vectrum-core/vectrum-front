import React from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import * as S from "../../../store/selectors";
import * as A from "../../../store/actions";
import { api } from "../../../store/configureStore";
import { Row, Col } from "antd";

import UserWallet from "../../../components/User/UserWallet/UserWallet";
import TransactionHistory from "../../../components/TransactionHistory/TransactionHistory";
import BlockchainState from "../../../components/BlockchainState/BlockchainState";
import StakingCalculator from "../../../components/StakingCalculator/StakingCalculator";

import "./DashboardWallet.less";



function DashboardWallet({
  account,
}) {
  // import { withUAL } from 'ual-reactjs-renderer';
  // https://github.com/EOSIO/ual-reactjs-renderer/blob/develop/examples/src/ButtonWebViewReact.tsx

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

const mapStateToProps = (state) => {
  return {
    account: S.profile.getAccount(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    //logOutAction: () => dispatch(A.profile.reAuthenticate()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(DashboardWallet));
