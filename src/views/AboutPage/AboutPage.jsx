import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";
import "./AboutPage.less";



function AboutPage() {
  const { t } = useTranslation();

  return (
    <div>
      <p>About Page</p>
    </div>
  );
}

export default hot(module)(AboutPage);
