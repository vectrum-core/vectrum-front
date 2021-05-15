import React, { useState } from "react";

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

import "./Registration.less";
import "../Auth.less";

const { Title, Text, Paragraph, Link } = Typography;

const LoginInfo = () => (
  <Tooltip placement="left" title="Some login info">
    <InfoIcon></InfoIcon>
  </Tooltip>
);

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

export default function Registration({ onChangeTab }) {
  const [registrationType, setRegistrationType] = useState("WITH_LOGIN");
  const [isVerifyModalVisible, setIsVerifyModalVisible] = useState(false);

  function onRegisterWithTelegram() {}

  function onSubmitForm() {
    setIsVerifyModalVisible(true);
  }

  function onClose() {
    setIsVerifyModalVisible(false);
    onChangeTab("LOGIN");
  }

  return (
    <>
      <div className="auth-form registration">
        <Title className="registration-title" level={2}>
          Регистрация
        </Title>

        <Text className="registration-subtitle" type="secondary">
          Уже есть аккаунт?{" "}
          <Link onClick={() => onChangeTab("LOGIN")}>Войти</Link>
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
                  ? onRegisterWithTelegram
                  : setRegistrationType(item.type)
              }
            ></Button>
          ))}
        </div>

        <Form className="registration-form border-less-form" layout="vertical">
          {registrationType === "WITH_LOGIN" && (
            <Form.Item label="Логин" name="login">
              <Input
                placeholder="Введите логин"
                addonAfter={<LoginInfo />}
              ></Input>
            </Form.Item>
          )}

          {registrationType === "WITH_EMAIL" && (
            <Form.Item label="Email" name="login">
              <Input type="email" placeholder="Введите ваш Email"></Input>
            </Form.Item>
          )}

          <Form.Item label="Пароль" name="password">
            <Input type="password" placeholder="Введите пароль"></Input>
          </Form.Item>

          <Form.Item label="Повторите пароль" name="password-repeat">
            <Input type="password" placeholder="Повторите пароль"></Input>
          </Form.Item>

          <Form.Item name="policy">
            <Checkbox className="registration-policy">
              Я согласен с условиями{" "}
              <Link href="/">пользовательского соглашения</Link> и{" "}
              <Link href="/">политикой конфиденциальности</Link>.
            </Checkbox>
          </Form.Item>

          <Form.Item className="registration-form-action form-action">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              onClick={onSubmitForm}
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Modal
        title="Подтверждение"
        width="470px"
        wrapClassName="registration-verify-modal"
        visible={isVerifyModalVisible}
        onCancel={onClose}
        closeIcon={<CloseIcon />}
        footer={null}
      >
        <Paragraph className="fs-18">
          Мы отправили письмо с кодом на указанный Вами адрес{" "}
          <Link href="#mailto:example@vectrum.group">
            example@vectrum.group
          </Link>
        </Paragraph>

        <Paragraph className="fs-18">
          Пожалуйста, введите код для завершения регистрации.
        </Paragraph>

        <Form className="floating-label-form" layout="vertical">
          <Form.Item label="Введите код" name="code">
            <Input
              size="large"
              placeholder="Введите код из письма"
              allowClear
            ></Input>
          </Form.Item>

          <Form.Item className="form-action">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              onClick={onClose}
            >
              Далее
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
