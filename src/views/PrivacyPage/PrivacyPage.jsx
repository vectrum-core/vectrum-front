import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";
import "./PrivacyPage.less";



function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div>
      <p>Privacy Page</p>
    </div>
  );
}

export default hot(module)(PrivacyPage);
