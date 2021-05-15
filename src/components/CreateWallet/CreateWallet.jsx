import React from "react";

import { Modal, Row, Col, Typography, Form, Input, Button } from "antd";
import { CloseIcon } from "../Icons/Icons";

import "./CreateWallet.less";

const { Paragraph } = Typography;

export default function CreateWallet({ visible, onClose }) {
  return (
    <Modal
      title="Создайте адрес кошелька"
      width="470px"
      visible={visible}
      onCancel={onClose}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Row gutter={[0, 20]}>
        <Col span={12}>
          <Paragraph>
            Адрес должен состоять из 12 символов и содержать латинские буквы и
            цифры.
          </Paragraph>
        </Col>

        <Col span={12}>
          <Form className="floating-label-form" layout="vertical">
            <Form.Item label="Адрес кошелька" name="wallet-address">
              <Input
                placeholder="Введите адрес кошелька"
                size="large"
                allowClear
              ></Input>
            </Form.Item>

            <Form.Item className="form-action">
              <Button htmlType="submit" type="primary" size="large" block>
                Создать адрес
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}
