import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import * as S from "../../store/selectors";
import * as A from "../../store/actions";
import { api } from "../../store/configureStore";

import { Modal, Row, Col, Typography, Form, Input, Button } from "antd";
import { CloseIcon } from "../Icons/Icons";
import AlertWalletCreaterd from "../AlertWalletCreaterd/AlertWalletCreaterd";

import "./CreateWallet.less";

const { Paragraph } = Typography;



function CreateWallet({
  visible, onClose,
  account, updateProfile,
}) {
  const { t } = useTranslation();

  if (account) onClose();


  const [isAlertVisible, setIsAlertVisible] = useState(false);


  const [newAccount, setNewAccount] = useState("");
  const onNewAccountChange = (e) => {
    setNewAccount(e.target.value);
  }


  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (
      newAccount !== ""
      && newAccount.length === 12
      && /^[a-z]{1,1}/.test(newAccount)
      && submitDisabled
    ) {
      setSubmitDisabled(false);
    } else if (!submitDisabled) {
      setSubmitDisabled(true);
    }
  }, [newAccount]);


  const onSubmit = async (e) => {
    if (submitDisabled) return;
    try {
      const res = await api.createAccount(newAccount);
      if (res.ok) {
        setIsAlertVisible(true);
        onClose();
      } else {
        console.error(res.error);
        alert(res.error.message);
        onClose();
      }
      updateProfile();
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error));
    }
  }


  return (
    <>
      <AlertWalletCreaterd
        visible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
      />

      <Modal
        title={t("Создайте адрес кошелька")}
        width="470px"
        visible={visible}
        onCancel={onClose}
        closeIcon={<CloseIcon />}
        footer={null}
      >
        <Row gutter={[0, 20]}>
          <Col span={12}>
            <Paragraph>
              {t("Адрес должен состоять из 12 символов и содержать латинские буквы a-z в нижнем регистре и цифры 1-5 и начинаться с буквы")}
            </Paragraph>
          </Col>

          <Col span={12}>
            <Form className="floating-label-form" layout="vertical">
              <Form.Item label={t("Адрес кошелька")} name="wallet-address">
                <Input
                  required
                  placeholder={t("Введите адрес кошелька")}
                  size="large"
                  allowClear
                  name="newAccount" type="text" pattern="^[a-z]{1,1}[a-z1-5]{11,11}$"
                  value={newAccount}
                  onChange={onNewAccountChange}
                />
              </Form.Item>

              <Form.Item className="form-action">
                <Button
                  htmlType="submit" type="primary" size="large" block
                  onClick={onSubmit}
                >{t("Создать адрес")}</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    account: S.profile.getAccount(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: () => dispatch(A.profile.update()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(CreateWallet));
