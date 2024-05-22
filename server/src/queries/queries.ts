import { println } from "../log";
import { getDatabaseConnection } from "./mysql";
import {
  DataResponse,
  Procedure,
  ProcedureResponse,
  QueryResponse,
  StoredProcedure,
} from "./types";

const mayBeEmptyProcedures = [
  ProcedureResponse.AllAccounts,
  ProcedureResponse.AllConnections,
  ProcedureResponse.CategoriesResult,
  ProcedureResponse.StatusResult,
  ProcedureResponse.AllProjects,
];
const findOutput = (data, key: ProcedureResponse) => {
  if (!data) return;
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
  action: StoredProcedure
): Promise<QueryResponse> => {
  switch (action.type) {
    case Procedure.AddCategory: {
      const { connectionId, name, color } = action.payload;
      return await createCall(action.type, [connectionId, name, color], 3);
    }
    case Procedure.AddConnection: {
      const { uid, connectionId } = action.payload;
      return await createCall(action.type, [uid, connectionId], 2);
    }
    case Procedure.AddProject: {
      const { connectionId, content, title, statusId, categoriesIds } =
        action.payload;
      return await createCall(
        action.type,
        [
          connectionId,
          statusId,
          joinVaraibles(categoriesIds, categoriesIds.length),
          title,
          content,
        ],
        5
      );
    }
    case Procedure.AddStatus: {
      const { connectionId, name, color } = action.payload;

      return await createCall(action.type, [name, color, connectionId], 3);
    }
    case Procedure.GetStatus: {
      const { connectionId } = action.payload;
      return await createCall(action.type, [connectionId], 1);
    }
    case Procedure.GetCategories: {
      const { connectionId } = action.payload;
      return await createCall(action.type, [connectionId], 1);
    }
    case Procedure.GetConnection: {
      const { uid, role } = action.payload;
      return await createCall(action.type, [uid, role], 2);
    }
    case Procedure.RemoveCategory: {
      const { connectionId, categoryId } = action.payload;
      return await createCall(action.type, [connectionId, categoryId], 2);
    }
    case Procedure.RemoveConnection: {
      const { connectionId } = action.payload;
      return await createCall(action.type, [connectionId], 1);
    }
    case Procedure.RemoveStatus: {
      const { connectionId, statusId } = action.payload;
      return await createCall(action.type, [connectionId, statusId], 2);
    }
    case Procedure.CreateUser: {
      const { uid, email } = action.payload;
      return await createCall(action.type, [uid, email], 2);
    }
    case Procedure.DisableAccount || Procedure.DisableAccount: {
      const { connectionId, uid } = action.payload;
      return await createCall(action.type, [connectionId, uid], 2);
    }

    case Procedure.GetUser: {
      const { uid } = action.payload;
      return await createCall(action.type, [uid], 1);
    }
    case Procedure.GetAllUsers: {
      const { offsetUid, connectionId } = action.payload;
      return await createCall(action.type, [connectionId, offsetUid], 2);
    }
    case Procedure.GetProjects: {
      const { offsetId, connectionId } = action.payload;
      return await createCall(action.type, [connectionId, offsetId], 2);
    }
    case Procedure.DisableAccount: {
      const { uid, connectionId } = action.payload;
      return await createCall(action.type, [connectionId, uid], 2);
    }
    case Procedure.EnableAccount: {
      const { uid, connectionId } = action.payload;
      return await createCall(action.type, [connectionId, uid], 2);
    }
    default: {
      return { key: 0, body: "NONE" };
    }
  }
};

const createCall = async (
  procedureName: Procedure,
  variables: any[],
  args: number
): Promise<QueryResponse> => {
  if (args === 0) return;
  try {
    const connection = await getDatabaseConnection();
    const response = await connection.query(
      `CALL ${process.env.MYSQL_DATABASE}.${procedureName}(${Array.from(
        { length: args },
        () => "?"
      ).join(",")})`,
      variables
    );
    await connection.end();
    const responseType = Procedure.getResponse(procedureName);

    const responseData =
      responseType !== ProcedureResponse.None
        ? findOutput(response, responseType)
        : undefined;

    if (mayBeEmptyProcedures.includes(responseType) && !responseData) {
      const translated = {
        key: responseType,
        body: [],
      };
      return translated as DataResponse;
    }

    if (responseData && responseType !== ProcedureResponse.None) {
      const translated: DataResponse = {
        key: responseType,
        body: JSON.parse(responseData),
      };
      return translated;
    }
    return { key: ProcedureResponse.None, body: response };
  } catch (e) {
    return { key: ProcedureResponse.None, body: "" };
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
