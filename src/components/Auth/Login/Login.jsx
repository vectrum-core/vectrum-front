import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { Link as RouterLink } from "react-router-dom";

import { Typography, Form, Input, Button } from "antd";
import { LoginIcon, MailIcon, TelegramIcon, LockIcon } from "../../Icons/Icons";

import "./Login.less";
import "../Auth.less";

const { Title, Text, Link } = Typography;

const loginTypes = [
  {
    type: "WITH_LOGIN",
    icon: <LoginIcon />,
  },
  {
    type: "WITH_EMAIL",
    icon: <MailIcon />,
  },
  {
    type: "WITH_TELEGRAM",
    icon: <TelegramIcon />,
  },
];

function Login({ onChangeTab }) {
  const [loginType, setLoginType] = useState("WITH_LOGIN");

  function onLoginWithTelegram() { }

  return (
    <div className="auth-form login">
      <Title className="login-title" level={2}>
        Войти
      </Title>

      <Text className="login-subtitle" type="secondary">
        Новый пользователь?{" "}
        <Link onClick={() => onChangeTab("REGISTRATION")}>
          Зарегистрироваться
        </Link>
      </Text>

      <div className="login-steps">
        {loginTypes.map((item, index) => (
          <Button
            key={index}
            type="link"
            icon={item.icon}
            className={
              "login-step" + (item.type === loginType ? " active" : "")
            }
            onClick={() =>
              item.type === "WITH_TELEGRAM"
                ? onLoginWithTelegram
                : setLoginType(item.type)
            }
          ></Button>
        ))}
      </div>

      <Form className="login-form border-less-form" layout="vertical">
        {loginType === "WITH_LOGIN" && (
          <Form.Item label="Логин" name="login">
            <Input placeholder="Введите логин"></Input>
          </Form.Item>
        )}

        {loginType === "WITH_EMAIL" && (
          <Form.Item label="Email" name="login">
            <Input type="email" placeholder="Введите ваш Email"></Input>
          </Form.Item>
        )}

        <Form.Item label="Пароль" name="password">
          <Input type="password" placeholder="Введите пароль"></Input>
        </Form.Item>

        <Form.Item className="login-form-action form-action">
          <RouterLink to="/dashboard">
            <Button htmlType="submit" type="primary" size="large" block>
              Войти
            </Button>
          </RouterLink>

          <Button
            htmlType="button"
            type="link"
            block
            className="fw-400"
            onClick={() => onChangeTab("FORGOT_PASSWORD")}
          >
            <Text type="secondary">
              <LockIcon style={{ marginRight: "5px" }}></LockIcon>
              Забыли пароль?
            </Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default hot(module)(Login);
