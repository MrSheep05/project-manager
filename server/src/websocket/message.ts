import { postToConnections } from ".";
import { println } from "../log";
import { Severity } from "../log/types";
import { getConnections } from "../queries";
import { Role } from "../queries/types";
import { addProject } from "./database";
import { Action, Mesages, OnMessageFn } from "./types";

export const onMessage: OnMessageFn = async ({ event, ws }) => {
  const { action, payload } = JSON.parse(event.data) as Mesages;
  const { connectionId } = ws;
  if (!action || !payload) return;
  try {
    switch (action) {
      case Action.AddProject: {
        const connections = await getConnections({ role: Role.Admin });
        const result = await addProject({ ...payload, connectionId });
        const message = JSON.stringify(result);
        postToConnections({
          connections: [
            ...connections.map(({ connection_id }) => connection_id),
            connectionId,
          ],
          message,
        });
        break;
      }
      default: {
        println(
          { severity: Severity.Warning },
          "No such matching action for",
          action
        );
      }
    }
  } catch (error) {
    println({ severity: Severity.Error }, error);
  }
};
