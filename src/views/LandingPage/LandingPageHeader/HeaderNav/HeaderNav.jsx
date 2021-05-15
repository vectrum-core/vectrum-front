import React from "react";
// import { Link } from "react-router-dom";

import { Link as AnchorLink } from "react-scroll";

import { scrollOptions } from "../../../../assets/js/const/index";

import "./HeaderNav.less";

export default function HeaderNav({ list, mode }) {
  return (
    <nav
      className={
        "header-nav" + (mode === "landing" ? " header-nav-landing" : "")
      }
    >
      <ul className="header-nav-list">
        {list.map((item, index) => (
          <li key={index} className="header-nav-list-item">
            {item.href ? (
              <a
                href={item.href}
                className="header-nav-list-link"
                target="_blank"
                rel="noreferrer"
              >
                {item.title}
              </a>
            ) : (
              <AnchorLink
                to={item.id}
                {...scrollOptions}
                className="header-nav-list-link"
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
