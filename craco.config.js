const CracoLessPlugin = require("craco-less");
const modifyVars = require("./antd-theme");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
