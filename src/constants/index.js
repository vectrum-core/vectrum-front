export const isProduction = process.env.NODE_ENV === "production";


export const rootUrl = isProduction ? "https://testoname.com" : "http://localhost:3000";
export const apiUrl = isProduction ? "http://testoname.com" : "http://localhost:3100";
export const nodeUrl = isProduction ? "https://testoname.com:4443" : "https://testoname.com:4443";
export const hyperionUrl = isProduction ? "https://testoname.com:7000" : "http://localhost:7000";

export const explorerUrl = "https://local.bloks.io/"
  + "?nodeUrl=" + nodeUrl
  + "&coreSymbol=VTM"
  + "&corePrecision=4"
  + "&hyperionUrl=" + hyperionUrl;


export const options = {
  domains: {
    root: rootUrl,
    api: apiUrl,
    node: nodeUrl,
    hyperion: hyperionUrl,
  },
};

export const apiOptions = { apiKey: null, options, };

export const projectTwitterUrl = "https://twitter.com/?";
export const projectYouTubeUrl = "https://www.youtube.com/?";
export const projectTelegramUrl = "https://t.me/?";
export const projectEmailSupport = "support@vectrum.group";
