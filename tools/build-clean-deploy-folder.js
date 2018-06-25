const path = require('path');
const rimraf = require('rimraf');
const config = require('../appseed.config');

// Cleanup
rimraf(config.deployRoot, function() {
  console.log('clean the ./DEPLOY directory');
});