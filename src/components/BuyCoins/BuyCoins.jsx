import React from "react";

import { Modal, Form, Input, Button, Select, Tooltip } from "antd";
import { CloseIcon, InfoIcon } from "../Icons/Icons";

import IconSelectArrow from "../../assets/images/icons/IconSelectArrow.svg";

import "./BuyCoins.less";

const { Option } = Select;

const currencySelector = (
  <Form.Item name="prefix">
    <Select
      defaultValue="USD"
      suffixIcon={() => <img src={IconSelectArrow} alt="arrow" />}
    >
      <Option value="VTM">VTM</Option>
      <Option value="USD">USD</Option>
      <Option value="BTC">BTC</Option>
      <Option value="ETH">ETH</Option>
    </Select>
  </Form.Item>
);

const AddressInfo = () => (
  <Tooltip title="Если у вас еще нет адреса - зарегистрируйтесь">
    <InfoIcon></InfoIcon>
  </Tooltip>
);

export default function BuyCoins({ visible, onClose }) {
  return (
    <Modal
      title="Купить VTM"
      width="470px"
      visible={visible}
      onCancel={onClose}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Form className="floating-label-form" layout="vertical">
        <Form.Item label="Сколько VTM покупаем" name="amount-buy">
          <Input addonBefore="VTM" size="large" allowClear></Input>
        </Form.Item>

        <Form.Item label="Какую монету тратим" name="amount">
          <Input addonBefore={currencySelector} size="large" allowClear></Input>
        </Form.Item>

        <Form.Item
          className="ant-form-item-addon-after"
          label="Введите адрес"
          name="address"
        >
          <Input size="large" addonAfter={<AddressInfo />} allowClear></Input>
        </Form.Item>

        <Form.Item className="form-action">
          <Button htmlType="submit" type="primary" size="large" block>
            Купить VTM
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
