const express = require("express");
const next = require("next");
const admin = require("firebase-admin");

const { initializeApp } = require("./utils/initialize-firebase-admin-app");
const { config } = require("./config/config");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  initializeApp({
    firebase: admin,
    credential: config.firebase.server.credential,
    databaseURL: config.firebase.server.databaseURL // TODO database URL goes here
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
    console.log(`> Ready Hey on http://localhost:${port}`);
  });
});
