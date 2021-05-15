import React, { useState } from "react";

import { Row, Col, Tag, Button } from "antd";
import SendCoins from "../../SendCoins/SendCoins";
import BuyCoins from "../../BuyCoins/BuyCoins";

import "./UserBalance.less";

export default function UserBalance() {
  const [isSendCoinsVisible, setIsSendCoinsVisible] = useState(false);
  const [isBuyCoinsVisible, setIsBuyCoinsVisible] = useState(false);

  return (
    <div className="user-balance">
      <div className="user-balance-info">
        <div className="user-balance-value">124,568,521</div>

        <Tag>VTM</Tag>
      </div>

      <Row
        className="user-balance-actions"
        gutter={[
          { xl: 20, lg: 10, sm: 20, xs: 0 },
          { sm: 0, xs: 10 },
        ]}
      >
        <Col sm={6} span={12}>
          <Button
            type="primary"
            size="small"
            block
            onClick={() => setIsBuyCoinsVisible(true)}
          >
            Купить
          </Button>
        </Col>

        <Col sm={6} span={12}>
          <Button
            type="primary"
            size="small"
            block
            onClick={() => setIsSendCoinsVisible(true)}
          >
            Отправить
          </Button>
        </Col>
      </Row>

      <SendCoins
        visible={isSendCoinsVisible}
        onClose={() => setIsSendCoinsVisible(false)}
      ></SendCoins>

      <BuyCoins
        visible={isBuyCoinsVisible}
        onClose={() => setIsBuyCoinsVisible(false)}
      ></BuyCoins>
    </div>
  );
}
