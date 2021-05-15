import React, { useState } from "react";

import LandingPageHeader from "./LandingPageHeader/LandingPageHeader";
import LandingPageMain from "./LandingPageMain/LandingPageMain";
import LandingPageAbout from "./LandingPageAbout/LandingPageAbout";
import LandingPageAdvantage from "./LandingPageAdvantage/LandingPageAdvantage";
import LandingPageBlockchain from "./LandingPageBlockchain/LandingPageBlockchain";
import LandingPageFaq from "./LandingPageFaq/LandingPageFaq";
import LandingPageFooter from "./LandingPageFooter/LandingPageFooter";

import CreateWallet from "../../components/CreateWallet/CreateWallet";
import AddEmail from "../../components/AddEmail/AddEmail";
import AddEmailVerification from "../../components/AddEmail/AddEmailVerification/AddEmailVerification";
import Alert from "../../components/Alert/Alert";

import "./LandingPage.less";

export default function LandingPage() {
  const [isCreateWalletVisible, setIsCreateWalletVisible] = useState(true);
  const [isAddEmailVisible, setIsAddEmailVisible] = useState(true);
  const [
    isAddEmailVerificationVisible,
    setIsAddEmailVerificationVisible,
  ] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(true);

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

      <CreateWallet
        visible={isCreateWalletVisible}
        onClose={() => setIsCreateWalletVisible(false)}
      />

      <AddEmail
        visible={isAddEmailVisible}
        onClose={() => setIsAddEmailVisible(false)}
      />

      <AddEmailVerification
        visible={isAddEmailVerificationVisible}
        onClose={() => setIsAddEmailVerificationVisible(false)}
      />

      <Alert
        visible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
      />
    </>
  );
}
