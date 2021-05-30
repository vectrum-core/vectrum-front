import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Form, Input, Button } from "antd";
import { LoginIcon, MailIcon, TelegramIcon, LockIcon } from "../../Icons/Icons";
import * as S from "../../../store/selectors";
import * as A from "../../../store/actions";
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
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);


  const onLoginWithTelegram = () => {
  }

  const onLoginChange = (e) => {
    e.preventDefault();
    setLogin(e.target.value);
  }

  const onEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const onPasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    switch (loginType) {
      case "WITH_LOGIN":
      case "WITH_EMAIL":
      case "WITH_TELEGRAM":
        break;
      default:
        break;
    }
  }


  useEffect(() => {
    if (password !== "" && password.length >= 8 && submitDisabled) {
      setSubmitDisabled(false);
    } else if (!submitDisabled) {
      setSubmitDisabled(true);
    }
  }, [password]);

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
            <Input
              placeholder="Введите логин"
              value={login}
              onChange={onLoginChange}
            ></Input>
          </Form.Item>
        )}

        {loginType === "WITH_EMAIL" && (
          <Form.Item label="Email" name="login">
            <Input
              type="email" placeholder="Введите ваш Email"
              value={email}
              onChange={onEmailChange}
            ></Input>
          </Form.Item>
        )}

        <Form.Item label="Пароль" name="password">
          <Input
            type="password" placeholder="Введите пароль"
            value={password}
            onChange={onPasswordChange}
          ></Input>
        </Form.Item>

        <Form.Item className="login-form-action form-action">
          <RouterLink to="/dashboard">
            <Button
              htmlType="submit" type="primary" size="large" block
              onClick={onSubmit}
              disabled={submitDisabled}
            >
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: S.profile.isAuthenticated(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(Login));
