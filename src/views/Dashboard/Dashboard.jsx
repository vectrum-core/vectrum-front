import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import * as S from "../../store/selectors";
import * as A from "../../store/actions";
import { api } from "../../store/configureStore";
import { Switch, Route } from "react-router-dom";
import { Row, Col } from "antd";

import Container from "../../components/Common/Container/Container";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import DashboardWallet from "./DashboardWallet/DashboardWallet";
import DashbordTradingExchange from "./DashbordTradingExchange/DashbordTradingExchange";
import DashbordTradingExchangeResult from "./DashbordTradingExchange/DashbordTradingExchangeResult/DashbordTradingExchangeResult";
import DashboardUserSettings from "./DashboardUserSettings/DashboardUserSettings";
import DashboardFooter from "./DashboardFooter/DashboardFooter";

import DashboardUserMining from "./DashboardUserMining/DashboardUserMining";


import CreateWallet from "../../components/CreateWallet/CreateWallet";
import LogoutAlert from "../../components/LogoutAlert/LogoutAlert";

import "./Dashboard.less";



function Dashboard({
  account,
}) {
  const [isCreateWalletVisible, setIsCreateWalletVisible] = useState(!account);

  // TODO проверка аккаунта на бэке и если нет, то включение модала
  return (
    <>
      <CreateWallet
        visible={isCreateWalletVisible}
        onClose={() => setIsCreateWalletVisible(false)}
      />

      <DashboardHeader></DashboardHeader>

      <div className="dashboard">
        <Container className="dashboard-container">
          <Row
            gutter={[
              { xxl: 60, xl: 30, sm: 20, xs: 20 },
              { xxl: 60, xl: 30, sm: 20, xs: 20 },
            ]}
          >
            <Col xl={3} span={0}>
              <DashboardSidebar />
            </Col>

            <Col xl={9} span={12}>
              <Switch>
                <Route exact path="/dashboard" component={DashboardWallet} />

                <Route
                  exact
                  path="/dashboard/trading-exchange/success"
                  component={DashbordTradingExchangeResult}
                />

                <Route
                  exact
                  path="/dashboard/trading-exchange"
                  component={DashbordTradingExchange}
                />

                <Route
                  exact
                  path="/dashboard/mining"
                  component={DashboardUserMining}
                />

                <Route
                  exact
                  path="/dashboard/marketplace"
                  component={() => null}
                />

                <Route
                  exact
                  path="/dashboard/bonus-program"
                  component={() => null}
                />

                <Route
                  exact
                  path="/dashboard/help"
                  component={() => null}
                />

                <Route
                  exact
                  path="/dashboard/settings"
                  component={DashboardUserSettings}
                />
              </Switch>

              <DashboardFooter />
            </Col>
          </Row>
        </Container>
      </div>

      {/*
      TODO как-то запускать счетчик обратного отсчета до выхода при бездействии пользователя
      <LogoutAlert />
      */}
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(Dashboard));
