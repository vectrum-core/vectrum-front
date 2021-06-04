import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as S from "../../../store/selectors";
import { useTranslation } from "react-i18next";
import { hot } from "react-hot-loader";

import { Typography, Card } from "antd";
import UserWalletAddress from "../../../components/User/UserWalletAddress/UserWalletAddress";
import UserBalance from "../../../components/User/UserBalance/UserBalance";
import DashboardSidebarNav from "./DashboardSidebarNav/DashboardSidebarNav";
import CurrencyRates from "../../../components/CurrencyRates/CurrencyRates";

import "./DashboardSidebar.less";

const { Title } = Typography;



function DashboardSidebar({ onChangeRoute }) {
  const { t } = useTranslation();
  return (
    <div className="dashboard-sidebar-wrapper">
      <aside className="dashboard-sidebar">
        <Card className="dashboard-sidebar-card" bordered={false}>
          <div className="dashboard-sidebar-user">
            <div className="dashboard-sidebar-user-item">
              <Title className="dashboard-sidebar-title" level={3}>
                {t('Мой адрес')}
              </Title>

              <UserWalletAddress></UserWalletAddress>
            </div>

            <div className="dashboard-sidebar-user-item">
              <Title className="dashboard-sidebar-title" level={3}>
                {t('Мой баланс')}
              </Title>

              <UserBalance></UserBalance>
            </div>
          </div>

          <DashboardSidebarNav
            onChangeRoute={onChangeRoute}
          ></DashboardSidebarNav>

          <div className="dashboard-sidebar-currency-rates">
            <Title className="dashboard-sidebar-title" level={3}>
              {t('Курсы валют')}
            </Title>

            <CurrencyRates></CurrencyRates>
          </div>
        </Card>
      </aside>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    account: S.profile.getAccount,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(DashboardSidebar));
