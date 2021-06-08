import React, { useState, useEffect } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import * as S from "../../store/selectors";
import * as A from "../../store/actions";
import { api } from "../../store/configureStore";
import NumberFormat from 'react-number-format';
import { Link } from "react-router-dom";

import { Card, Row, Col, Table, Typography, Button, Tag } from "antd";

import { ArrowRightIcon } from "../Icons/Icons";

import "./TransactionHistory.less";



const { Title, Paragraph } = Typography;




function TransactionHistory({
  account,
}) {
  const { t } = useTranslation();


  const columns = [
    {
      title: t("ТХ"),
      dataIndex: "trx_id",
      key: "trx_id",
      render: (text) => (
        <Link to="/" type="success" component={Typography.Link}>
          {text ? text.substring(0, 6) : ''}...
        </Link>
      ),
    },
    {
      title: t("Дата"),
      dataIndex: "block_time",
      key: "block_time",
      render: (text, record) => (
        <div>
          { text ? text.split('.')[0] : ''}
        </div>
      ),
    },

    {
      title: t("Вид транзакции"),
      dataIndex: "type",
      key: "type",
      render: (text, record) => (
        <Button
          className="transaction-history-transaction-type"
          type="primary"
          size="small"
          ghost
          danger={record.act.data.from === account}
        >
          {record.act.data.from === account && t("Отправлено")}
          {record.act.data.to === account && t("Получено")}
        </Button>
      ),
    },
    {
      title: t("Информация"),
      dataIndex: "act.data",
      key: "act.data",
      render: (text, record) => (
        <div className="transaction-history-col-info">
          <Link to="/" type="success" component={Typography.Link}>
            {record.act.data.from}
          </Link>

          <ArrowRightIcon></ArrowRightIcon>

          <Link to="/" type="success" component={Typography.Link}>
            {record.act.data.to}
          </Link>
        </div>
      ),
    },
    {
      title: t("Сумма"),
      dataIndex: "act.data",
      key: "act.data",
      render: (text, record) => (
        <>
          <Paragraph className="typography-tag">
            {record.act.data.quantity.split(' ')[0]}
            <Tag>{record.act.data.quantity.split(' ')[1]}</Tag>
          </Paragraph>
        </>
      ),
    },
  ];



  const [txs, setTxs] = useState([]);
  const updateTxs = async () => {
    if (!account) return;
    try {
      // TODO hyperion
      /*const res = await api.getAccountActions(account);
      if (res.ok) {
        setTxs(res.result);
      } else
        setTxs([]);*/
    } catch (error) { console.error(error); }
  }

  const [time, setTime] = useState(0);
  const intervalMs = 60 * 1000;
  useEffect(() => {
    setTime(Date.now());
    const intervalId = setInterval(() => {
      setTime(Date.now());
    }, intervalMs);

    // demo
    /*const data = Array.from(new Array(10).keys()).map((item) => ({
      key: item,
      trx_id: "55bc039c4ad3b1babcb128a40479f2e6417c575317bd13e18a1772b00b6e25a6",
      block_time: "2021-06-06T12:36:14.500",
      type: item % 2 === 0 ? "Отправлено" : "Получено",
      danger: item % 2 === 0 ? true : false,
      act: {
        data: {
          from: "eosio",
          to: "vectrum",
          quantity: "129.9500 VTM",
          memo: "memo",
        }
      },
    }));

    setTxs(data);*/

    return () => {
      clearInterval(intervalId);
    }
  }, []);




  useEffect(() => {
    try {
      updateTxs();
    } catch (error) { console.log(error); }
  }, [time]);

  return (
    <div className="transaction-history">
      <Card bordered={false}>
        <Row gutter={[30, 30]}>
          <Col span={12}>
            <Title level={4}>История транзакций</Title>
          </Col>

          <Col span={12}>
            <div className="transaction-history-table">
              <Table
                columns={columns}
                dataSource={txs}
                pagination={false}
              ></Table>
            </div>
          </Col>

          <Col className="transaction-history-show-more" span={12}>
            <Button type="primary" size="large">
              {t("Смотреть еще")}
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}



const mapStateToProps = (state) => {
  return {
    account: S.profile.getAccount(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(TransactionHistory));
