import { google } from "googleapis";
import { OAuth2Client } from "googleapis-common";
import { GetClientFn, GetTokensFn, GetUserInfoFn } from "./types";
import keys from "../../client.keys.json";
import { Severity } from "../log/types";
import { println } from "../log";

const redirect_uri = keys.web.redirect_uris.find(
  (uri) => uri === process.env.REDIRECT_URI ?? keys.web.redirect_uris[0]
);
export const getUserInfo: GetUserInfoFn = async (client) => {
  try {
    const oauth2 = google.oauth2("v2");
    return new Promise((resolve, reject) => {
      oauth2.userinfo.get({ auth: client }, (err, res) => {
        if (err) {
          reject(err);
        }
        const { picture, id, name } = res.data;
        resolve({ picture, id, name });
      });
    });
  } catch (err) {
    println({ severity: Severity.Error }, err);
  }
};

export const getClient: GetClientFn = () =>
  new OAuth2Client(keys.web.client_id, keys.web.client_secret, redirect_uri);

export const getTokens: GetTokensFn = async (code) => {
  const client = getClient();
  const { access_token: accessToken, refresh_token: refreshToken } = (
    await client.getToken(code)
  ).tokens;
  if (!accessToken || !refreshToken) throw Error("Missing token from response");
  return { accessToken, refreshToken };
};
