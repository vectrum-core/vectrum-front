import React from "react";
import { hot } from "react-hot-loader";

import { Typography, Form, Input, Button } from "antd";

import "./ResetPassword.less";
import "../Auth.less";

const { Title, Text, Link } = Typography;

function ResetPassword({ onChangeTab }) {
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
          <Input type="password" placeholder="Введите новый пароль"></Input>
        </Form.Item>

        <Form.Item label="Повторите пароль" name="password-recovery">
          <Input type="password" placeholder="Повторите новый пароль"></Input>
        </Form.Item>

        <Form.Item className="reset-password-form-action form-action">
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            onClick={() => onChangeTab("LOGIN")}
          >
            Изменить пароль
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default hot(module)(ResetPassword);
