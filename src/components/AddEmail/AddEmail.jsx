import React from "react";

import { Modal, Row, Col, Typography, Form, Input, Button } from "antd";
import { CloseIcon } from "../Icons/Icons";

import "./AddEmail.less";

const { Paragraph } = Typography;

export default function AddEmail({ visible, onClose }) {
  return (
    <Modal
      title="Добавьте почту"
      width="470px"
      visible={visible}
      onCancel={onClose}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Row gutter={[0, 20]}>
        <Col span={12}>
          <Paragraph>
            В целях улучшения безопасности, а также возможности восстановления
            доступа к вашему аккаунту, рекомендуем Вам добавить адрес
            электронной почты.
          </Paragraph>
        </Col>

        <Col span={12}>
          <Form className="floating-label-form" layout="vertical">
            <Form.Item label="Введите Email" name="email">
              <Input
                placeholder="Введите Ваш Email"
                size="large"
                allowClear
              ></Input>
            </Form.Item>

            <Form.Item className="form-action">
              <Button htmlType="submit" type="primary" size="large" block>
                Добавить почту
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}
