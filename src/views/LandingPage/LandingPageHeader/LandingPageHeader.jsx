import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Drawer, Row, Col } from "antd";
import { Link as AnchorLink } from "react-scroll";
import Container from "../../../components/Common/Container/Container";
import Logo from "../../../components/Common/Logo/Logo";
import HeaderNav from "./HeaderNav/HeaderNav";
import LangSwitcher from "../../../components/Common/LangSwitcher/LangSwitcher";
import { BurgerIcon, CloseIcon } from "../../../components/Icons/Icons";
import { scrollOptions } from "../.././../assets/js/const/index";
//import { explorerUrl } from "../../../constants";
import "./LandingPageHeader.less";



const navList = [
  {
    id: "about-wallet",
    label: "О кошельке",
  },
  {
    to: "/buy",
    label: "Купить VTM",
  },
  {
    to: "/docs",
    label: "Документация",
  },
  {
    //to: explorerUrl, // TODO href
    to: "/",
    label: "Explorer",
  },
  {
    id: "faq",
    label: "FAQ",
  },
];

export default function LandingPageHeader() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const [mainHeight, setMainHeight] = useState(0);

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

  useEffect(() => {
    const main = document.querySelector(".landing-page-main");
    const mainHeight = main.offsetHeight;

    console.log("mainHeight :>> ", mainHeight);

    setMainHeight(mainHeight);
  }, []);

  return (
    <>
      <header
        className={`header header-landing ${offset > mainHeight ? "header-fill" : ""
          }`}
      >
        <Container className="header-container">
          <Logo color={offset > mainHeight ? "black" : "white"} />

          <HeaderNav list={navList} mode={""} />

          <LangSwitcher />

          <Button
            className="header-toggle-drawer"
            type="link"
            icon={<BurgerIcon />}
            onClick={showDrawer}
          />
        </Container>
      </header>

      <Drawer
        title=""
        width={320}
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

        <ul className="drawer-nav-list">
          {navList.map((item, index) => (
            <li key={index} className="drawer-nav-list-item">
              {item.href ? (
                <a
                  href={item.href}
                  className="drawer-nav-list-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.title}
                </a>
              ) : (
                <AnchorLink
                  to={item.id}
                  {...scrollOptions}
                  className="drawer-nav-list-link"
                  onClick={onCloseDrawer}
                >
                  {item.label}
                </AnchorLink>
              )}
            </li>
          ))}
        </ul>

        <div className="drawer-footer">
          <Row align="middle">
            <Col span={6}>
              <LangSwitcher />
            </Col>
          </Row>
        </div>
      </Drawer>
    </>
  );
}
