import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";
import "./DocsPage.less";



function DocsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <p>Docs Page</p>
    </div>
  );
}

export default hot(module)(DocsPage);
