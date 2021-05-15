import React from "react";
// import { Link } from "react-router-dom";

import { Link as AnchorLink } from "react-scroll";

import { scrollOptions } from "../../../../assets/js/const/index";

import "./DashboardHeaderNav.less";

export default function HeaderNav({ list }) {
  return (
    <nav className="dashboard-header-nav">
      <ul className="dashboard-header-nav-list">
        {list.map((item, index) => (
          <li key={index} className="dashboard-header-nav-list-item">
            {item.href ? (
              <a
                href={item.href}
                className="dashboard-header-nav-list-link"
                target="_blank"
                rel="noreferrer"
              >
                {item.title}
              </a>
            ) : (
              <AnchorLink
                to={item.id}
                {...scrollOptions}
                className="dashboard-header-nav-list-link"
              >
                {item.label}
              </AnchorLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
