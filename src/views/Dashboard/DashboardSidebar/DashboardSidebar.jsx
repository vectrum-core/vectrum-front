import React from "react";

import { Typography, Card } from "antd";
import UserWalletAddress from "../../../components/User/UserWalletAddress/UserWalletAddress";
import UserBalance from "../../../components/User/UserBalance/UserBalance";
import DashboardSidebarNav from "./DashboardSidebarNav/DashboardSidebarNav";
import CurrencyRates from "../../../components/CurrencyRates/CurrencyRates";

import "./DashboardSidebar.less";

const { Title } = Typography;

export default function DashboardSidebar({ onChangeRoute }) {
  return (
    <div className="dashboard-sidebar-wrapper">
      <aside className="dashboard-sidebar">
        <Card className="dashboard-sidebar-card" bordered={false}>
          <div className="dashboard-sidebar-user">
            <div className="dashboard-sidebar-user-item">
              <Title className="dashboard-sidebar-title" level={3}>
                Мой адрес
              </Title>

              <UserWalletAddress></UserWalletAddress>
            </div>

            <div className="dashboard-sidebar-user-item">
              <Title className="dashboard-sidebar-title" level={3}>
                Мой баланс
              </Title>

              <UserBalance></UserBalance>
            </div>
          </div>

          <DashboardSidebarNav
            onChangeRoute={onChangeRoute}
          ></DashboardSidebarNav>

          <div className="dashboard-sidebar-currency-rates">
            <Title className="dashboard-sidebar-title" level={3}>
              Курсы валют
            </Title>

            <CurrencyRates></CurrencyRates>
          </div>
        </Card>
      </aside>
    </div>
  );
}
