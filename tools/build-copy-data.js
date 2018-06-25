const path = require('path');
const fs = require('fs');
const config = require('../appseed.config');
const copydir = require('copy-dir');


// Copy over the assets
const fromAssetsFolder = path.join(config.webRoot, 'assets');
const toAssetsFolder = path.join(config.distRoot, 'assets');
if (!fs.existsSync(toAssetsFolder)) {
  fs.mkdirSync(toAssetsFolder);
}
copydir.sync(fromAssetsFolder, toAssetsFolder);

// Copy over the data
const fromFolder = path.join(config.webRoot, 'data');
const toFolder = path.join(config.distRoot, 'data');
if (!fs.existsSync(toFolder)) {
  fs.mkdirSync(toFolder);
}
copydir.sync(fromFolder, toFolder);

// Copy ovet the favicon
const from = path.join(config.webRoot, 'favicon.ico');
const favFrom = fs.createReadStream(from, { flags: 'r', encoding: "binary", });
const to = path.join(config.distRoot, 'favicon.ico');
const favTo = fs.createWriteStream(to, { flags: 'w', encoding: "binary", });
favFrom.pipe(favTo, { end: false });