import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Drawer } from "antd";
import Container from "../../../components/Common/Container/Container";
import Logo from "../../../components/Common/Logo/Logo";
import HeaderNav from "./HeaderNav/HeaderNav";
import LangSwitcher from "../../../components/Common/LangSwitcher/LangSwitcher";

import { BurgerIcon } from "../../../components/Icons/Icons";

import "./LandingPageHeader.less";

const navList = [
  {
    id: "about-wallet",
    label: "О кошельке",
  },
  {
    to: "/",
    label: "Купить VTM",
  },
  {
    to: "/",
    label: "Документация",
  },
  {
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
        className={`header header-landing ${
          offset > mainHeight ? "header-fill" : ""
        }`}
      >
        <Container className="header-container">
          <Logo color={offset > mainHeight ? "black" : "white"}></Logo>

          <HeaderNav list={navList} mode={""}></HeaderNav>

          <LangSwitcher></LangSwitcher>

          <Button
            className="header-toggle-drawer"
            type="link"
            icon={<BurgerIcon />}
            onClick={showDrawer}
          ></Button>
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
          <Logo position="" color="black"></Logo>

          <LangSwitcher></LangSwitcher>
        </div>

        <ul className="drawer-nav-list">
          {navList.map((item, index) => (
            <li key={index} className="drawer-nav-list-item">
              <Link to={item.to} className="drawer-nav-list-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}
