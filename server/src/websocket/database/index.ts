import { runProcedure } from "../../queries/queries";
import { Procedure, ProcedureResponse } from "../../queries/types";
import {
  AddCategoryStatusFn,
  AddConnectionFn,
  AddProjectFn,
  EnableOrDisableAccountFn,
  GetCategoryStatusFn,
  GetProjectsFn,
  GetUsersFn,
  RemoveCategory,
  RemoveConnectionFn,
  RemoveStatus,
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

export const removeCategory: RemoveCategory = async (payload) => {
  const result = await runProcedure({
    type: Procedure.RemoveCategory,
    payload,
  });
  if (result.key === ProcedureResponse.RemovedCategory) return result.body;
  throw Error("Unexpected result from RemoveCategory procedure");
};

export const removeStatus: RemoveStatus = async (payload) => {
  const result = await runProcedure({
    type: Procedure.RemoveStatus,
    payload,
  });
  if (result.key === ProcedureResponse.RemovedStatus) return result.body;
  throw Error("Unexpected result from RemoveCategory procedure");
};

export const disableAccount: EnableOrDisableAccountFn = async (payload) => {
  const result = await runProcedure({
    type: Procedure.DisableAccount,
    payload,
  });
  if (result.key === ProcedureResponse.DisabledAccount) return result.body;
  throw Error("Unexpected result from DisableAccount procedure");
};

export const enableAccount: EnableOrDisableAccountFn = async (payload) => {
  const result = await runProcedure({
    type: Procedure.EnableAccount,
    payload,
  });
  if (result.key === ProcedureResponse.EnabledAccount) return result.body;
  throw Error("Unexpected result from EnableAccount procedure");
};

export const getUsers: GetUsersFn = async (payload) => {
  const result = await runProcedure({
    type: Procedure.GetAllUsers,
    payload,
  });
  if (result.key === ProcedureResponse.AllAccounts) return result.body;
  throw Error("Unexpected result from GetAllUsers procedure");
};

export const getProjects: GetProjectsFn = async (payload) => {
  const result = await runProcedure({
    type: Procedure.GetProjects,
    payload,
  });
  if (result.key === ProcedureResponse.AllProjects) {
    return result.body;
  }
  throw Error("Unexpected result from GetProjects procedure");
};
