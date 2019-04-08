/*
Overiding webpack config for create-react-app, to run our custom
helpers and also force the dev server to save the served files to
disk, so that Chrome can serve them.

Related: https://github.com/facebook/create-react-app/issues/1070
         https://github.com/gajus/write-file-webpack-plugin
*/
const path = require("path");
const WriteFilePlugin = require("write-file-webpack-plugin");
const fs = require("fs-extra");

module.exports = function override(config, env) {
  let buildPath = "./build";
  config.output.path = path.join(__dirname, "./build");
  config.plugins.push(new WriteFilePlugin());
  fs.removeSync(buildPath);
  fs.copySync("./public/", buildPath);
  return config;
};
