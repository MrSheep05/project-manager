import { runProcedure } from "../../queries/queries";
import { Procedure } from "../../queries/types";
import { AddConnectionFn, RemoveConnectionFn } from "./types";

export const addConnection: AddConnectionFn = async ({ connectionId, uid }) =>
  await runProcedure({
    type: Procedure.AddConnection,
    payload: { uid, connectionId },
  });

export const removeConnection: RemoveConnectionFn = async (connectionId) =>
  await runProcedure({
    type: Procedure.RemoveConnection,
    payload: { connectionId },
  });
