import React from "react";

import { Button } from "antd";
import { CopyIcon, QrIcon } from "../../Icons/Icons";

import "./UserWalletAddress.less";

export default function UserWalletAddress() {
  return (
    <div className="user-wallet-address">
      <div className="user-wallet-address-value">1erF44g4sd5f</div>

      <div className="user-wallet-address-actions">
        <Button
          className="user-wallet-address-action user-wallet-address-action-copy"
          type="link"
          size="small"
          icon={<CopyIcon />}
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
