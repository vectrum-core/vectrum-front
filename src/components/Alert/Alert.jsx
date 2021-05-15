import React from "react";

import { Modal, Row, Col, Typography, Button } from "antd";
import { CloseIcon } from "../Icons/Icons";

import "./Alert.less";

const { Paragraph } = Typography;

export default function Alert({ visible, onClose }) {
  return (
    <Modal
      title="Спасибо!"
      width="470px"
      visible={visible}
      onCancel={onClose}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Row gutter={[0, 20]}>
        <Col span={12}>
          <Paragraph>Адрес кошелька успешно создан.</Paragraph>

          <Paragraph>
            Вы можете использовать адрес кошелька для входа в личный кабинет по
            логину.
          </Paragraph>
        </Col>

        <Col span={12}>
          <Button type="primary" size="large" block>
            Готово
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}
