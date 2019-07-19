import express from "express";
import next from "next";
import admin from "firebase-admin";

import { config } from "./src/config/config";
import { initializeApp } from "./src/utils/initialize-firebase-admin-app";
// const getConfig = require("next/config").default;
// console.log(getConfig);
// const { serverRuntimeConfig } = require("./next.config");

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
