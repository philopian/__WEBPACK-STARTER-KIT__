const path = require("path");
const fs = require("fs");
const config = require("../appseed.config");
const copydir = require("copy-dir");

const APP_DIR = config.appRoot;
const PROD_DIR = config.deployRoot;
const WWW_DEV_PATH = config.webRoot;
const WWW_PROD_PATH = path.join(config.deployRoot, "www");
const SERVER_DEV_PATH = path.join(config.appRoot, "server");
const SERVER_PROD_PATH = path.join(config.deployRoot, "server");

// "./www/assets" folder
const fromAssetsFolder = path.join(WWW_DEV_PATH, "assets");
const toAssetsFolder = path.join(WWW_PROD_PATH, "assets");
if (fs.existsSync(fromAssetsFolder)) {
  fs.mkdirSync(toAssetsFolder);
  copydir.sync(fromAssetsFolder, toAssetsFolder);
}

// "./www/data" folder
const fromFolder = path.join(WWW_DEV_PATH, "data");
const toFolder = path.join(WWW_PROD_PATH, "data");
if (fs.existsSync(fromFolder)) {
  fs.mkdirSync(toFolder);
  copydir.sync(fromFolder, toFolder);
}

// "./www/favicon"
const fromFavPath = path.join(WWW_DEV_PATH, "favicon.ico");
if (fs.existsSync(fromFavPath)) {
  const favFrom = fs.createReadStream(fromFavPath, {
    flags: "r",
    encoding: "binary"
  });
  const toFavPath = path.join(WWW_PROD_PATH, "favicon.ico");
  const favTo = fs.createWriteStream(toFavPath, {
    flags: "w",
    encoding: "binary"
  });
  favFrom.pipe(
    favTo,
    { end: false }
  );
}

// Copy and filter package.json file
const packageJson = path.join(APP_DIR, "package.json");
if (fs.existsSync(packageJson)) {
  fs.readFile(packageJson, "utf8", (err, packageJsonContents) => {
    // Cleanup the devDependencies
    const regexRemoveDevDependencies = /,\n  "devDependencies": {([\s\S]*?)}/g;
    packageJsonContents = packageJsonContents.replace(
      regexRemoveDevDependencies,
      ""
    );

    // Cleanup the scripts list
    const regexRemoveNpmScripts = /"scripts": {([\s\S]*?)},\n /g;
    const prodScripts = `"scripts": {
      "prestart": "npm i",
      "start": "NODE_ENV=production node server"
    },
    `;
    packageJsonContents = packageJsonContents.replace(
      regexRemoveNpmScripts,
      prodScripts
    );

    // Remove author
    const regexRemoveAuthor = /"author": "([\s\S]*?)",\n  /g;
    packageJsonContents = packageJsonContents.replace(regexRemoveAuthor, "");

    // write to prod
    const packageJson = path.join(PROD_DIR, "package.json");
    fs.writeFile(packageJson, packageJsonContents, err => {
      console.log("[copied packages.json]");
    });
  });
}

// Copy over the server folder to DEPLOY
const templates = require("./templates");
if (fs.existsSync(SERVER_DEV_PATH)) {
  // copy the server file
  copydir.sync(SERVER_DEV_PATH, SERVER_PROD_PATH);

  const pathName = path.join(PROD_DIR, "web.config");
  fs.writeFile(pathName, templates.webConfig(), "utf8", err => {});

  // build
} else {
  // webconfig in the root of the DEPLOY folder
  const pathName = path.join(PROD_DIR, "web.config");
  fs.writeFile(pathName, templates.spaWebConfig(), "utf8", err => {});
}

// Copy appseed.config
const appseedConfigPath = path.join(APP_DIR, "appseed.config.js");
const appseedProdPath = path.join(PROD_DIR, "appseed.config.js");
if (fs.existsSync(appseedConfigPath)) {
  let x = fs.readFileSync(appseedConfigPath, "utf-8");
  x = x.replace("const REST_API_PORT = 1234;", "const REST_API_PORT = 8080;");
  fs.writeFile(appseedProdPath, x, err => {
    console.log("[copied packages.json]");
  });
}
