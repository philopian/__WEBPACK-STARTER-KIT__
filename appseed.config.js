var path = require("path");

const WEB_FOLDER = "www";
const BUILD_FOLDER = "DEPLOY";
module.exports = {
  port: 8080,
  appRoot: __dirname,
  webRoot: path.join(__dirname, WEB_FOLDER),
  publicRoot: path.join(__dirname, WEB_FOLDER),

  distFileName: "DEPLOY",
  deployRoot: path.join(__dirname, BUILD_FOLDER),
  distRoot: path.join(__dirname, BUILD_FOLDER),
  bower: path.join(__dirname, "./bower_components")
};