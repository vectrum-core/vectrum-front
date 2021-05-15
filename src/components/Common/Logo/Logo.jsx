import React from "react";
import { Link } from "react-router-dom";

import "./Logo.less";

import logoHeaderWhite from "../../../assets/images/logo/logo-header-white.png";
import logoHeaderBlack from "../../../assets/images/logo/logo-header-black.png";
import logoFooterWhite from "../../../assets/images/logo/logo-footer-white.svg";
import logoFooterBlack from "../../../assets/images/logo/logo-footer-black.svg";

export default function Logo({
  to = "/",
  position = "header",
  color = "white",
}) {
  if (position === "header") {
    return (
      <Link to={to} className="header-logo logo">
        {color === "white" ? (
          <img src={logoHeaderWhite} className="logo-img" alt="Logo" />
        ) : (
          <img src={logoHeaderBlack} className="logo-img" alt="Logo" />
        )}
      </Link>
    );
  } else if (position === "footer") {
    return (
      <Link to={to} className="footer-logo logo">
        {color === "white" ? (
          <img src={logoFooterWhite} className="logo-img" alt="Logo" />
        ) : (
          <img src={logoFooterBlack} className="logo-img" alt="Logo" />
        )}
      </Link>
    );
  } else {
    return (
      <Link to={to} className="logo">
        {color === "white" ? (
          <img src={logoHeaderWhite} className="logo-img" alt="Logo" />
        ) : (
          <img src={logoHeaderBlack} className="logo-img" alt="Logo" />
        )}
      </Link>
    );
  }
}
