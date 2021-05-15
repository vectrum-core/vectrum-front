import React, { useState } from "react";

import { Modal, Button, Typography } from "antd";

import { CloseIcon } from "../Icons/Icons";

import IconSuccess from "../../assets/images/icons/IconSuccess.svg";

import "./SendCoinsStatus.less";

const { Title, Text } = Typography;

export default function SendCoinsStatus() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Modal
      title=""
      width="470px"
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <div className="send-coins-status">
        <img
          src={IconSuccess}
          className="send-coins-status-icon"
          width={70}
          alt="Success icon"
        />

        <Title className="send-coins-status-title" level={3}>
          Операция произведена <br />
          успешно!
        </Title>

        <Text>Перевод на адрес 1erF44g4sd5f</Text>
        <br />
        <Text>10,000 VTM</Text>

        <Text className="send-coins-status-action-info fs-18">
          Нажмите на кнопку ниже для перехода в кошелёк
        </Text>

        <Button type="primary" size="large">
          Мой кошелёк
        </Button>
      </div>
    </Modal>
  );
}
