import { getProjects } from "../database";
import { GetProjectsMessageFn } from "./types";

export const getProjectsMessage: GetProjectsMessageFn = async ({
  ws,
  message,
}) => {
  const { connectionId } = ws;
  const {
    action,
    payload: { offsetId },
  } = message;
  const result = await getProjects({ connectionId, offsetId });
  ws.send(JSON.stringify({ action, payload: result }));
};
