import React, { useState } from "react";

import { Modal, Button, Typography } from "antd";

import { CloseIcon } from "../Icons/Icons";

import "./LogoutAlert.less";

const { Paragraph } = Typography;

export default function LogoutAlert() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Modal
      title="Ой!"
      width="470px"
      wrapClassName="logout-alert-modal"
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Paragraph className="fs-18">
        <b>Похоже, вы забыли выйти из вашего кошелька.</b>
      </Paragraph>

      <Paragraph className="fs-18">
        Для безопасности выйдите из него, чтобы продолжить, либо вернитесь назад
        в кошелёк.
      </Paragraph>

      <div className="logout-alert-modal-actions">
        <Button type="primary" ghost={true} size="large" block>
          Назад
        </Button>

        <Button type="primary" size="large" block>
          Выйти из кошелька
        </Button>
      </div>
    </Modal>
  );
}
