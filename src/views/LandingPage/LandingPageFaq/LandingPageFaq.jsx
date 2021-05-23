import React from "react";
import { Row, Col, Typography, Collapse } from "antd";
import Container from "../../../components/Common/Container/Container";
import landingPageFaqBgFigure1 from "../../../assets/images/figure-2.png";
import landingPageFaqBgFigure2 from "../../../assets/images/figure-3.png";
import { ArrowDownIcon } from "../../../components/Icons/Icons";
import "./LandingPageFaq.less";
import { projectEmailSupport } from "../../../constants";



const { Title, Link, Text } = Typography;
const { Panel } = Collapse;

const faq = [
  {
    title: "Lorem ipsum dolor sit amet, sed do eiusmod dipiscing elit, aliqua?",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis pellentesque id nibh tortor id aliquet. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Pulvinar pellentesque habitant.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut consectetur adipiscing elit, aliqua?",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis pellentesque id nibh tortor id aliquet. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Pulvinar pellentesque habitant.",
  },
  {
    title: "Lorem ipsum dolor sit amet, sed do?",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis pellentesque id nibh tortor id aliquet. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Pulvinar pellentesque habitant.",
  },
];

export default function LandingPageFaq() {
  return (
    <section id="faq" className="landing-page-faq">
      <Container>
        <Title className="landing-page-faq-title" level={2}>
          Часто задаваемые вопросы
        </Title>

        <Row
          className="landing-page-faq-collapse-wrapper"
          gutter={[
            { xxl: 60, lg: 30, md: 20 },
            { md: 0, sm: 40, xs: 40 },
          ]}
        >
          <Col md={6} span={12}>
            {faq.map((item, index) => (
              <Collapse
                key={index}
                className="landing-page-faq-item"
                expandIconPosition="right"
                expandIcon={() => <ArrowDownIcon />}
              >
                <Panel header={item.title} key={index}>
                  {item.text}
                </Panel>
              </Collapse>
            ))}
          </Col>

          <Col md={6} span={12}>
            {faq.map((item, index) => (
              <Collapse
                key={index}
                className="landing-page-faq-item"
                expandIconPosition="right"
                expandIcon={() => <ArrowDownIcon />}
              >
                <Panel header={item.title} key={index}>
                  {item.text}
                </Panel>
              </Collapse>
            ))}
          </Col>

          <img
            src={landingPageFaqBgFigure1}
            className="landing-page-faq-figure-1"
            alt="figure"
          />

          <img
            src={landingPageFaqBgFigure2}
            className="landing-page-faq-figure-2"
            alt="figure"
          />
        </Row>

        <Row className="landing-page-faq-support">
          <Col span={12}>
            <Text>
              Не нашли нужный вопрос? <Link href={`mailto:${projectEmailSupport}`}>Напишите нам</Link>
            </Text>
          </Col>
        </Row>
      </Container>
    </section >
  );
}
