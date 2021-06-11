import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";
import "./FaqPage.less";



function FaqPage() {
  const { t } = useTranslation();

  return (
    <div>
      <p>Faq Page</p>
    </div>
  );
}

export default hot(module)(FaqPage);
