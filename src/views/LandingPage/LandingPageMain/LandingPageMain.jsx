import React, { useState } from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { Row, Col, Tabs, Typography } from "antd";
import Container from "../../../components/Common/Container/Container";
import Login from "../../../components/Auth/Login/Login";
import Registration from "../../../components/Auth/Registration/Registration";
import ForgotPassword from "../../../components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../../../components/Auth/ResetPassword/ResetPassword";

import landingPageMainImgBottom from "../../../assets/images/main-shape.png";
import Mockup from "../../../assets/images/mockup.png";
import Coin from "../../../assets/images/main-coin.png";
import * as S from "../../../store/selectors";
import "./LandingPageMain.less";



const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;


function LandingPageMain(props) {
  const { isAuthenticated } = props;
  const [tab, setTab] = useState("REGISTRATION");

  return (
    <>
      <main id="auth" className="landing-page-main">
        <Container>
          <Row
            gutter={[
              { xxl: 60, lg: 30 },
              { md: 0, sm: 30, xs: 60 },
            ]}
          >
            <Col lg={7} md={6} span={12}>
              <div className="landing-page-main-title">
                <Title>VECTRUM PLATFORM</Title>

                <Paragraph>
                  Все возможности криптовалюты на одной платформе
                </Paragraph>
              </div>
              <img
                src={Mockup}
                className="landing-page-main-mockup"
                alt="Vectrum platform"
              />
            </Col>

            <Col
              className="landing-page-main-form-col"
              lg={{ span: 4, offset: 1 }}
              md={{ span: 5, offset: 1 }}
              sm={{ span: 10, offset: 1 }}
              span={12}
            >
              {isAuthenticated
                ? null
                : <Tabs activeKey={tab} renderTabBar={() => null}>
                  <TabPane key="LOGIN">
                    <Login onChangeTab={(key) => setTab(key)}></Login>
                  </TabPane>

                  <TabPane key="REGISTRATION">
                    <Registration
                      onChangeTab={(key) => setTab(key)}
                    ></Registration>
                  </TabPane>

                  <TabPane key="FORGOT_PASSWORD">
                    <ForgotPassword
                      onChangeTab={(key) => setTab(key)}
                    ></ForgotPassword>
                  </TabPane>

                  <TabPane key="RESET_PASSWORD">
                    <ResetPassword
                      onChangeTab={(key) => setTab(key)}
                    ></ResetPassword>
                  </TabPane>
                </Tabs>
              }
            </Col>
          </Row>
        </Container>

        <img
          src={landingPageMainImgBottom}
          className="landing-page-main-bottom-img"
          alt="Vectrum platform"
        />

        <img
          src={Coin}
          className="landing-page-main-coin"
          alt="Vectrum platform"
        />
      </main>

      {/* <img
        src={landingPageMainImgBottom}
        className="landing-page-main-bottom-img"
        alt="Vectrum platform"
      /> */}
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: S.profile.isAuthenticated(state),
  };
}

export default connect(mapStateToProps)(hot(module)(LandingPageMain));
