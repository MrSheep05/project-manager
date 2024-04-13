import { println } from "../log";
import { Severity } from "../log/types";
import { GetTokensFromURLFn } from "./types";

export const getTokensFromURL: GetTokensFromURLFn = (req) => {
  if (!req.url || !req.headers.host) return;
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { accessToken, refreshToken } = Object.fromEntries(
    url.searchParams.entries()
  );
  if (refreshToken || accessToken) {
    return { accessToken, refreshToken };
  }
  println(
    { severity: Severity.Warning },
    "Neither accessToken and refreshToken were defined"
  );
};
