import { google } from "googleapis";
import { OAuth2Client } from "googleapis-common";
import { GetClientFn, GetTokensFn, GetUserInfoFn } from "./types";
import keys from "../../client.keys.json";

export const getUserInfo: GetUserInfoFn = async (client) => {
  try {
    const oauth2 = google.oauth2("v2");
    return new Promise((resolve, reject) => {
      oauth2.userinfo.v2.me.get({ auth: client }, (err, res) => {
        if (err) {
          reject(err);
        }
        console.log(res);

        const { picture, id, name } = res.data;
        resolve({ picture, id, name });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const getClient: GetClientFn = () =>
  new OAuth2Client(
    keys.web.client_id,
    keys.web.client_secret,
    "http://localhost:3000/oauth2callback"
  );

export const getTokens: GetTokensFn = async (code) => {
  const client = getClient();
  const { access_token: accessToken, refresh_token: refreshToken } = (
    await client.getToken(code)
  ).tokens;
  if (!accessToken || !refreshToken) throw Error("Missing token from response");
  return { accessToken, refreshToken };
};