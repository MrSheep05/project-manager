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
  }
};

export const registerUser: RegisterUserFn = async (payload) => {
  const response = await runProcedure({ type: Procedure.CreateUser, payload });
  if (response.key === ProcedureResponse.CreatedUser) {
    return response.body;
  }
  throw Error("Unexpected result from CreateUser procedure");
};

export type RegisterUserFn = (payload: {
  uid: string;
  email: string;
}) => Promise<User>;
export type getUserProcedureFn = (uid: string) => Promise<UserBody | undefined>;
