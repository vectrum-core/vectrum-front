import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import Logo from "../../../components/Common/Logo/Logo";
import Social from "../../../components/Common/Social/Social";
import { projectEmailSupport } from "../../../constants";
import "./DashboardFooter.less";



const nav = [
  [
    {
      to: "/about",
      title: "О кошельке",
    },
    {
      href: "/buy",
      title: "Купить",
    },
    {
      to: "faq",
      title: "FAQ",
    },
    {
      href: `mailto:${projectEmailSupport}`,
      title: "Служба поддержки",
    },
  ],
  [
    {
      href: "/docs",
      title: "Документация",
    },
    {
      href: "/privacy",
      title: "Политика конфиденциальности",
    },
    {
      href: "/terms",
      title: "Пользовательское соглашение",
    },
  ],
];

export default function DashboardFooter() {
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
