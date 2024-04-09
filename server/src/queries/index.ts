import { runProcedure } from "./queries";
import { GetConnectionsFn, Procedure, ProcedureResponse, Role } from "./types";

export const getConnections: GetConnectionsFn = async (data) => {
  const result = await runProcedure({
    type: Procedure.GetConnection,
    payload: data,
  });
  if (result.key === ProcedureResponse.AllConnections) {
    return result.body;
  }
  throw Error("Unexpected result from Getconnection procedure");
};
