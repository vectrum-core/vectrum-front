import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { Typography, Form, Input, Button } from "antd";
import * as S from "../../../store/selectors";
import * as A from "../../../store/actions";
import "./ResetPassword.less";
import "../Auth.less";



const { Title, Text, Link } = Typography;

function ResetPassword({ onChangeTab }) {
  const { t } = useTranslation();


  const [password, setPassword] = useState("");
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }


  const [password2, setPassword2] = useState("");
  const onPassword2Change = (e) => {
    setPassword2(e.target.value);
  }


  const [code, setCode] = useState("");
  const onCodeChange = (e) => {
    setCode(e.target.value);
  }


  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    if (password !== "" && password.length >= 8 && password === password2 && submitDisabled) {
      setSubmitDisabled(false);
    } else if (!submitDisabled) {
      setSubmitDisabled(true);
    }
  }, [password, password2]);


  const onSubmit = (e) => {
    if (submitDisabled) return;

    onChangeTab("LOGIN");
  }


  return (
    <div className="auth-form reset-password">
      <Title className="reset-password-title" level={2}>
        {t("Восстановление пароля")}
      </Title>

      <Text className="forgot-password-subtitle" type="secondary">
        {t("Вспомнили пароль?")}{" "}
        <Link onClick={() => onChangeTab("LOGIN")}>{t("Войти")}</Link>
      </Text>

      <Form className="reset-password-form border-less-form" layout="vertical">
        <Form.Item label={t("Новый пароль")} name="password">
          <Input
            required
            type="password" placeholder={t("Введите новый пароль")}
            value={password} minLength={8}
            onChange={onPasswordChange}
          />
        </Form.Item>

        <Form.Item label={t("Повторите пароль")} name="password-recovery">
          <Input
            required
            type="password" placeholder={t("Повторите новый пароль")}
            value={password2} minLength={8}
            onChange={onPassword2Change}
          />
        </Form.Item>

        <Form.Item label={t("Код")} name="code">
          <Input
            required
            type="number" placeholder={t("Введите код")}
            value={code} minLength={8}
            onChange={onCodeChange}
          />
        </Form.Item>

        <Form.Item className="reset-password-form-action form-action">
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            onClick={onSubmit}
          //disabled={submitDisabled}
          >{t("Изменить пароль")}</Button>
        </Form.Item>
      </Form>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(ResetPassword));
