import React from "react";

import { Typography } from "antd";

import "./InfoCard.less";

const { Title, Paragraph } = Typography;

export default function InfoCard({ img, title, text }) {
  return (
    <div className="info-card">
      <div className="info-card-img">
        <img src={img} alt={title} />
      </div>

      <Title level={3} className="info-card-title">
        {title}
      </Title>

      <Paragraph className="info-card-text">{text}</Paragraph>
    </div>
  );
}
