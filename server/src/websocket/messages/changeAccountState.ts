import { postToConnections } from "..";
import { getConnections } from "../../queries";
import { runProcedure } from "../../queries/queries";
import { Procedure, ProcedureResponse, Role } from "../../queries/types";
import { disableAccount, enableAccount } from "../database";
import { ChangeAccountStateMessageFn } from "./types";

export const changeAccountStateMessage: ChangeAccountStateMessageFn = async ({
  message,
  connectionId,
}) => {
  const {
    action,
    payload: { state, uid },
  } = message;
  const connections = (await getConnections({ role: Role.Admin })).map(
    ({ connection_id }) => connection_id
  );
  const result = state
    ? await enableAccount({ connectionId, uid })
    : await disableAccount({ connectionId, uid });
  postToConnections({
    connections,
    message: JSON.stringify({ action, payload: result }),
  });
};
