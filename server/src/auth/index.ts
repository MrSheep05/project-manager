import { google } from "googleapis";
import { OAuth2Client } from "googleapis-common";

export const getUserInfo = async (client: OAuth2Client): Promise<UserInfo> => {
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
type UserInfo = {
  picture: string;
  id: string;
  name: string;
};
