import { runProcedure } from "../../queries/queries";
import { Procedure, ProcedureResponse } from "../../queries/types";
import {
  AddCategoryStatusFn,
  AddConnectionFn,
  AddProjectFn,
  GetCategoryStatusFn,
  RemoveConnectionFn,
} from "./types";

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
  if (result.key === ProcedureResponse.CreatedProject) return result.body;

  throw Error("Unexpected result from AddProject procedure");
};

export const addCategory: AddCategoryStatusFn = async (payload) => {
  const result = await runProcedure({ type: Procedure.AddCategory, payload });
  if (result.key === ProcedureResponse.CreatedCategory) return result.body;

  throw Error("Unexpected result from AddCategory procedure");
};

export const addStatus: AddCategoryStatusFn = async (payload) => {
  const result = await runProcedure({ type: Procedure.AddStatus, payload });
  if (result.key === ProcedureResponse.CreatedStatus) return result.body;

  throw Error("Unexpected result from AddStatus procedure");
};

export const getStatus: GetCategoryStatusFn = async (payload) => {
  const result = await runProcedure({ type: Procedure.GetStatus, payload });
  if (result.key === ProcedureResponse.StatusResult) return result.body;

  throw Error("Unexpected result from GetStatus procedure");
};

export const getCategories: GetCategoryStatusFn = async (payload) => {
  const result = await runProcedure({ type: Procedure.GetCategories, payload });
  if (result.key === ProcedureResponse.CategoriesResult) return result.body;

  throw Error("Unexpected result from GetCategory procedure");
};
