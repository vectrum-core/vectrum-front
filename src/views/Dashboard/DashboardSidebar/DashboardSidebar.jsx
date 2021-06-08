import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import * as S from "../../../store/selectors";
import { useTranslation } from "react-i18next";

import { Typography, Card, Row, Col, Button } from "antd";

import UserWalletAddress from "../../../components/User/UserWalletAddress/UserWalletAddress";
import UserBalance from "../../../components/User/UserBalance/UserBalance";
import DashboardSidebarNav from "./DashboardSidebarNav/DashboardSidebarNav";
import CurrencyRates from "../../../components/CurrencyRates/CurrencyRates";
import CreateWallet from "../../../components/CreateWallet/CreateWallet";

import "./DashboardSidebar.less";

const { Title } = Typography;



function DashboardSidebar({
  onChangeRoute, account,
}) {
  const { t } = useTranslation();
  const [isCreateWalletVisible, setIsCreateWalletVisible] = useState(false);


  return (
    <>
      <CreateWallet
        visible={isCreateWalletVisible}
        onClose={() => setIsCreateWalletVisible(false)}
      />

      <div className="dashboard-sidebar-wrapper">
        <aside className="dashboard-sidebar">
          <Card className="dashboard-sidebar-card" bordered={false}>
            {!account &&
              <div className="dashboard-sidebar-user">
                <div className="dashboard-sidebar-user-item">
                  <Title className="dashboard-sidebar-title" level={3}>
                    {t('Мой адрес')}
                  </Title>

                  <Row
                    className="user-balance-actions"
                    gutter={[
                      { xl: 20, lg: 10, sm: 20, xs: 0 },
                      { sm: 0, xs: 10 },
                    ]}
                  >
                    <Col sm={12} span={12}>
                      <Button
                        type="primary"
                        size="small"
                        block
                        onClick={() => setIsCreateWalletVisible(true)}
                      >{t('Создать')}</Button>
                    </Col>
                  </Row>
                </div>
              </div>
            }

            {account &&
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
            }

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
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    account: S.profile.getAccount(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(DashboardSidebar));
