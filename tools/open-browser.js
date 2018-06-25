import config from "../appseed.config";
const open = require("open");

console.log("..opening the browser");

// Open the browser to view the build
setTimeout(() => {
  open("http://localhost:" + config.port);
}, 2000);