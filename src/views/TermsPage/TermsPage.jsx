import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";
import "./TermsPage.less";



function TermsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <p>Terms Page</p>
    </div>
  );
}

export default hot(module)(TermsPage);
