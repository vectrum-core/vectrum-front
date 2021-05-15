import React, { useState } from "react";

import { Row, Col, Typography, Form, Input, Button, Modal } from "antd";
import { CloseIcon } from "../../Icons/Icons";

import "./ForgotPassword.less";
import "../Auth.less";

const { Title, Text, Paragraph, Link } = Typography;

export default function ForgotPassword({ onChangeTab }) {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  function onSubmitForm() {
    setIsSuccessModalVisible(true);
  }

  function onClose() {
    setIsSuccessModalVisible(false);
    onChangeTab("RESET_PASSWORD");
  }

  return (
    <>
      <div className="auth-form forgot-password">
        <Title className="forgot-password-title" level={2}>
          Восстановление пароля
        </Title>

        <Text className="forgot-password-subtitle" type="secondary">
          Вспомнили пароль?{" "}
          <Link onClick={() => onChangeTab("LOGIN")}>Войти</Link>
        </Text>

        <Form
          className="forgot-password-form border-less-form"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            help="Укажите Email, который Вы использовали для входа на сайт."
          >
            <Input placeholder="Введите Ваш Email"></Input>
          </Form.Item>

          <Form.Item className="forgot-password-form-action form-action">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              onClick={onSubmitForm}
            >
              Продолжить
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Modal
        title="Проверьте ваш Email"
        width="470px"
        visible={isSuccessModalVisible}
        onCancel={onClose}
        closeIcon={<CloseIcon />}
        footer={null}
      >
        <Row gutter={[0, 20]}>
          <Col span={12}>
            <Paragraph className="fs-18">
              На{" "}
              <Link href="#mailto:example@vectrum.group">
                example@vectrum.group
              </Link>{" "}
              отправлено письмо с инструкцией по восстановлению пароля.
            </Paragraph>

            <Paragraph className="fs-18">
              Если вы не получили письмо, то проверьте спам.
            </Paragraph>
          </Col>

          <Col span={12}>
            <Button type="primary" size="large" block onClick={onClose}>
              Готово
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
