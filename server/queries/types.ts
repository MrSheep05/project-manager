export enum Role {
  Admin = "admin",
  User = "user",
}

export type StoredProcedure =
  | AddCategoryProcedure
  | AddConnectionProcedure
  | AddProjectProcedure
  | AddStatusProcedure
  | CreateUserProcedure
  | ActiveAccountProcedure
  | GetCategoriesProcedure
  | GetConnectionProcedure
  | GetStatusProcedure
  | RemoveCategoryProcedure
  | RemoveConnectionProcedure
  | RemoveStatusProcedure;

export enum Procedure {
  AddCategory = "AddCategory",
  AddConnection = "AddConnection",
  AddProject = "AddProject",
  AddStatus = "AddStatus",
  CreateUser = "CreateUser",
  DisableAccount = "DisableAccount",
  EnableAccount = "EnableAccount",
  GetCategories = "GetCategories",
  GetConnection = "GetConnection",
  GetStatus = "GetStatus",
  GetProjects = "GetProjects",
  RemoveCategory = "RemoveCategory",
  RemoveConnection = "RemoveConnection",
  RemoveStatus = "RemoveStatus",
}
export type QueryResponse = ResponseError | DataResponse | undefined;
export type ResponseError = { message: string; state: string; code: number };
export type DataResponse =
  | StatusResponse
  | CategoryResponse
  | UserResponse
  | GetCategoriesResponse
  | GetStatusResponse
  | CreateProjectResponse
  | GetConnectionResponse;

type AddCategoryProcedure = {
  type: Procedure.AddCategory;
  payload: {
    uid: string;
    name: string;
    color: number;
  };
};

type AddConnectionProcedure = {
  type: Procedure.AddConnection;
  payload: {
    uid: string;
    connectionId: string;
  };
};

type AddProjectProcedure = {
  type: Procedure.AddProject;
  payload: {
    uid: string;
    statusId: string;
    categoriesIds: string[];
    title: string;
    content: string;
  };
};

type AddStatusProcedure = {
  type: Procedure.AddStatus;
  payload: {
    uid: string;
    name: string;
    color: number;
  };
};

type CreateUserProcedure = {
  type: Procedure.CreateUser;
  payload: {
    uid: string;
    email: string;
  };
};

type ActiveAccountProcedure = {
  type: Procedure.DisableAccount | Procedure.EnableAccount;
  payload: {
    uid: string;
    iss: string;
  };
};

type GetCategoriesProcedure = {
  type: Procedure.GetCategories;
  payload: {
    uid: string;
  };
};

type GetConnectionProcedure = {
  type: Procedure.GetConnection;
  payload: {
    uid?: string;
    role?: Role;
  };
};

type GetStatusProcedure = {
  type: Procedure.GetStatus;
  payload: {
    uid: string;
  };
};

type RemoveCategoryProcedure = {
  type: Procedure.RemoveCategory;
  payload: { uid: string; categoryId: string };
};

type RemoveConnectionProcedure = {
  type: Procedure.RemoveConnection;
  payload: { connectionId: string };
};

type RemoveStatusProcedure = {
  type: Procedure.RemoveStatus;
  payload: {
    uid: string;
    statusId: string;
  };
};

type CategoryOrStatusBody = { id: string; email: string; is_enabled: boolean };
type ProjectBody = {
  project_id: string;
  user_id: string;
  status: CategoryOrStatusBody;
  categories: CategoryOrStatusBody[];
  title: string;
  content: string;
  timestamp: number;
};
type UserResponse = {
  key:
    | ProcedureResponse.DisabledAccount
    | ProcedureResponse.EnabledAccount
    | ProcedureResponse.CreatedUser;
  body: CategoryOrStatusBody;
};

type StatusResponse = {
  key: ProcedureResponse.RemovedStatus | ProcedureResponse.CreatedStatus;
  body: CategoryOrStatusBody;
};
type CategoryResponse = {
  key: ProcedureResponse.RemovedCategory | ProcedureResponse.CreatedCategory;
  body: CategoryOrStatusBody;
};
type GetStatusResponse = {
  key: ProcedureResponse.StatusResult;
  body: CategoryOrStatusBody[];
};

type GetCategoriesResponse = {
  key: ProcedureResponse.CategoriesResult;
  body: CategoryOrStatusBody;
};

type CreateProjectResponse = {
  key: ProcedureResponse.CreatedProject;
  body: ProjectBody;
};

type GetConnectionResponse = {
  key: ProcedureResponse.AllConnections;
  body: { user_id: string; connection_id: string }[];
};

export enum ProcedureResponse {
  None = "None",
  CreatedCategory = "CreatedCategory",
  CreatedProject = "CreatedProject",
  CreatedStatus = "CreatedStatus",
  CreatedUser = "CreatedUser",
  DisabledAccount = "DisabledAccount",
  EnabledAccount = "EnabledAccount",
  CategoriesResult = "CategoriesResult",
  StatusResult = "StatusResult",
  ProjectResult = "ProjectResult",
  AllConnections = "AllConnections",
  RemovedCategory = "RemovedCategory",
  RemovedStatus = "RemovedStatus",
}

export namespace Procedure {
  export const getResponse = (procedure: Procedure): ProcedureResponse => {
    switch (procedure) {
      case Procedure.AddCategory: {
        return ProcedureResponse.CreatedCategory;
      }
      case Procedure.AddProject: {
        return ProcedureResponse.CreatedProject;
      }
      case Procedure.AddStatus: {
        return ProcedureResponse.CreatedStatus;
      }
      case Procedure.GetStatus: {
        return ProcedureResponse.StatusResult;
      }
      case Procedure.GetCategories: {
        return ProcedureResponse.CategoriesResult;
      }
      case Procedure.GetConnection: {
        return ProcedureResponse.AllConnections;
      }
      case Procedure.RemoveCategory: {
        return ProcedureResponse.RemovedCategory;
      }
      case Procedure.RemoveStatus: {
        return ProcedureResponse.RemovedStatus;
      }
      case Procedure.CreateUser: {
        return ProcedureResponse.CreatedUser;
      }
      case Procedure.DisableAccount: {
        return ProcedureResponse.DisabledAccount;
      }
      case Procedure.EnableAccount: {
        return ProcedureResponse.EnabledAccount;
      }
      default: {
        return ProcedureResponse.None;
      }
    }
  };
}
