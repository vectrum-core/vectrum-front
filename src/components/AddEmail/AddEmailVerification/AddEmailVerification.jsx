import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import * as S from "../../../store/selectors";
import * as A from "../../../store/actions";
import { api } from "../../../store/configureStore";

import { Modal, Row, Col, Typography, Form, Input, Button } from "antd";
import { CloseIcon } from "../../Icons/Icons";

import "./AddEmailVerification.less";

const { Paragraph, Link } = Typography;



export default function AddEmailVerification({ visible, onClose }) {
  const { t, i18n } = useTranslation();

  return (
    <Modal
      title={t("Подтверждение")}
      width="470px"
      visible={visible}
      onCancel={onClose}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Row gutter={[0, 20]}>
        <Col span={12}>
          <Paragraph>
            <Trans i18n={i18n}>
              Мы отправили письмо с кодом на указанный Вами адрес{" "}
              <Link href="#mailto:example@vectrum.group">
                example@vectrum.group
              </Link>{" "}
              Пожалуйста, введите код для завершения регистрации.
            </Trans>
          </Paragraph>
        </Col>

        <Col span={12}>
          <Form className="floating-label-form" layout="vertical">
            <Form.Item label={t("Введите код")} name="code">
              <Input
                placeholder={t("Введите код из письма")}
                size="large"
                allowClear
              />
            </Form.Item>

            <Form.Item className="form-action">
              <Button htmlType="submit" type="primary" size="large" block>
                {t("Далее")}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
}
