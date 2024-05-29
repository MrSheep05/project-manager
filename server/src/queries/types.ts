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
  | RemoveStatusProcedure
  | GetUserProcedure
  | GetAllUsersProcedure
  | GetProjectsProcedure;

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
  GetUser = "GetUser",
  GetAllUsers = "GetAllUsers",
}
export type QueryResponse =
  | DataResponse
  | { key: ProcedureResponse.None; body: any };
export type ResponseError = { message: string; state: string; code: number };
export type DataResponse =
  | StatusResponse
  | CategoryResponse
  | UserResponse
  | GetCategoriesResponse
  | GetStatusResponse
  | CreateProjectResponse
  | GetConnectionResponse
  | GetUserResponse
  | AllUsersResponse
  | GetProjectsResponse;

type GetAllUsersProcedure = {
  type: Procedure.GetAllUsers;
  payload: {
    connectionId: string;
    offsetUid?: string;
  };
};
type AddCategoryProcedure = {
  type: Procedure.AddCategory;
  payload: {
    connectionId: string;
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
    connectionId: string;
    statusId: string;
    categoriesIds: string[];
    title: string;
    content: string;
  };
};

type AddStatusProcedure = {
  type: Procedure.AddStatus;
  payload: {
    connectionId: string;
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
    connectionId: string;
  };
};

type GetCategoriesProcedure = {
  type: Procedure.GetCategories;
  payload: {
    connectionId: string;
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
    connectionId: string;
  };
};

type RemoveCategoryProcedure = {
  type: Procedure.RemoveCategory;
  payload: { connectionId: string; categoryId: string };
};

type RemoveConnectionProcedure = {
  type: Procedure.RemoveConnection;
  payload: { connectionId: string };
};

type RemoveStatusProcedure = {
  type: Procedure.RemoveStatus;
  payload: {
    connectionId: string;
    statusId: string;
  };
};

type GetProjectsProcedure = {
  type: Procedure.GetProjects;
  payload: { connectionId: string; offsetId?: string };
};
type GetUserProcedure = {
  type: Procedure.GetUser;
  payload: {
    uid: string;
  };
};

export type CategoryOrStatusBody = {
  id: string;
  name: string;
  color: number;
  visible: boolean;
};
export type ProjectBody = {
  id: string;
  project_id: string;
  user_id: string;
  user_email: string;
  status: CategoryOrStatusBody;
  categories: CategoryOrStatusBody[];
  title: string;
  content: string;
  timestamp: number;
};
export type UserBody = {
  id: string;
  email: string;
  role: Role;
  enabled: boolean;
};
type UserResponse = {
  key:
    | ProcedureResponse.DisabledAccount
    | ProcedureResponse.EnabledAccount
    | ProcedureResponse.CreatedUser;
  body: UserBody;
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
export type User = {
  id: string;
  email: string;
  enabled: boolean;
  role: Role;
};
type AllUsersResponse = {
  key: ProcedureResponse.AllAccounts;
  body: UserBody[];
};
type GetUserResponse = {
  key: ProcedureResponse.GetUserResult;
  body: User;
};
type GetCategoriesResponse = {
  key: ProcedureResponse.CategoriesResult;
  body: CategoryOrStatusBody[];
};

type CreateProjectResponse = {
  key: ProcedureResponse.CreatedProject;
  body: ProjectBody;
};

type GetConnectionResponse = {
  key: ProcedureResponse.AllConnections;
  body: { user_id: string; connection_id: string }[];
};

type GetProjectsResponse = {
  key: ProcedureResponse.AllProjects;
  body: ProjectBody[];
};
export enum ProcedureResponse {
  None = 0,
  GetUserResult = "user",
  CreatedCategory = "CreatedCategory",
  CreatedProject = "CreatedProject",
  CreatedStatus = "CreatedStatus",
  CreatedUser = "CreatedUser",
  DisabledAccount = "DisabledAccount",
  EnabledAccount = "EnabledAccount",
  CategoriesResult = "CategoriesResult",
  StatusResult = "StatusResult",
  AllConnections = "AllConnections",
  RemovedCategory = "RemovedCategory",
  RemovedStatus = "RemovedStatus",
  AllAccounts = "AllAccounts",
  AllProjects = "AllProjects",
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
      case Procedure.GetUser: {
        return ProcedureResponse.GetUserResult;
      }
      case Procedure.GetAllUsers: {
        return ProcedureResponse.AllAccounts;
      }
      case Procedure.GetProjects: {
        return ProcedureResponse.AllProjects;
      }
      default: {
        return ProcedureResponse.None;
      }
    }
  };
}

export type GetConnectionsFn = ({
  uid,
  role,
}: {
  uid?: string;
  role?: Role;
}) => Promise<{ user_id: string; connection_id: string }[]>;
