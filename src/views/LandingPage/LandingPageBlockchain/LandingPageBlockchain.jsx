import React from "react";

import { Row, Col, Typography } from "antd";
import Container from "../../../components/Common/Container/Container";
import InfoCard from "../../../components/Common/InfoCard/InfoCard";

import landingPageBlockchainBgImage from "../../../assets/images/blockchain-bg-line.png";
import IconBlockchain from "../../../assets/images/icons/IconBlockchain.svg";
import IconSpeed from "../../../assets/images/icons/IconSpeed.svg";
import IconNoCommissions from "../../../assets/images/icons/IconNoCommissions.svg";

import "./LandingPageBlockchain.less";

const { Title } = Typography;

const advantages = [
  {
    img: IconBlockchain,
    title: "Собственный блокчейн",
    text:
      "Многие преимущества кошелька VECTRUM достигаются, благодаря разработанному командой блокчейну и монете, которые поддерживает DPoS-майнинг и интегрированы во внутренние сервисы кошелька.",
  },
  {
    img: IconSpeed,
    title: "Скорость",
    text:
      "Мы применили технологию асинхронных смарт-контрактов EOS, которая поддерживает миллионы транзакций в секунду. Забудьте про долгие подтверждения и высокие комиссии.",
  },
  {
    img: IconNoCommissions,
    title: "Отсутствие комиссий",
    text:
      "Первые 3 года работы сети, награды майнеров VTM обеспечивает эмиссия, то есть компания берет комиссии на себя. Только после выпуска всех монет VTM будут введены комиссии для поддержания стабильности работа блокчейна.",
  },
];

export default function LandingPageBlockchain() {
  return (
    <section className="landing-page-blockchain">
      <Container>
        <Title className="landing-page-blockchain-title" level={2}>
          Блокчейн Vectrum
        </Title>

        <Row
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
        </Row>
      </Container>

      <img
        src={landingPageBlockchainBgImage}
        className="landing-page-blockchain-bg-image"
        alt="Vectrum platform"
      />
    </section>
  );
}
