import React from "react";
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

const nav = [
  {
    to: "/dashboard",
    title: "Мой кошелёк",
    icon: <WalletIcon />,
  },
  {
    to: "/dashboard/trading-exchange",
    title: "Биржа",
    icon: <StockIcon />,
  },
  {
    to: "/dashboard/mining",
    title: "Майнинг",
    icon: <MiningIcon />,
  },
  {
    to: "/dashboard/marketplace",
    title: "Маркетплейс",
    icon: <MarketplaceSvgIcon />,
  },
  {
    to: "/dashboard/bonus-program",
    title: "Бонусная программа",
    icon: <BonusIcon />,
  },
  {
    to: `/dashboard/settings`,
    title: "Настройки",
    icon: <SettingsIcon />,
  },
  {
    to: "/dashboard/help",
    title: "Помощь",
    icon: <HelpIcon />,
  },
];

export default function DashboardSidebarNav() {
  return (
    <nav className="dashboard-sidebar-nav">
      <ul className="dashboard-sidebar-nav-list">
        {nav.map((item, index) => (
          <li key={index} className="dashboard-sidebar-nav-list-item">
            <NavLink
              exact
              className="dashboard-sidebar-nav-list-link"
              activeClassName="dashboard-sidebar-nav-list-link-active"
              to={item.to}
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
