import { postToConnections } from "..";
import { println } from "../../log";
import { getConnections } from "../../queries";
import { Role } from "../../queries/types";
import { updateProject } from "../database";
import { Action } from "../types";
import { UpdateProjectMessageFn } from "./types";

export const updateProjectMessage: UpdateProjectMessageFn = async ({
  message,
  connectionId,
}) => {
  const { payload } = message;
  const result = await updateProject({ ...payload, connectionId });
  const connections = await getConnections({
    role: Role.Admin,
    uid: result.user_id,
  });
  const data = JSON.stringify({
    message: Action.AddProject,
    payload: {
      ...result,
      categories: JSON.parse(result.categories),
      status: JSON.parse(result.status),
    },
  });
  postToConnections({
    connections: [
      ...connections.map(({ connection_id }) => connection_id),
      connectionId,
    ],
    message: data,
  });
};
