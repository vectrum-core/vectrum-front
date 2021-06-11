import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";
import "./BuyPage.less";



function BuyPage() {
  const { t } = useTranslation();

  return (
    <div>
      <p>Buy Page</p>
    </div>
  );
}

export default hot(module)(BuyPage);
