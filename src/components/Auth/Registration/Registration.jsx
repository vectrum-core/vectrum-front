import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import {
  Typography,
  Form,
  Input,
  Checkbox,
  Button,
  Tooltip,
  Modal,
} from "antd";
import {
  InfoIcon,
  LoginIcon,
  MailIcon,
  TelegramIcon,
  CloseIcon,
} from "../../Icons/Icons";
import * as S from "../../../store/selectors";
import * as A from "../../../store/actions";
import { api } from "../../../store/configureStore";
import "./Registration.less";
import "../Auth.less";

import TelegramLoginWidget from '../../../components/TelegramLoginWidget';
import { telegramBotUsername } from '../../../constants';



const { Title, Text, Paragraph, Link } = Typography;



const LoginInfo = () => {
  const { t } = useTranslation();
  return (
    <Tooltip placement="left" title={t("Минимум 6 символов a-z0-9")}>
      <InfoIcon></InfoIcon>
    </Tooltip>
  );
}

const resgistrationTypes = [
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



function Registration({
  onChangeTab, setUserData,
}) {
  const { i18n, t } = useTranslation();
  const [registrationType, setRegistrationType] = useState("WITH_LOGIN");
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);


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


  const onSubmitForm = async () => {
    if (submitDisabled) return;

    if (registrationType === "WITH_LOGIN" && login.length >= 6) {
      try {
        const res = await api.profileSignUpByUsername(login, password);
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

    if (registrationType === "WITH_EMAIL") {
      try {
        const res = await api.profileSignUpByEmail(email, password);
        if (res.ok) {
          setUserData({ ...res.result, authenticated: true, });
          setIsVerifyModalVisible(true);
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
  }


  const onRegisterWithTelegram = () => {
    //setRegistrationType("WITH_TELEGRAM");
  }

  const handleTelegramResponse = async (telegramAuthData) => {
    // https://core.telegram.org/widgets/login
    const res = await api.authCheckTelegramAuthData(telegramAuthData);
    if (res.ok) {
      const res2 = await api.profileSignUpByTelegramAuthData(telegramAuthData);
      if (res2.ok) {
        setUserData({ ...res2.result, authenticated: true, });
      }
    }
  }


  const onClose = () => {
    setIsVerifyModalVisible(false);
    //onChangeTab("LOGIN"); // TODO нужно ли перекидывать на вход или сразу авторизация
  }

  const onNext = () => {
    if (code.length < 8) return;
    setIsVerifyModalVisible(false);
    onChangeTab("LOGIN"); // TODO нужно ли перекидывать на вход или сразу авторизация
  }


  return (
    <>
      <div className="auth-form registration">
        <Title className="registration-title" level={2}>
          {t("Регистрация")}
        </Title>

        <Text className="registration-subtitle" type="secondary">
          {t("Уже есть аккаунт?")}{" "}
          <Link onClick={() => onChangeTab("LOGIN")}>{t("Войти")}</Link>
        </Text>

        <div className="registration-steps">
          {resgistrationTypes.map((item, index) => (
            <Button
              key={index}
              type="link"
              icon={item.icon}
              className={
                "registration-step" +
                (item.type === registrationType ? " active" : "")
              }
              onClick={() =>
                item.type === "WITH_TELEGRAM"
                  ? onRegisterWithTelegram()
                  : setRegistrationType(item.type)
              }
            ></Button>
          ))}
        </div>

        <Form className="registration-form border-less-form" layout="vertical">
          {registrationType === "WITH_LOGIN" && (
            <Form.Item label={t("Логин")} name="login">
              <Input
                required
                type="text" placeholder={t("Введите логин")}
                addonAfter={<LoginInfo />}
                value={login} pattern="[a-z0-9]{6,}"
                onChange={onLoginChange}
              />
            </Form.Item>
          )}

          {registrationType === "WITH_EMAIL" && (
            <Form.Item label={t("Email")} name="login">
              <Input
                required
                type="email" placeholder={t("Введите ваш Email")}
                value={email}
                onChange={onEmailChange}
              />
            </Form.Item>
          )}

          {registrationType === "WITH_TELEGRAM" && (
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


          {registrationType != "WITH_TELEGRAM" && (
            <Form.Item label={t("Пароль")} name="password">
              <Input
                required
                type="password" placeholder={t("Введите пароль")}
                value={password} minLength={8}
                onChange={onPasswordChange}
              />
            </Form.Item>
          )}

          {registrationType != "WITH_TELEGRAM" && (
            <Form.Item label={t("Повторите пароль")} name="password-repeat">
              <Input
                required
                type="password" placeholder={t("Повторите пароль")}
                value={password2} minLength={8}
                onChange={onPassword2Change}
              />
            </Form.Item>
          )}

          {registrationType != "WITH_TELEGRAM" && (
            <Form.Item name="policy">
              <Checkbox
                required
                className="registration-policy"
              >
                <Trans i18n={i18n}>
                  Я согласен с условиями{" "}
                  <Link href="/terms">пользовательского соглашения</Link> и{" "}
                  <Link href="/privacy">политикой конфиденциальности</Link>.
              </Trans>
              </Checkbox>
            </Form.Item>
          )}

          {registrationType != "WITH_TELEGRAM" && (
            <Form.Item className="registration-form-action form-action">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                block
                onClick={onSubmitForm}
              >{t("Зарегистрироваться")}</Button>
            </Form.Item>
          )}
        </Form>
      </div>

      <Modal
        title={t("Подтверждение")}
        width="470px"
        wrapClassName="registration-verify-modal"
        visible={isVerifyModalVisible}
        onCancel={onClose}
        closeIcon={<CloseIcon />}
        footer={null}
      >
        <Paragraph className="fs-18">
          <Trans i18n={i18n}>
            Мы отправили письмо с кодом на указанный Вами адрес{" "}
            <Link href={`#mailto:${email}`}>
              {email}
            </Link>
          </Trans>
        </Paragraph>

        <Paragraph className="fs-18">
          {t("Пожалуйста, введите код для завершения регистрации.")}
        </Paragraph>

        <Form className="floating-label-form" layout="vertical">
          <Form.Item label={t("Введите код")} name="code">
            <Input
              required
              size="large" type="number"
              placeholder={t("Введите код из письма")}
              allowClear
              value={code} minLength={8}
              onChange={onCodeChange}
            />
          </Form.Item>

          <Form.Item className="form-action">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              onClick={onNext}
            >{t("Далее")}</Button>
          </Form.Item>
        </Form>
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
  return {
    setUserData: (data) => dispatch(A.profile.setUserData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(Registration));
