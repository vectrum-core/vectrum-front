import React from "react";

import { TwitterIcon, YouTubeIcon, TelegramIcon } from "../../Icons/Icons";

import "./Social.less";

export default function Social({ dark = false }) {
  return (
    <div className={dark ? "social social-dark" : "social"}>
      <h3 className="social-title">Мы в соц. сетях:</h3>

      <ul className="social-list">
        <li className="social-list-item">
          <a
            href="/"
            className="social-list-link"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon></TwitterIcon>
          </a>
        </li>

        <li className="social-list-item">
          <a
            href="/"
            className="social-list-link"
            target="_blank"
            rel="noreferrer"
          >
            <YouTubeIcon></YouTubeIcon>
          </a>
        </li>

        <li className="social-list-item">
          <a
            href="/"
            className="social-list-link"
            target="_blank"
            rel="noreferrer"
          >
            <TelegramIcon></TelegramIcon>
          </a>
        </li>
      </ul>

      <a href="mailto:support@vectrum.group" className="social-email">
        support@vectrum.group
      </a>
    </div>
  );
}
