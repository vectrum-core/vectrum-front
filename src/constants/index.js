export const isProduction = process.env.NODE_ENV === "production";

export const options = {
  domains: {
    root: isProduction ? "http://localhost:3000" : "http://localhost:3000",
    api: isProduction ? "http://localhost:1000" : "http://localhost:3100",
    node: isProduction ? "" : "",
    hyperion: isProduction ? "" : "",
  }
};

export const apiOptions = { apiKey: null, options, };

export const projectTwitterUrl = "https://twitter.com/?";
export const projectYouTubeUrl = "https://www.youtube.com/?";
export const projectTelegramUrl = "https://t.me/?";
export const projectEmailSupport = "support@vectrum.group";
