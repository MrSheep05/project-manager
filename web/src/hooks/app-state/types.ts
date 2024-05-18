import { Role, Tokens, UserInfo } from "../../utils/types";

export type AppStateContext = {
  state: State;
  dispatch: (action: AppDispatch) => void;
};

export enum AppAction {
  SaveUser,
  SaveTokens,
  ChangeAccountState,
}
export type AppDispatch = SaveTokensD | SaveUserD | ChangeAccountStateD;

export type State = {
  tokens?: Tokens;
  user?: UserInfo;
  role: Role;
};

type SaveTokensD = {
  type: AppAction.SaveTokens;
  payload?: Tokens;
};

type ChangeAccountStateD = {
  type: AppAction.ChangeAccountState;
  payload: { state: boolean };
};

type SaveUserD = {
  type: AppAction.SaveUser;
  payload: UserInfo;
};
