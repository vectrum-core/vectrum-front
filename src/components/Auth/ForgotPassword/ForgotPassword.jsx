import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { Row, Col, Typography, Form, Input, Button, Modal } from "antd";
import { CloseIcon } from "../../Icons/Icons";
import * as S from "../../../store/selectors";
import * as A from "../../../store/actions";
import { api } from "../../../store/configureStore";
import "./ForgotPassword.less";
import "../Auth.less";



const { Title, Text, Paragraph, Link } = Typography;



function ForgotPassword({ onChangeTab }) {
  const { i18n, t } = useTranslation();
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);


  const onEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }


  useEffect(() => {
    if (email !== "" && submitDisabled) {
      setSubmitDisabled(false);
    } else if (!submitDisabled) {
      setSubmitDisabled(true);
    }
  }, [email]);


  const onSubmitForm = async (e) => {
    if (submitDisabled) return;

    try {
      const res = await api.sendRequestPasswordRecoveryByEmail(email);
      if (res.ok) {
        setIsSuccessModalVisible(true);
      } else {
        console.error(res.error);
        alert(res.error.message);
      }
    } catch (error) { console.error(error); }
  }


  const onClose = () => {
    setIsSuccessModalVisible(false);
    onChangeTab("RESET_PASSWORD");
  }


  return (
    <>
      <div className="auth-form forgot-password">
        <Title className="forgot-password-title" level={2}>
          {t("Восстановление пароля")}
        </Title>

        <Text className="forgot-password-subtitle" type="secondary">
          {t("Вспомнили пароль?")}{" "}
          <Link onClick={() => onChangeTab("LOGIN")}>{t("Войти")}</Link>
        </Text>

        <Form
          className="forgot-password-form border-less-form"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            help={t("Укажите Email, который Вы использовали для входа на сайт.")}
          >
            <Input
              required
              type='email' name='email'
              placeholder={t("Введите Ваш Email")}
              value={email}
              onChange={onEmailChange}
            />
          </Form.Item>

          <Form.Item className="forgot-password-form-action form-action">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              onClick={onSubmitForm}
            >{t("Продолжить")}</Button>
          </Form.Item>
        </Form>
      </div>

      <Modal
        title={t("Проверьте ваш Email")}
        width="470px"
        visible={isSuccessModalVisible}
        onCancel={onClose}
        closeIcon={<CloseIcon />}
        footer={null}
      >
        <Row gutter={[0, 20]}>
          <Col span={12}>
            <Paragraph className="fs-18">
              <Trans i18n={i18n}>
                На{" "}
                <Link href={`#mailto:${email}`}>
                  {email}
                </Link>{" "}
                отправлено письмо с инструкцией по восстановлению пароля.
              </Trans>
            </Paragraph>

            <Paragraph className="fs-18">
              {t("Если вы не получили письмо, то проверьте спам.")}
            </Paragraph>
          </Col>

          <Col span={12}>
            <Button type="primary" size="large" block onClick={onClose}>
              {t("Готово")}
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: S.profile.isAuthenticated(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(ForgotPassword));
