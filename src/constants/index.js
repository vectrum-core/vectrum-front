export const isProduction = process.env.NODE_ENV === "production";


export const rootUrl = isProduction ? "https://testoname.com" : "http://localhost:3000";
export const apiUrl = isProduction ? "https://testoname.com" : "http://localhost:3100";
export const nodeUrl = isProduction ? "https://testoname.com:4443" : "https://testoname.com:4443";
export const hyperionUrl = isProduction ? "https://testoname.com:7000" : "http://localhost:7000";

export const explorerUrl = "https://local.bloks.io/"
  + "?nodeUrl=" + nodeUrl
  + "&coreSymbol=VTM"
  + "&corePrecision=4"
  ;//+ "&hyperionUrl=" + hyperionUrl;


export const options = {
  domains: {
    root: rootUrl,
    api: apiUrl,
    node: nodeUrl,
    hyperion: hyperionUrl,
  },
};

export const apiOptions = { apiKey: null, options, };

export const projectTwitterUrl = "https://twitter.com/vectrum_vtm";
export const projectYouTubeUrl = "https://www.youtube.com/c/VECTRUMGroup";
export const projectTelegramUrl = "https://t.me/vectrum_platform_rus";
export const projectTelegramSupportUrl = "https://t.me/Vectrum_support";
export const projectEmailSupport = "support@vectrum.group";

export const telegramBotUsername = isProduction ? "VG345TestBot" : "VG345TestBot";


export const vectrumChain = {
  chainId: 'b89a72f48900fb6255afd1a93920a2b813cbe15132f23a7568aaa65a5ccce1fd',
  rpcEndpoints: [{
    protocol: 'http',
    host: 'testoname.com',
    port: 8888,
  }, {
    protocol: 'https',
    host: 'testoname.com',
    port: 4443,
  }]
};

export const appName = 'VECTRUM';
