import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { googleOAuth, googleToken } from "../express/google";
import { println } from "../log";

const config = (app: express.Express) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  app.get("/auth/google", googleOAuth);

  app.post("/auth/tokens", googleToken);

  app.get("/oauth2callback", (req, res) => {
    const { code } = req.query;
    println({}, code);
    res.write(code);
    res.end();
  });
};

export default config;
