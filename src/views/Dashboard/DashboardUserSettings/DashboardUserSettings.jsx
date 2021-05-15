import React, { useState } from "react";

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
}) => (
  <div className="panel-header">
    <div className="panel-header-label">
      <b>{label}</b>
    </div>

    <div className="panel-header-value">{value}</div>

    <div className="panel-header-action">
      <Button type="link" disabled={noAction} onClick={onTogglePane}>
        {active ? "Отмена" : actionText}
      </Button>
    </div>
  </div>
);

export default function DashboardUserSettings() {
  const [activePane, setActivePane] = useState("");

  return (
    <div className="dashboard-user-settings">
      <Card bordered={false}>
        <Row gutter={[0, { xl: 30, sm: 20, xs: 20 }]}>
          <Col span={12}>
            <Title level={4}>Настройки</Title>
          </Col>

          <Col span={12}>
            <Alert
              type="success"
              description="Адрес электронной почты был успешно изменен."
              showIcon
            />
          </Col>

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
                  <PanelHeader label="Логин" value="1erF44g4sd5f" noAction />
                }
              />

              <Panel
                key="email"
                header={
                  <PanelHeader
                    label="Почта"
                    value="Почта не добавлена"
                    actionText="Добавить"
                    active={activePane === "email"}
                    onTogglePane={() =>
                      setActivePane(activePane === "email" ? "" : "email")
                    }
                  />
                }
              >
                <Form>
                  <Form.Item label="Добавить адрес" name="email">
                    <Input type="email" size="large" allowClear />
                  </Form.Item>

                  <Form.Item className="dashboard-user-settings-form-action form-action">
                    <Button htmlType="submit" type="primary" size="large">
                      Сохранить адрес
                    </Button>
                  </Form.Item>
                </Form>
              </Panel>

              <Panel
                key="password"
                header={
                  <PanelHeader
                    label="Пароль"
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
                  description="Пароль не изменён, так как новый пароль повторен неправильно."
                  showIcon
                />

                <Form>
                  <Form.Item label="Старый пароль" name="password">
                    <Input.Password type="password" size="large" allowClear />
                  </Form.Item>

                  <Form.Item label="Старый пароль" name="new-password">
                    <Input.Password type="password" size="large" allowClear />
                  </Form.Item>

                  <Form.Item
                    label="Повторите пароль"
                    name="repeat-new-password"
                  >
                    <Input.Password type="password" size="large" allowClear />
                  </Form.Item>

                  <Form.Item className="dashboard-user-settings-form-action form-action">
                    <Button htmlType="submit" type="primary" size="large">
                      Сохранить пароль
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
                    value="@Tes****"
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
                      Сохранить
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
