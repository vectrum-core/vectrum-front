import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import * as S from "../../store/selectors";
import * as A from "../../store/actions";
import { api } from "../../store/configureStore";

import { Modal, Row, Col, Typography, Form, Input, Button } from "antd";
import { CloseIcon } from "../Icons/Icons";

import "./AddEmail.less";

const { Paragraph } = Typography;



export default function AddEmail({ visible, onClose }) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("Добавьте почту")}
      width="470px"
      visible={visible}
      onCancel={onClose}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Row gutter={[0, 20]}>
        <Col span={12}>
          <Paragraph>
            {t("В целях улучшения безопасности, а также возможности восстановления доступа к вашему аккаунту, рекомендуем Вам добавить адрес электронной почты.")}
          </Paragraph>
        </Col>

        <Col span={12}>
          <Form className="floating-label-form" layout="vertical">
            <Form.Item label={t("Введите Email")} name="email">
              <Input
                placeholder={t("Введите Ваш Email")}
                size="large"
                allowClear
              />
            </Form.Item>

            <Form.Item className="form-action">
              <Button htmlType="submit" type="primary" size="large" block>
                {t("Добавить почту")}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}
