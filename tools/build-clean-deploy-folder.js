const chalk = require("chalk");
const rimraf = require("rimraf");
const config = require("../appseed.config");

// Cleanup
rimraf(config.deployRoot, function() {
  console.log(chalk.blue("--cleaned the ./DEPLOY directory"));
});
