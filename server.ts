const express = require("express");
const next = require("next");
const admin = require("firebase-admin");
const { config } = require("./src/config/config");
// const getConfig = require("next/config").default;
// console.log(getConfig);
// const { serverRuntimeConfig } = require("./next.config");

const { initializeApp } = require("./src/utils/initialize-firebase-admin-app");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV === "development";
const app = next({ dev });

const handle = app.getRequestHandler();

// console.log(serverRuntimeConfig);
// return;

app.prepare().then(() => {
  initializeApp({
    firebase: admin,
    credential: config.server.credential,
    databaseURL: config.server.databaseURL
  });
  const server = express();

  server.use((req, res, next) => {
    req.firebase = admin;
    next();
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(
      `> Ready Hey on http://localhost:${port} ${process.env.NODE_ENV}`
    );
  });
});
