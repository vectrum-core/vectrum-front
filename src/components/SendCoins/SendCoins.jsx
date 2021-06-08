import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import * as S from "../../store/selectors";
import * as A from "../../store/actions";
import { api } from "../../store/configureStore";
import NumberFormat from 'react-number-format';
import SendCoinsStatus from "../SendCoinsStatus/SendCoinsStatus";

import { Modal, Form, Input, Button } from "antd";
import { CloseIcon } from "../Icons/Icons";



function SendCoins({ visible, onClose }) {
  const { t, i18n } = useTranslation();

  const [amount, setAmount] = useState("");
  const onAmountChange = (e) => {
    setAmount(e.target.value);
  }

  const [isVisible, setIsVisible] = useState(false);


  const [recipient, setRecipient] = useState("");
  const onRecipientChange = (e) => {
    setRecipient(e.target.value);
  }

  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      recipient !== ""
      && recipient.length === 12
      && /^[a-z]{1,1}/.test(recipient)
      && submitDisabled
    ) {
      setSubmitDisabled(false);
    } else if (!submitDisabled) {
      setSubmitDisabled(true);
    }
  }, [recipient]);


  const onSubmit = async (e) => {
    if (submitDisabled) return;
    try {
      const res = await api.sendVtm(recipient, amount);
      if (res.ok) {
        setIsVisible(true);
        onClose();

        setAmount('');
        setRecipient('');
      } else {
        console.error(res.error);
        alert(res.error.message);
        onClose();
      }
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
  }

  return (
    <>
      <SendCoinsStatus
        visible={isVisible}
        onClose={setIsVisible}
        account={recipient}
        amount={amount}
        symbol={'VTM'}
      />

      <Modal
        title={t("Отправить VTM")}
        width="470px"
        visible={visible}
        onCancel={onClose}
        closeIcon={<CloseIcon />}
        footer={null}
      >
        <Form className="floating-label-form" layout="vertical">
          <Form.Item label={t("Введите количество VTM")} name="amount">
            <Input
              addonBefore="VTM" size="large" allowClear
              size="large" allowClear
              type="number" name="amount"
              value={amount} min="0"
              onChange={onAmountChange}
            />
          </Form.Item>

          <Form.Item label={t("Введите адрес получателя")} name="wallet">
            <Input
              size="large" allowClear
              name="recipient" type="text" pattern="^[a-z]{1,1}[a-z1-5]{11,11}$"
              value={recipient}
              onChange={onRecipientChange}
            />
          </Form.Item>

          <Form.Item className="form-action">
            <Button
              htmlType="submit" type="primary" size="large" block
              onClick={onSubmit}
            >{t("Отправить")}</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(SendCoins));

