import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import * as S from "../../store/selectors";
import * as A from "../../store/actions";
import { api } from "../../store/configureStore";

import { Modal, Button, Typography } from "antd";
import { CloseIcon } from "../Icons/Icons";
import "./LogoutAlert.less";

const { Paragraph } = Typography;



function LogoutAlert({ logOutAction }) {
  const [isVisible, setIsVisible] = useState(true);

  const [intervalId, setIntervalId] = useState(null);
  const [time, setTime] = useState(0);

  const logOut = () => {
    logOutAction();
  }

  const go = () => {
    clearInterval(intervalId);
  }

  // TODO как-то запускать счетчик обратного отсчета до выхода при бездействии пользователя
  //  const intervalMs = 60 * 1000;
  /*useEffect(() => {
    setTime(Date.now());
    setTime(Date.now());
    if (isVisible) {
      let iId = setInterval(() => {
        logOut();
      }, intervalMs);
      setIntervalId(iId);
    }
    return () => {
      clearInterval(intervalId);
    }
  }, [isVisible]);
  */

  return (
    <Modal
      title="Ой!"
      width="470px"
      wrapClassName="logout-alert-modal"
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Paragraph className="fs-18">
        <b>Похоже, вы забыли выйти из вашего кошелька.</b>
      </Paragraph>

      <Paragraph className="fs-18">
        Для безопасности выйдите из него, чтобы продолжить, либо вернитесь назад
        в кошелёк.
      </Paragraph>

      <div className="logout-alert-modal-actions">
        <Button
          type="primary" ghost={true} size="large" block
          onClick={go}
        >Назад</Button>

        <Button
          type="primary" size="large" block
          onClick={logOut}
        >Выйти из кошелька</Button>
      </div>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOutAction: () => dispatch(A.profile.reAuthenticate()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(LogoutAlert));
