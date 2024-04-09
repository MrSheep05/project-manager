import { runProcedure } from "../../queries/queries";
import { Procedure, ProcedureResponse } from "../../queries/types";
import { AddConnectionFn, AddProjectFn, RemoveConnectionFn } from "./types";

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

export const addProject: AddProjectFn = async (payload) => {
  const result = await runProcedure({ type: Procedure.AddProject, payload });
  if (result.key === ProcedureResponse.CreatedProject) {
    return result.body;
  }
  throw Error("Unexpected result from AddProject procedure");
};
