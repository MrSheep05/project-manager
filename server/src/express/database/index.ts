import { println } from "../../log";
import { Severity } from "../../log/types";
import { runProcedure } from "../../queries/queries";
import {
  Procedure,
  ProcedureResponse,
  User,
  UserBody,
} from "../../queries/types";

export const getUserProcedure: getUserProcedureFn = async (uid: string) => {
  const response = await runProcedure({
    type: Procedure.GetUser,
    payload: { uid },
  });
  if (response.key === ProcedureResponse.GetUserResult) {
    return response.body;
  } else if (
    response.key === ProcedureResponse.None &&
    !response.body[0][0][0] //Funny procedure response type
  ) {
    println({ severity: Severity.Info }, "No user exists of uid", uid);
    return;
  }
  throw Error("Unexpected result from GetUser procedure");
};

export const registerUser: RegisterUserFn = async (payload) => {
  const response = await runProcedure({ type: Procedure.CreateUser, payload });
  if (response.key === ProcedureResponse.CreatedUser) {
    return response.body;
  }
  throw Error("Unexpected result from CreateUser procedure");
};

export const getCsvProjects: getCsvProjectsFn = async (
  connectionId: string,
  usersId: string
) => {
  const response = await runProcedure({
    type: Procedure.CsvProjects,
    payload: { connectionId, usersId },
  });
  if (response.key === ProcedureResponse.CsvProjects) {
    return response.body;
  } else if (
    response.key === ProcedureResponse.None &&
    !response.body[0][0][0] //Funny procedure response type
  ) {
    println({ severity: Severity.Info }, "No user exists of uid", usersId);
    return;
  }
  throw Error("Unexpected result from GetUser procedure");
};

export type RegisterUserFn = (payload: {
  uid: string;
  email: string;
}) => Promise<User>;
export type getUserProcedureFn = (uid: string) => Promise<UserBody | undefined>;

export type getCsvProjectsFn = (
  connectionId: string,
  usersId: string
) => Promise<any | undefined>;
