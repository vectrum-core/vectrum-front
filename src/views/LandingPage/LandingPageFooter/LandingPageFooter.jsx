import React from "react";
import { Link as AnchorLink } from "react-scroll";
import Container from "../../../components/Common/Container/Container";
import Logo from "../../../components/Common/Logo/Logo";
import Social from "../../../components/Common/Social/Social";
import { scrollOptions } from "../../../assets/js/const/index";
import footerImgTop from "../../../assets/images/footer-img-top.svg";
import { projectEmailSupport } from "../../../constants";
import "./LandingPageFooter.less";



const nav = [
  [
    {
      id: "about-wallet",
      title: "О кошельке",
    },
    {
      href: "/buy",
      title: "Купить",
    },
    {
      id: "faq",
      title: "FAQ",
    },
    {
      href: `mailto:${projectEmailSupport}`,
      title: "Служба поддержки",
    },
  ],
  [
    {
      href: "/docs",
      title: "Документация",
    },
    {
      href: "/privacy",
      title: "Политика конфиденциальности",
    },
    {
      href: "/terms",
      title: "Пользовательское соглашение",
    },
  ],
];

export default function LandingPageFooter() {
  return (
    <footer className="landing-page-footer">
      <img
        src={footerImgTop}
        className="landing-page-footer-white-shape"
        alt="decoration"
      />

      <Container className="landing-page-footer-container">
        <Logo position="footer"></Logo>

        {nav.map((items, listIndex) => (
          <ul key={listIndex} className="landing-page-footer-nav-list">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="landing-page-footer-nav-list-item">
                {item.href ? (
                  <a
                    href={item.href}
                    className="landing-page-footer-nav-list-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.title}
                  </a>
                ) : (
                  <AnchorLink
                    to={item.id}
                    className="landing-page-footer-nav-list-link"
                    {...scrollOptions}
                  >
                    {item.title}
                  </AnchorLink>
                )}
              </li>
            ))}
          </ul>
        ))}

        <Social></Social>
      </Container>
    </footer>
  );
}
