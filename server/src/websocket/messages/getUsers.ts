import { getUsers } from "../database";
import { GetUsersMessageFn } from "./types";

export const getUsersMessage: GetUsersMessageFn = async ({ message, ws }) => {
  const {
    action,
    payload: { offsetUid },
  } = message;
  const { connectionId } = ws;
  const result = await getUsers({ connectionId, offsetUid });
  ws.send(JSON.stringify({ message: action, payload: result }));
};
