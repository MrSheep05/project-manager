import { Tokens } from "./types";
import { renderToStaticMarkup } from "react-dom/server";

export const isBinary = (data: any) => {
  return (
    typeof data === "object" &&
    Object.prototype.toString.call(data) === "[object Blob]"
  );
};

export const getWindow = <T>(inputArray: T[], size: number): T[][] => {
  if (size < 1) return [[]];
  let a = 0;
  let acc = [];
  do {
    acc.push(inputArray.slice(a, a + size));
    a += size;
  } while (a < inputArray.length);
  return acc;
};

export const saveTokens = (tokens?: Tokens) => {
  tokens?.accessToken
    ? localStorage.setItem("accessToken", tokens.accessToken)
    : localStorage.removeItem("accessToken");

  tokens?.refreshToken
    ? localStorage.setItem("refreshToken", tokens.refreshToken)
    : localStorage.removeItem("refreshToken");
};

export const getTokens = (): Tokens | undefined => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return accessToken && refreshToken
    ? { accessToken, refreshToken }
    : undefined;
};

export const convertSvg = (svg: React.ReactElement) => {
  const markup = renderToStaticMarkup(svg);
  const encoded = encodeURIComponent(markup);
  const dataUri = `url('data:image/svg+xml;utf8,${encoded}')`;
  return dataUri;
};
