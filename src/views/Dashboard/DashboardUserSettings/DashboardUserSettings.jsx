import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import * as S from "../../../store/selectors";
import * as A from "../../../store/actions";
import { api } from "../../../store/configureStore";


import {
  Card,
  Row,
  Col,
  Collapse,
  Form,
  Input,
  Button,
  Typography,
  Alert,
} from "antd";

import "./DashboardUserSettings.less";

const { Title } = Typography;
const { Panel } = Collapse;



const PanelHeader = ({
  label,
  value,
  noAction,
  active,
  actionText = "Изменить",
  onTogglePane,
}) => {
  const { t } = useTranslation();
  return (
    <div className="panel-header">
      <div className="panel-header-label">
        <b>{label}</b>
      </div>

      <div className="panel-header-value">{value}</div>

      <div className="panel-header-action">
        <Button type="link" disabled={noAction} onClick={onTogglePane}>
          {active ? t("Отмена") : actionText}
        </Button>
      </div>
    </div>
  );
}



function DashboardUserSettings({
  isAuthenticated,
  account,
  //email,
}) {
  const [activePane, setActivePane] = useState("");
  const { t } = useTranslation();


  const [time, setTime] = useState(0);
  const intervalMs = 60 * 1000;
  useEffect(() => {
    setTime(Date.now());
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, intervalMs);
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  const [state, setState] = useState({});
  const updateUserData = async () => {
    if (!isAuthenticated) return;
    const res = await api.profileGetData();
    if (res.ok) {
      setState(res.result)
    }
  }

  useEffect(() => {
    try {
      updateUserData();
    } catch (error) { console.log(error); }
  }, [time]);


  // TODO timeout для закрытия
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="dashboard-user-settings">
      <Card bordered={false}>
        <Row gutter={[0, { xl: 30, sm: 20, xs: 20 }]}>
          <Col span={12}>
            <Title level={4}>{t("Настройки")}</Title>
          </Col>

          {showAlert &&
            <Col span={12}>
              <Alert
                type="success"
                description={t("Адрес электронной почты был успешно изменен.")}
                showIcon
                closable
              />
            </Col>
          }

          <Col span={12}>
            <Collapse
              className="dashboard-user-settings-collapse"
              bordered={false}
              collapsible="disabled"
              expandIcon={() => null}
              activeKey={activePane}
            >
              <Panel
                key="login"
                header={
                  <PanelHeader label={t("Логин")} value={state.username} noAction />
                }
              />

              <Panel
                key="email"
                header={
                  <PanelHeader
                    label={t("Почта")}
                    value={state.email ? state.email : t("Почта не добавлена")}
                    actionText={!state.email && t("Добавить")}
                    active={activePane === "email"}
                    onTogglePane={() =>
                      setActivePane(activePane === "email" ? "" : "email")
                    }
                  />
                }
              >
                <Form>
                  <Form.Item label={t("Добавить адрес")} name="email">
                    <Input type="email" size="large" allowClear />
                  </Form.Item>

                  <Form.Item className="dashboard-user-settings-form-action form-action">
                    <Button htmlType="submit" type="primary" size="large">
                      {t("Сохранить адрес")}
                    </Button>
                  </Form.Item>
                </Form>
              </Panel>

              <Panel
                key="password"
                header={
                  <PanelHeader
                    label={t("Пароль")}
                    value="***********"
                    active={activePane === "password"}
                    onTogglePane={() =>
                      setActivePane(activePane === "password" ? "" : "password")
                    }
                  />
                }
              >
                <Alert
                  className="form-alet"
                  type="error"
                  description={t("Пароль не изменён, так как новый пароль повторен неправильно.")}
                  showIcon
                />

                <Form>
                  <Form.Item label={t("Старый пароль")} name="password">
                    <Input.Password type="password" size="large" allowClear />
                  </Form.Item>

                  <Form.Item label={t("Новый пароль")} name="new-password">
                    <Input.Password type="password" size="large" allowClear />
                  </Form.Item>

                  <Form.Item
                    label={t("Повторите пароль")}
                    name="repeat-new-password"
                  >
                    <Input.Password type="password" size="large" allowClear />
                  </Form.Item>

                  <Form.Item className="dashboard-user-settings-form-action form-action">
                    <Button htmlType="submit" type="primary" size="large">
                      {t("Сохранить пароль")}
                    </Button>
                  </Form.Item>
                </Form>
              </Panel>

              <Panel
                key="telegram"
                active={activePane === "telegram"}
                header={
                  <PanelHeader
                    label="Telegram"
                    value="@Test****"
                    active={activePane === "telegram"}
                    onTogglePane={() =>
                      setActivePane(activePane === "telegram" ? "" : "telegram")
                    }
                  />
                }
              >
                <Form>
                  <Form.Item label="Telegram id" name="telegram">
                    <Input size="large" allowClear />
                  </Form.Item>

                  <Form.Item className="dashboard-user-settings-form-action form-action">
                    <Button htmlType="submit" type="primary" size="large">
                      {t("Сохранить")}
                    </Button>
                  </Form.Item>
                </Form>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </Card>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: S.profile.isAuthenticated(state),
    account: S.profile.getAccount(state),
    email: S.profile.getEmail(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(DashboardUserSettings));
