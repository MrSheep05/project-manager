import {
  DataResponse,
  Procedure,
  ProcedureResponse,
  QueryResponse,
  StoredProcedure,
} from "./types";
import mysql from "mysql2/promise";

const findOutput = (data, key: ProcedureResponse) => {
  if (key in data) {
    return data[key];
  }

  if (Array.isArray(data)) {
    return data.reduce((output, item) => {
      if (output) return output;

      return findOutput(item, key);
    }, null);
  }

  return null;
};

export const runProcedure = async (
  connection: mysql.Connection,
  action: StoredProcedure
): Promise<QueryResponse> => {
  switch (action.type) {
    case Procedure.AddCategory: {
      const { uid, name, color } = action.payload;
      return await createCall(connection, action.type, [uid, name, color], 3);
    }
    case Procedure.AddConnection: {
      const { uid, connectionId } = action.payload;
      return await createCall(connection, action.type, [uid, connectionId], 2);
    }
    case Procedure.AddProject: {
      const { uid, content, title, statusId, categoriesIds } = action.payload;
      return await createCall(
        connection,
        action.type,
        [
          uid,
          statusId,
          joinVaraibles(categoriesIds, categoriesIds.length),
          title,
          content,
        ],
        5
      );
    }
    case Procedure.AddStatus: {
      const { uid, name, color } = action.payload;

      return await createCall(connection, action.type, [name, color, uid], 3);
    }
    case Procedure.GetStatus: {
      const { uid } = action.payload;
      return await createCall(connection, action.type, [uid], 1);
    }
    case Procedure.GetCategories: {
      const { uid } = action.payload;
      return await createCall(connection, action.type, [uid], 1);
    }
    case Procedure.GetConnection: {
      const { uid, role } = action.payload;
      return await createCall(connection, action.type, [uid, role], 2);
    }
    case Procedure.RemoveCategory: {
      const { uid, categoryId } = action.payload;
      return await createCall(connection, action.type, [uid, categoryId], 2);
    }
    case Procedure.RemoveConnection: {
      const { connectionId } = action.payload;
      return await createCall(connection, action.type, [connectionId], 1);
    }
    case Procedure.RemoveStatus: {
    }
    case Procedure.CreateUser: {
    }
    case Procedure.DisableAccount: {
    }
    case Procedure.EnableAccount: {
    }
    default: {
      return;
    }
  }
};

const createCall = async (
  connection: mysql.Connection,
  procedureName: Procedure,
  variables: any[],
  args: number
): Promise<QueryResponse> => {
  if (args === 0) return;
  try {
    const response = await connection.query(
      `CALL ${process.env.MYSQL_DATABASE}.${procedureName}(${Array.from(
        { length: args },
        () => "?"
      ).join(",")})`,
      variables
    );
    const responseType = Procedure.getResponse(procedureName);
    const responseData =
      responseType !== ProcedureResponse.None
        ? findOutput(response, responseType)
        : undefined;
    if (
      responseData &&
      responseType !== ProcedureResponse.None &&
      responseType !== ProcedureResponse.ProjectResult
    ) {
      const translated: DataResponse = {
        key: responseType,
        body: JSON.parse(responseData),
      };
      return translated;
    }
    return;
  } catch (e) {
    return {
      code: e.errno ?? 0,
      message: e.sqlMessage ?? "unexpected",
      state: e.sqlState ?? "0",
    };
  }
};

const joinVaraibles = (
  variables: (string | undefined)[],
  expected: number
): string =>
  expected > 0
    ? [...Array(expected - 1).keys()].reduce((prev, i) => {
        if (variables[i + 1]) {
          return `${prev}, ${variables[i + 1]}`;
        } else {
          return `${prev}, NULL`;
        }
      }, `${variables[0] ?? "NULL"}`)
    : "";

const wrapStrings = (vals: string[]): string[] => vals.map((v) => `'${v}'`);
