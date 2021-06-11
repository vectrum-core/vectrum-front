import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";
import "./ExplorerPage.less";



function ExplorerPage() {
  const { t } = useTranslation();

  return (
    <div>
      <p>Explorer Page</p>
    </div>
  );
}

export default hot(module)(ExplorerPage);
