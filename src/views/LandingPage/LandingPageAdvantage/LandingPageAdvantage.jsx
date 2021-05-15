import React from "react";

import { Row, Col, Typography } from "antd";
import Container from "../../../components/Common/Container/Container";
import InfoCard from "../../../components/Common/InfoCard/InfoCard";

import landingPageAdvantageBgFigure from "../../../assets/images/figure-1.png";
import IconSimplicity from "../../../assets/images/icons/IconSimplicity.svg";
import IconMarketplace from "../../../assets/images/icons/IconMarketplace.svg";
import IconReliability from "../../../assets/images/icons/IconReliability.svg";

import "./LandingPageAdvantage.less";

const { Title } = Typography;

const advantages = [
  {
    img: IconSimplicity,
    title: "Простота",
    text:
      "Пользовательский интерфейс, созданный командой профессионалов, чтобы вам было легко пользоваться криптовалютой и получать от этого удовольствие.",
  },
  {
    img: IconMarketplace,
    title: "Маркетплейс",
    text:
      "Кошелек VECTRUM — это больше, чем просто средство хранения и отправки криптовалюты. Особенности платформы позволяют использовать криптовалюту для покупок в маркетплейсе, майнинга, трейдинга и других целей пользователя.",
  },
  {
    img: IconReliability,
    title: "Надежность",
    text:
      "Для безопасности ваших цифровых активов использованы самые современные методы шифрования и защиты, 2FA, антифишинг, дополнительный пароль, авторизация через защищенный мессенджер Telegram.",
  },
];

export default function LandingPageAdvantage() {
  return (
    <section className="landing-page-advantage">
      <Container>
        <Title className="landing-page-advantage-title" level={2}>
          Преимущества Vectrum Platform
        </Title>

        <Row
          className="landing-page-advantage-info-card-wrapper"
          gutter={[
            { xxl: 60, lg: 30, md: 20 },
            { md: 0, sm: 40, xs: 40 },
          ]}
        >
          {advantages.map((item, index) => (
            <Col key={index} md={4} span={12}>
              <InfoCard {...item}></InfoCard>
            </Col>
          ))}

          <img
            src={landingPageAdvantageBgFigure}
            className="landing-page-advantage-bg-figure"
            alt="figure"
          />
        </Row>
      </Container>
    </section>
  );
}
