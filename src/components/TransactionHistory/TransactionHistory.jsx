import React from "react";
import { Link } from "react-router-dom";

import { Card, Row, Col, Table, Typography, Button, Tag } from "antd";

import { ArrowRightIcon } from "../Icons/Icons";

import "./TransactionHistory.less";

const { Title, Paragraph } = Typography;

const columns = [
  {
    title: "ТХ",
    dataIndex: "tx",
    key: "tx",
    render: (text) => (
      <Link to="/" type="success" component={Typography.Link}>
        {text}
      </Link>
    ),
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Вид транзакции",
    dataIndex: "type",
    key: "type",
    render: (text, record) => (
      <Button
        className="transaction-history-transaction-type"
        type="primary"
        size="small"
        ghost
        danger={record.danger}
      >
        {text}
      </Button>
    ),
  },
  {
    title: "Информация",
    dataIndex: "info",
    key: "info",
    render: (text, record) => (
      <div className="transaction-history-col-info">
        <Link to="/" type="success" component={Typography.Link}>
          {record.info.from}
        </Link>

        <ArrowRightIcon></ArrowRightIcon>

        <Link to="/" type="success" component={Typography.Link}>
          {record.info.to}
        </Link>
      </div>
    ),
  },
  {
    title: "Сумма",
    dataIndex: "amount",
    key: "amount",
    render: (text, record) => (
      <>
        <Paragraph className="typography-tag">
          {record.amount.value}
          <Tag>{record.amount.currency}</Tag>
        </Paragraph>
      </>
    ),
  },
];

const data = Array.from(new Array(10).keys()).map((item) => ({
  key: item,
  tx: "987349",
  date: "19.01.2021 16:23",
  type: item % 2 === 0 ? "Отправлено" : "Получено",
  danger: item % 2 === 0 ? true : false,
  info: {
    from: "1erF44g4sd5f",
    to: "1erF44g4sd5f",
  },
  amount: {
    value: "568,521",
    currency: "VTM",
  },
}));

export default function TransactionHistory() {
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
                dataSource={data}
                pagination={false}
              ></Table>
            </div>
          </Col>

          <Col className="transaction-history-show-more" span={12}>
            <Button type="primary" size="large">
              Смотреть еще
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
