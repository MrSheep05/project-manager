import { OAuth2Client } from "googleapis-common";

export type UserInfo = {
  picture: string;
  id: string;
  name: string;
};
export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
export type GetUserInfoFn = (client: OAuth2Client) => Promise<UserInfo>;
export type GetTokensFn = (code: string) => Promise<Tokens>;
export type GetClientFn = () => OAuth2Client;
