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
      return await createCall(
        connection,
        action.type,
        [...wrapStrings([uid, name]), color.toString()],
        3
      );
    }
    case Procedure.AddConnection: {
      const { uid, connectionId } = action.payload;
      return await createCall(
        connection,
        action.type,
        wrapStrings([uid, connectionId]),
        2
      );
    }
    case Procedure.AddProject: {
      const { uid, content, title, statusId, categoriesIds } = action.payload;
      return await createCall(
        connection,
        action.type,
        wrapStrings([
          uid,
          statusId,
          joinVaraibles(categoriesIds, categoriesIds.length),
          title,
          content,
        ]),
        5
      );
    }
    case Procedure.AddStatus: {
      const { uid, name, color } = action.payload;
      const [id, n] = wrapStrings([uid, name]);
      return await createCall(
        connection,
        action.type,
        [n, color.toString(), id],
        3
      );
    }
    case Procedure.GetStatus: {
      const { uid } = action.payload;
      return await createCall(connection, action.type, wrapStrings([uid]), 1);
    }
    case Procedure.GetCategories: {
      return await createCall(
        connection,
        action.type,
        [`'${action.payload.uid}'`],
        1
      );
    }
    case Procedure.GetConnection: {
      const { uid, role } = action.payload;
      return await createCall(
        connection,
        action.type,
        wrapStrings([uid, role]),
        2
      );
    }
    case Procedure.RemoveCategory: {
      const { uid, categoryId } = action.payload;
      return await createCall(
        connection,
        action.type,
        wrapStrings([uid, categoryId]),
        2
      );
    }
    case Procedure.RemoveConnection: {
      const { connectionId } = action.payload;
      return await createCall(
        connection,
        action.type,
        wrapStrings([connectionId]),
        1
      );
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
  variables: (string | undefined)[],
  args: number
): Promise<QueryResponse> => {
  try {
    const response = await connection.query(
      `CALL ${process.env.MYSQL_DATABASE}.${procedureName}(${joinVaraibles(
        variables,
        args
      )})`
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

const allowedChars = /^[A-Za-z0-9\-]+$/;
const joinVaraibles = (
  variables: (string | undefined)[],
  expected: number
): string =>
  expected > 0
    ? [...Array(expected - 1).keys()].reduce((prev, i) => {
        if (variables[i + 1] !== null && variables[i + 1].match(allowedChars)) {
          return `${prev}, ${variables[i + 1]}`;
        } else {
          return `${prev}, NULL`;
        }
      }, `${variables[0] ?? "NULL"}`)
    : "";

const wrapStrings = (vals: string[]): string[] => vals.map((v) => `'${v}'`);
