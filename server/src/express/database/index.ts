import { runProcedure } from "../../queries/queries";
import { Procedure, ProcedureResponse, User } from "../../queries/types";

export const getUserProcedure: getUserProcedureFn = async (uid: string) => {
  const response = await runProcedure({
    type: Procedure.GetUser,
    payload: { uid },
  });
  if (response.key === ProcedureResponse.GetUserResult) {
    return response.body;
  }
  throw Error("Unexpected response from getUserData procedure");
};
export type getUserProcedureFn = (uid: string) => Promise<User>;
