import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Drawer, Row, Col } from "antd";
import Container from "../../../components/Common/Container/Container";
import Logo from "../../../components/Common/Logo/Logo";
import LangSwitcher from "../../../components/Common/LangSwitcher/LangSwitcher";
import HeaderNav from "./DashboardHeaderNav/DashboardHeaderNav";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";

import {
  LogoutIcon,
  BurgerIcon,
  CloseIcon,
} from "../../../components/Icons/Icons";

import "./DashboardHeader.less";

const navList = [
  {
    id: "about-wallet",
    label: "О кошельке",
  },
  {
    to: "/",
    label: "Купить",
  },
  {
    id: "faq",
    label: "FAQ",
  },
  {
    to: "/",
    label: "Explorer",
  },
];

export default function Header() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [offset, setOffset] = useState(0);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onCloseDrawer = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);

  return (
    <>
      <header
        className={`dashboard-header ${
          offset || window.pageYOffset > 0 ? "dashboard-header-fill" : ""
        }`}
      >
        <Container>
          <Row
            gutter={[
              { xxl: 60, xl: 30, sm: 20, xs: 20 },
              { xxl: 60, xl: 30, sm: 20, xs: 20 },
            ]}
          >
            <Col xl={3} span={6}>
              <Logo color="black" to="/dashboard"></Logo>
            </Col>

            <Col xl={9} span={6}>
              <div className="dashboard-header-nav-container">
                <HeaderNav list={navList} />

                <LangSwitcher />

                <Link to="/">
                  <Button
                    className="dashboard-header-logout-btn"
                    type="link"
                    icon={<LogoutIcon />}
                  />
                </Link>

                <Button
                  className="dashboard-header-toggle-drawer"
                  type="link"
                  icon={<BurgerIcon />}
                  onClick={showDrawer}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <Drawer
        title=""
        className="sidebar-drawer"
        width={420}
        placement="right"
        closable={false}
        onClose={onCloseDrawer}
        visible={drawerVisible}
      >
        <div className="drawer-header">
          <Logo position="" color="black" />

          <Button
            type="link"
            className="drawer-header-close"
            icon={<CloseIcon />}
            onClick={onCloseDrawer}
          />
        </div>

        <div className="dashboard-drawer-sidebar">
          <DashboardSidebar onChangeRoute={onCloseDrawer} />
        </div>

        <div className="dashboard-drawer-footer">
          <Row align="middle">
            <Col span={6}>
              <Link to="/">
                <Button
                  className="dashboard-drawer-logout-btn"
                  type="link"
                  icon={<LogoutIcon />}
                />
              </Link>
            </Col>

            <Col span={6}>
              <LangSwitcher />
            </Col>
          </Row>
        </div>
      </Drawer>
    </>
  );
}
