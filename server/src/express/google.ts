import { getClient, getTokens } from "../auth";
import { println } from "../log";
import { Severity } from "../log/types";
import { GoogleOAuthFn, GoogleTokenFn } from "./types";

export const googleOAuth: GoogleOAuthFn = async (_request, response) => {
  const client = getClient();
  const redirectURL = client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.email openid",
    redirect_uri: "http://localhost:3000/oauth2callback",
  });
  response.redirect(redirectURL);
};

export const googleToken: GoogleTokenFn = async (req, res) => {
  try {
    if (!req.body.code) return res.status(400).end();
    const tokens = await getTokens(req.body.code);
    return res.status(200).json(tokens).end();
  } catch (error) {
    println({ severity: Severity.Error }, error);
    return res.status(500).end();
  }
};
