import React from "react";
import { hot } from "react-hot-loader";
import { useTranslation } from "react-i18next";

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
      <Option value="USD">USD</Option>
      <Option value="BTC">BTC</Option>
      <Option value="ETH">ETH</Option>
    </Select>
  </Form.Item>
);



const AddressInfo = () => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("Если у вас еще нет адреса - зарегистрируйтесь")}>
      <InfoIcon></InfoIcon>
    </Tooltip>
  );
};



function BuyCoins({ visible, onClose }) {
  const { t } = useTranslation();
  /* TODO api покупки, цены
  - как вариант https://pancakeswap.finance/ в BSC за USDT
  */

  return (
    <Modal
      title={t("Купить VTM")}
      width="470px"
      visible={visible}
      onCancel={onClose}
      closeIcon={<CloseIcon />}
      footer={null}
    >
      <Form className="floating-label-form" layout="vertical">
        <Form.Item label={t("Сколько VTM покупаем")} name="amount-buy">
          <Input addonBefore="VTM" size="large" allowClear />
        </Form.Item>

        <Form.Item label={t("Какую монету тратим")} name="amount">
          <Input addonBefore={currencySelector} size="large" allowClear />
        </Form.Item>

        <Form.Item
          className="ant-form-item-addon-after"
          label={t("Введите адрес")}
          name="address"
        >
          <Input size="large" addonAfter={<AddressInfo />} allowClear />
        </Form.Item>

        <Form.Item className="form-action">
          <Button htmlType="submit" type="primary" size="large" block>
            {t("Купить VTM")}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default hot(module)(BuyCoins);
