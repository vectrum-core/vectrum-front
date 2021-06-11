import React from "react";
import { useTranslation } from "react-i18next";
import { TwitterIcon, YouTubeIcon, TelegramIcon } from "../../Icons/Icons";
import {
  projectTwitterUrl,
  projectYouTubeUrl,
  projectTelegramUrl,
  projectTelegramSupportUrl,
  projectEmailSupport,
} from "../../../constants";
import "./Social.less";



export default function Social({ dark = false }) {
  const { t } = useTranslation();

  return (
    <div className={dark ? "social social-dark" : "social"}>
      <h3 className="social-title">{t("Мы в соц. сетях")}:</h3>

      <ul className="social-list">
        <li className="social-list-item">
          <a
            href={projectTwitterUrl}
            className="social-list-link"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon></TwitterIcon>
          </a>
        </li>

        <li className="social-list-item">
          <a
            href={projectYouTubeUrl}
            className="social-list-link"
            target="_blank"
            rel="noreferrer"
          >
            <YouTubeIcon></YouTubeIcon>
          </a>
        </li>

        <li className="social-list-item">
          <a
            href={projectTelegramUrl}
            className="social-list-link"
            target="_blank"
            rel="noreferrer"
          >
            <TelegramIcon></TelegramIcon>
          </a>
        </li>
      </ul>

      <a href={projectTelegramSupportUrl} className="social-email">
        {projectEmailSupport}
      </a>
    </div>
  );
}
