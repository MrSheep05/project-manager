import { IncomingMessage } from "http";
import * as stream from "node:stream";
import { Request, Response } from "express";
import { Send } from "express-serve-static-core";
import { UserBody } from "../queries/types";
export type Tokens = {
  accessToken?: string;
  refreshToken?: string;
};

export type InformDisabledAccount = (payload: {
  request: IncomingMessage;
  socket: stream.Duplex;
  head: Buffer;
  data: UserBody;
}) => void;

export type GetTokensFromURLFn = (req: IncomingMessage) => Tokens | undefined;
export type GoogleOAuthFn = (req: Request, res: Response) => Promise<void>;

export type GoogleTokenFn = (
  req: TypedRequestBody<{ code?: string }>,
  res: TypedResponseJSON<{ accessToken: string; refreshToken: string }>
) => Promise<any>;

export type AuthorizeUpgradeFn = (
  request: IncomingMessage,
  socket: stream.Duplex,
  head: Buffer
) => Promise<any>;

export interface TypedRequestBody<T> extends Request {
  body: T;
}

interface TypedResponseJSON<T> extends Response {
  json: Send<T, this>;
}
