import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card } from "antd";

import Logo from "../../../components/Common/Logo/Logo";
import Social from "../../../components/Common/Social/Social";
import { projectEmailSupport } from "../../../constants";
import "./DashboardFooter.less";




function DashboardFooter() {
  const { t } = useTranslation();

  const nav = [
    [
      {
        to: "/about",
        title: t("О кошельке"),
      },
      {
        href: "/buy",
        title: t("Купить"),
      },
      {
        to: "faq",
        title: t("FAQ"),
      },
      {
        href: `mailto:${projectEmailSupport}`,
        title: t("Служба поддержки"),
      },
    ],
    [
      {
        href: "/docs",
        title: t("Документация"),
      },
      {
        href: "/privacy",
        title: t("Политика конфиденциальности"),
      },
      {
        href: "/terms",
        title: t("Пользовательское соглашение"),
      },
    ],
  ];

  return (
    <footer className="dashboard-footer">
      <Card bordered={false}>
        <div className="dashboard-footer-container">
          <Logo position="footer" color="black"></Logo>

          {nav.map((items, listIndex) => (
            <ul key={listIndex} className="dashboard-footer-nav-list">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="dashboard-footer-nav-list-item">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="dashboard-footer-nav-list-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      className="dashboard-footer-nav-list-link"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ))}

          <Social dark></Social>
        </div>
      </Card>
    </footer>
  );
}

export default hot(module)(DashboardFooter);
