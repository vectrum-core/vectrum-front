import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";

import { Modal, Row, Col, Typography, Button } from "antd";
import { CloseIcon } from "../Icons/Icons";

import "./AlertWalletCreaterd.less";

const { Paragraph } = Typography;



function AlertWalletCreaterd({ visible, onClose }) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("Спасибо!")}
      width="470px"
      visible={visible}
      onCancel={onClose}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Row gutter={[0, 20]}>
        <Col span={12}>
          <Paragraph>{t("Адрес кошелька успешно создан.")}</Paragraph>

          {/*<Paragraph>
            {t("Вы можете использовать адрес кошелька для входа в личный кабинет по логину.")}
          </Paragraph>*/}
        </Col>

        <Col span={12}>
          <Button type="primary" size="large" block onClick={onClose}>
            {t("Готово")}
          </Button>
        </Col>
      </Row>
    </Modal>
  );
}

export default hot(module)(AlertWalletCreaterd);
