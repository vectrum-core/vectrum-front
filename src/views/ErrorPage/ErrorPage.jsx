import React from "react";
import { Link } from "react-router-dom";

// import Header from "../components/Header/Header";
import LandingPageFooter from "../LandingPage/LandingPageFooter/LandingPageFooter";
import { Button } from "antd";

import Image404 from "../../assets/images/404.png";

import "./ErrorPage.less";

export default function ErrorPage() {
  return (
    <div className="error-page">
      {/* <Header></Header> */}

      <div className="error-page-content">
        <div className="error-page-img">
          <img src={Image404} alt="404" />
        </div>

        <div className="error-page-text">
          Возможно, вы ошиблись в адресе или страница была перемещена
        </div>

        <Link to="/dashboard">
          <Button className="error-page-back-btn" type="primary" size="large">
            Вернуться на главную
          </Button>
        </Link>
      </div>

      <LandingPageFooter></LandingPageFooter>
    </div>
  );
}
