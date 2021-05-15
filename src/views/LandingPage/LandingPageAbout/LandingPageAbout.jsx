import React from "react";

import { Row, Col, Typography } from "antd";
import Container from "../../../components/Common/Container/Container";

import LandingPageWalletBgImage from "../../../assets/images/illustration.png";
import LandingPageWalletBgLinesImage from "../../../assets/images/illustration-line.png";

import "./LandingPageAbout.less";

const { Title, Paragraph } = Typography;

export default function LandingPageAbout() {
  return (
    <section id="about-wallet" className="landing-page-about">
      <Container>
        <Row>
          <Col xl={5} md={{ span: 6, order: 1 }} order={2} span={12}>
            <div className="landing-page-about-content">
              <Title level={2}>Vectrum Platform</Title>

              <Paragraph className="fs-20">
                Онлайн-платформа с простым и удобным интерфейсом, которая
                позволяет взаимодействовать с монетой VTM и использовать
                возможности блокчейн Vectrum на максимум.
              </Paragraph>

              <Paragraph className="fs-20">
                С запуском платформы мы стали на шаг ближе к главной цели
                проекта VECTRUM Group - созданию маркетплейса, который сделает
                использование криптовалюты простым и доступным для каждого.
              </Paragraph>
            </div>
          </Col>

          <Col
            xl={{ span: 6, offset: 1 }}
            md={{ span: 6, order: 2 }}
            order={1}
            span={12}
          >
            <img
              src={LandingPageWalletBgImage}
              className="landing-page-about-image"
              alt="Vectrum Platform"
            />
          </Col>
        </Row>
      </Container>

      <img
        src={LandingPageWalletBgLinesImage}
        className="landing-page-about-image-lines"
        alt="Lines"
      />
    </section>
  );
}
