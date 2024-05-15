import { runProcedure } from "./queries";
import { GetConnectionsFn, Procedure, ProcedureResponse } from "./types";

export const getConnections: GetConnectionsFn = async (data) => {
  const result = await runProcedure({
    type: Procedure.GetConnection,
    payload: data,
  });
  if (result.key === ProcedureResponse.AllConnections) {
    return result.body;
  } else if (
    result.key === ProcedureResponse.None &&
    !result.body[0][0].AllConnections
  ) {
    return [];
  }
  throw Error("Unexpected result from Getconnection procedure");
};
