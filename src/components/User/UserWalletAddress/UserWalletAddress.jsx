import React from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import * as S from "../../../store/selectors";

import { Button } from "antd";
import { CopyIcon, QrIcon } from "../../Icons/Icons";
import copy from 'copy-to-clipboard';
import "./UserWalletAddress.less";



function UserWalletAddress({ account }) {
  return (
    <div className="user-wallet-address">
      <div className="user-wallet-address-value">{account}</div>

      <div className="user-wallet-address-actions">
        <Button
          className="user-wallet-address-action user-wallet-address-action-copy"
          type="link"
          size="small"
          icon={<CopyIcon />}
          onClick={() => copy(account)}
        ></Button>

        <Button
          className="user-wallet-address-action"
          type="link"
          size="small"
          icon={<QrIcon />}
        ></Button>
      </div>
    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    account: S.profile.getAccount(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(UserWalletAddress));
