import { postToConnections } from "..";
import { getConnections } from "../../queries";
import { Role } from "../../queries/types";
import { addProject } from "../database";
import { AddProjectMessageFn } from "./types";

export const addProjectMessage: AddProjectMessageFn = async ({
  message,
  connectionId,
}) => {
  const { payload, action } = message;
  const connections = await getConnections({ role: Role.Admin });
  const result = await addProject({ ...payload, connectionId });
  const data = JSON.stringify({ message: action, payload: result });
  postToConnections({
    connections: [
      ...connections.map(({ connection_id }) => connection_id),
      connectionId,
    ],
    message: data,
  });
};
