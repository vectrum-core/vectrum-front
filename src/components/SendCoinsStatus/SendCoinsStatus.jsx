import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import * as S from "../../store/selectors";
import * as A from "../../store/actions";
import { api } from "../../store/configureStore";
import NumberFormat from 'react-number-format';


import { Modal, Button, Typography } from "antd";
import { CloseIcon } from "../Icons/Icons";
import IconSuccess from "../../assets/images/icons/IconSuccess.svg";
import "./SendCoinsStatus.less";

const { Title, Text } = Typography;



function SendCoinsStatus({
  visible, onClose,
  account, symbol, amount,
}) {
  const { t, i18n } = useTranslation();

  return (
    <Modal
      title=""
      width="470px"
      visible={visible}
      onCancel={() => onClose(false)}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <div className="send-coins-status">
        <img
          src={IconSuccess}
          className="send-coins-status-icon"
          width={70}
          alt="Success icon"
        />

        <Title className="send-coins-status-title" level={3}>
          <Trans i18n={i18n}>
            Операция произведена <br />
            успешно!
          </Trans>
        </Title>

        <Text>{t("Перевод на адрес")} {account}</Text>
        <br />
        <Text>
          <NumberFormat
            displayType={'text'}
            thousandSeparator
            decimalScale={4} fixedDecimalScale={4}
            value={amount} defaultValue={0}
            suffix={" " + symbol}
          />
        </Text>

        <Text className="send-coins-status-action-info fs-18">
          {t("Нажмите на кнопку ниже для перехода в кошелёк")}
        </Text>

        <Button
          type="primary" size="large"
          onClick={() => onClose(false)}
        >{t("Мой кошелёк")}</Button>
      </div>
    </Modal>
  );
}


const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(SendCoinsStatus));
