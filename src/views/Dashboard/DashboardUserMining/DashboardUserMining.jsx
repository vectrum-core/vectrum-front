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

import "./DashboardUserMining.less";

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



function DashboardUserMining({
  isAuthenticated,
  account,
  username,
  //email,
}) {
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


  return (
    <div className="dashboard-user-settings">
      <Card bordered={false}>
        <Row gutter={[0, { xl: 30, sm: 20, xs: 20 }]}>
          <Col span={12}>
            <Title level={4}>{t("Майнинг")}</Title>
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
    username: S.profile.getUsername(state),
    email: S.profile.getEmail(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(DashboardUserMining));
