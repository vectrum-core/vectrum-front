import React from "react";

import { Modal, Form, Input, Button } from "antd";
import { CloseIcon } from "../Icons/Icons";

export default function SendCoins({ visible, onClose }) {
  return (
    <Modal
      title="Отправить VTM"
      width="470px"
      visible={visible}
      onCancel={onClose}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Form className="floating-label-form" layout="vertical">
        <Form.Item label="Введите количество VTM" name="amount">
          <Input addonBefore="VTM" size="large" allowClear></Input>
        </Form.Item>

        <Form.Item label="Введите адрес получателя" name="wallet">
          <Input size="large" allowClear></Input>
        </Form.Item>

        <Form.Item className="form-action">
          <Button htmlType="submit" type="primary" size="large" block>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
