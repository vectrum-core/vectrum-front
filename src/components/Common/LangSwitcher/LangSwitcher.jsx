import React from "react";
import { useTranslation } from 'react-i18next';

import { Select } from "antd";
// import IconSelectArrow from "../../../assets/images/icons/IconSelectArrow.svg";

import ruFlag from "../../../assets/images/flags/ru.png";
import enFlag from "../../../assets/images/flags/en.png";

import "./LangSwitcher.less";

const { Option } = Select;

const IconSelectArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 14 8"
    >
      <path
        stroke="#6C757D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 1L7 7 1 1"
      />
    </svg>
  );
};

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  return (
    <Select
      //defaultValue={i18n.language}
      value={i18n.language}
      className="lang-switcher"
      dropdownClassName="lang-switcher-dropdown"
      bordered={false}
      suffixIcon={() => <IconSelectArrow />}
      onChange={(key) => i18n.changeLanguage(key)}
    >
      <Option value="ru">
        <img className="lang-switcher-flag" src={ruFlag} alt="Ru" />
      </Option>

      <Option value="en">
        <img className="lang-switcher-flag" src={enFlag} alt="En" />
      </Option>
    </Select>
  );
}
