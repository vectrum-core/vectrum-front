import React from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import { Link as AnchorLink } from "react-scroll";

import { scrollOptions } from "../../../../assets/js/const/index";
import "./DashboardHeaderNav.less";



function HeaderNav({ list }) {
  return (
    <nav className="dashboard-header-nav">
      <ul className="dashboard-header-nav-list">
        {list.map((item, index) => (
          <li key={index} className="dashboard-header-nav-list-item">
            {
              item.href && (
                <a
                  href={item.href}
                  className="dashboard-header-nav-list-link"
                  target="_blank"
                  rel="noreferrer"
                >{item.title}</a>
              )
            }
            {
              item.id && (
                <AnchorLink
                  to={item.id}
                  {...scrollOptions}
                  className="dashboard-header-nav-list-link"
                >{item.label}</AnchorLink>
              )
            }
            {
              item.to && (
                <Link
                  to={item.to}
                  className="dashboard-header-nav-list-link"
                >{item.label}</Link>
              )
            }
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default hot(module)(HeaderNav);
