import { PostFn } from "./server-requests.types";

const serverURL = "http://localhost:8080";

export const post: PostFn = async ({ body, path }) => {
  const response = await fetch(`${serverURL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
};
