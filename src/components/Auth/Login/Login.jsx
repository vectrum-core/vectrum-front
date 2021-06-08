import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { Typography, Form, Input, Button } from "antd";
import { LoginIcon, MailIcon, TelegramIcon, LockIcon } from "../../Icons/Icons";
import * as S from "../../../store/selectors";
import * as A from "../../../store/actions";
import { api } from "../../../store/configureStore";
import "./Login.less";
import "../Auth.less";

import TelegramLoginWidget from '../../../components/TelegramLoginWidget';
import { telegramBotUsername } from '../../../constants';


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



function Login({
  onChangeTab,
  setUserData,
}) {
  const { i18n, t } = useTranslation();

  const [loginType, setLoginType] = useState("WITH_LOGIN");
  const [submitDisabled, setSubmitDisabled] = useState(true);


  const onLoginWithTelegram = () => {
    //setLoginType("WITH_TELEGRAM")
  }

  const handleTelegramResponse = async (telegramAuthData) => {
    // https://core.telegram.org/widgets/login
    const res = await api.authCheckTelegramAuthData(telegramAuthData);
    if (res.ok) {
      const res2 = await api.profileSignInByTelegramAuthData(telegramAuthData);
      if (res2.ok) {
        setUserData({ ...res2.result, authenticated: true, });
      }
    }
  }


  const [login, setLogin] = useState("");
  const onLoginChange = (e) => {
    setLogin(e.target.value);
  }


  const [email, setEmail] = useState("");
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }


  const [password, setPassword] = useState("");
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }


  const onSubmit = async (e) => {
    if (submitDisabled) return;

    if (loginType == "WITH_LOGIN") {
      try {
        const res = await api.profileSignInByUsername(login, password);
        if (res.ok) {
          setUserData({ ...res.result, authenticated: true, });
        } else {
          console.error(res.error);
          alert(res.error.message);
        }
      } catch (error) {
        console.error(error);
        alert(JSON.stringify(error));
      }
      return;
    }

    if (loginType == "WITH_EMAIL") {
      try {
        const res = await api.profileSignInByEmail(email, password);
        if (res.ok) {
          setUserData({ ...res.result, authenticated: true, });
        } else {
          console.error(res.error);
          alert(res.error.message);
        }
      } catch (error) {
        console.error(error);
        alert(JSON.stringify(error));
      }
      return;
    }

    if (loginType == "WITH_TELEGRAM") {
      return;
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
        {t("Войти")}
      </Title>

      <Text className="login-subtitle" type="secondary">
        {t("Новый пользователь?")}{" "}
        <Link onClick={() => onChangeTab("REGISTRATION")}>
          {t("Зарегистрироваться")}
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
                ? onLoginWithTelegram()
                : setLoginType(item.type)
            }
          ></Button>
        ))}
      </div>

      <Form className="login-form border-less-form" layout="vertical">
        {loginType === "WITH_LOGIN" && (
          <Form.Item label={t("Логин")} name="login">
            <Input
              placeholder={t("Введите логин")}
              value={login}
              onChange={onLoginChange}
            />
          </Form.Item>
        )}

        {loginType === "WITH_EMAIL" && (
          <Form.Item label={t("Email")} name="login">
            <Input
              type="email" placeholder={t("Введите ваш Email")}
              value={email}
              onChange={onEmailChange}
            />
          </Form.Item>
        )}

        {loginType === "WITH_TELEGRAM" && (
          <Form.Item label={t("Telegram")} name="login">
            <TelegramLoginWidget
              dataOnauth={handleTelegramResponse}
              botName={telegramBotUsername}
              requestAccess={'write'}
              lang={i18n.language}
              usePic={true}
            />
          </Form.Item>
        )}

        {loginType != "WITH_TELEGRAM" && (
          <Form.Item label={t("Пароль")} name="password">
            <Input
              type="password" placeholder={t("Введите пароль")}
              value={password}
              onChange={onPasswordChange}
            />
          </Form.Item>
        )}

        {loginType != "WITH_TELEGRAM" && (
          <Form.Item className="login-form-action form-action">
            <Button
              htmlType="submit" type="primary" size="large" block
              onClick={onSubmit}
            //disabled={submitDisabled}
            >{t("Войти")}</Button>

            <Button
              htmlType="button"
              type="link"
              block
              className="fw-400"
              onClick={() => onChangeTab("FORGOT_PASSWORD")}
            >
              <Text type="secondary">
                <LockIcon style={{ marginRight: "5px" }}></LockIcon>
                {t("Забыли пароль?")}
              </Text>
            </Button>
          </Form.Item>
        )}
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
  return {
    setUserData: (data) => dispatch(A.profile.setUserData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(Login));
