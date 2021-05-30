import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import * as S from "../../../store/selectors";
import * as A from "../../../store/actions";
import { api } from "../../../store/configureStore";
import NumberFormat from 'react-number-format';

import { Row, Col, Tag, Button } from "antd";
import SendCoins from "../../SendCoins/SendCoins";
import BuyCoins from "../../BuyCoins/BuyCoins";

import "./UserBalance.less";


function UserBalance({ account }) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  const [isSendCoinsVisible, setIsSendCoinsVisible] = useState(false);
  const [isBuyCoinsVisible, setIsBuyCoinsVisible] = useState(false);

  const [balance, setBalance] = useState('0.0000');
  const updateBalance = async () => {
    try {
      if (account) {
        const res = await api.vectrum.rpc.get_currency_balance('eosio.token', account, 'VTM');
        if (res.length > 0) {
          setBalance(res[0].split(' ')[0]);
        }
      }
    } catch (error) {
      console.error(error);
      setBalance('0.0000');
    }
  }

  useEffect(() => {
    try {
      updateBalance();
    } catch (error) { console.log(error); }
  }, [time]);

  return (
    <div className="user-balance">
      <div className="user-balance-info">
        <div className="user-balance-value">
          <NumberFormat
            displayType={'text'}
            defaultValue={0}
            thousandSeparator={true}
            value={balance}
          />
        </div>

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


const mapStateToProps = (state) => {
  return {
    account: S.profile.getAccount,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(UserBalance));
