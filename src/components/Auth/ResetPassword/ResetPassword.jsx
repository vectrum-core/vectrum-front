import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { Typography, Form, Input, Button } from "antd";
import * as S from "../../../store/selectors";
import * as A from "../../../store/actions";
import "./ResetPassword.less";
import "../Auth.less";



const { Title, Text, Link } = Typography;

function ResetPassword({ onChangeTab }) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);


  const onPasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const onPassword2Change = (e) => {
    e.preventDefault();
    setPassword2(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    onChangeTab("LOGIN");
  }

  useEffect(() => {
    if (password !== "" && password.length >= 8 && password === password2 && submitDisabled) {
      setSubmitDisabled(false);
    } else if (!submitDisabled) {
      setSubmitDisabled(true);
    }
  }, [password, password2]);

  return (
    <div className="auth-form reset-password">
      <Title className="reset-password-title" level={2}>
        Восстановление пароля
      </Title>

      <Text className="forgot-password-subtitle" type="secondary">
        Вспомнили пароль?{" "}
        <Link onClick={() => onChangeTab("LOGIN")}>Войти</Link>
      </Text>

      <Form className="reset-password-form border-less-form" layout="vertical">
        <Form.Item label="Новый пароль" name="password">
          <Input
            type="password" placeholder="Введите новый пароль"
            value={password}
            onChange={onPasswordChange}
          ></Input>
        </Form.Item>

        <Form.Item label="Повторите пароль" name="password-recovery">
          <Input
            type="password" placeholder="Повторите новый пароль"
            value={password2}
            onChange={onPassword2Change}
          ></Input>
        </Form.Item>

        <Form.Item className="reset-password-form-action form-action">
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            onClick={onSubmit}
            disabled={submitDisabled}
          >
            Изменить пароль
          </Button>
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
