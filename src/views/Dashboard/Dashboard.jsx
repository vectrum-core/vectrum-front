import React from "react";

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

import LogoutAlert from "../../components/LogoutAlert/LogoutAlert";
import SendCoinsStatus from "../../components/SendCoinsStatus/SendCoinsStatus";

import "./Dashboard.less";

export default function Dashboard() {
  return (
    <>
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
                  path="/dashboard/settings"
                  component={DashboardUserSettings}
                />
              </Switch>

              <DashboardFooter />
            </Col>
          </Row>
        </Container>
      </div>

      <LogoutAlert />
      <SendCoinsStatus />
    </>
  );
}
