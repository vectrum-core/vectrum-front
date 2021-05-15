import React from "react";

import { Modal, Row, Col, Typography, Form, Input, Button } from "antd";
import { CloseIcon } from "../../Icons/Icons";

import "./AddEmailVerification.less";

const { Paragraph, Link } = Typography;

export default function AddEmailVerification({ visible, onClose }) {
  return (
    <Modal
      title="Подтверждение"
      width="470px"
      visible={visible}
      onCancel={onClose}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Row gutter={[0, 20]}>
        <Col span={12}>
          <Paragraph>
            Мы отправили письмо с кодом на указанный Вами адрес{" "}
            <Link href="#mailto:example@vectrum.group">
              example@vectrum.group
            </Link>{" "}
            Пожалуйста, введите код для завершения регистрации.
          </Paragraph>
        </Col>

        <Col span={12}>
          <Form className="floating-label-form" layout="vertical">
            <Form.Item label="Введите код " name="code">
              <Input
                placeholder="Введите код из письма"
                size="large"
                allowClear
              ></Input>
            </Form.Item>

            <Form.Item className="form-action">
              <Button htmlType="submit" type="primary" size="large" block>
                Далее
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}
