import express from "express";
import next from "next";
import admin from "firebase-admin";

import { config } from "./src/config/config";

const port = Number(process.env.PORT) || 3000;
const dev = process.env.NODE_ENV === "development";
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  admin.initializeApp({
    credential: admin.credential.cert(config.server.credential as any),
    databaseURL: config.server.databaseURL,
  });

  const server = express();

  server.use((req, res, next) => {
    req.firebase = admin;
    next();
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(
      `> Ready Hey on http://localhost:${port} ${process.env.NODE_ENV}`
    );
  });
});
