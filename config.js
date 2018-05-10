var path = require("path");
module.exports = {
  port: 8080,
  appRoot: __dirname,
  webRoot: path.join(__dirname, "./www"),
  publicRoot: path.join(__dirname, "./www"),

  distFileName: "DEPLOY",
  deployRoot: path.join(__dirname, "DEPLOY"),
  distRoot: path.join(__dirname, "DEPLOY"),
  bower: path.join(__dirname, "./bower_components")
};