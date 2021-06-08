import React, { useState } from "react";
import { hot } from "react-hot-loader";

import LandingPageHeader from "./LandingPageHeader/LandingPageHeader";
import LandingPageMain from "./LandingPageMain/LandingPageMain";
import LandingPageAbout from "./LandingPageAbout/LandingPageAbout";
import LandingPageAdvantage from "./LandingPageAdvantage/LandingPageAdvantage";
import LandingPageBlockchain from "./LandingPageBlockchain/LandingPageBlockchain";
import LandingPageFaq from "./LandingPageFaq/LandingPageFaq";
import LandingPageFooter from "./LandingPageFooter/LandingPageFooter";

import AddEmail from "../../components/AddEmail/AddEmail";
import AddEmailVerification from "../../components/AddEmail/AddEmailVerification/AddEmailVerification";

import "./LandingPage.less";

function LandingPage() {
  const [isAddEmailVisible, setIsAddEmailVisible] = useState(false);
  const [
    isAddEmailVerificationVisible,
    setIsAddEmailVerificationVisible,
  ] = useState(false);

  return (
    <>
      <LandingPageHeader></LandingPageHeader>

      <div className="landing-page">
        <LandingPageMain></LandingPageMain>
        <LandingPageAbout></LandingPageAbout>
        <LandingPageAdvantage></LandingPageAdvantage>
        <LandingPageBlockchain></LandingPageBlockchain>
        <LandingPageFaq></LandingPageFaq>
        <LandingPageFooter></LandingPageFooter>
      </div>

      <AddEmail
        visible={isAddEmailVisible}
        onClose={() => setIsAddEmailVisible(false)}
      />

      <AddEmailVerification
        visible={isAddEmailVerificationVisible}
        onClose={() => setIsAddEmailVerificationVisible(false)}
      />
    </>
  );
}

export default hot(module)(LandingPage);
