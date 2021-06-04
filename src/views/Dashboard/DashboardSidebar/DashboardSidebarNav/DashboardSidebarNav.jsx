import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import {
  WalletIcon,
  StockIcon,
  MiningIcon,
  MarketplaceSvgIcon,
  BonusIcon,
  SettingsIcon,
  HelpIcon,
} from "../../../../components/Icons/Icons";

import "./DashboardSidebarNav.less";


export default function DashboardSidebarNav({ onChangeRoute }) {
  const { t } = useTranslation();

  const nav = [
    {
      to: "/dashboard",
      title: t("Мой кошелёк"),
      icon: <WalletIcon />,
    },
    {
      to: "/dashboard/trading-exchange",
      title: t("Биржа"),
      icon: <StockIcon />,
    },
    {
      to: "/dashboard/mining",
      title: t("Майнинг"),
      icon: <MiningIcon />,
    },
    {
      to: "/dashboard/marketplace",
      title: t("Маркетплейс"),
      icon: <MarketplaceSvgIcon />,
    },
    {
      to: "/dashboard/bonus-program",
      title: t("Бонусная программа"),
      icon: <BonusIcon />,
    },
    {
      to: `/dashboard/settings`,
      title: t("Настройки"),
      icon: <SettingsIcon />,
    },
    {
      to: "/dashboard/help",
      title: t("Помощь"),
      icon: <HelpIcon />,
    },
  ];

  return (
    <nav className="dashboard-sidebar-nav">
      <ul className="dashboard-sidebar-nav-list">
        {nav.map((item, index) => (
          <li key={index} className="dashboard-sidebar-nav-list-item">
            <NavLink
              to={item.to}
              exact
              className="dashboard-sidebar-nav-list-link"
              activeClassName="dashboard-sidebar-nav-list-link-active"
              onClick={onChangeRoute}
            >
              {item.icon}
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
