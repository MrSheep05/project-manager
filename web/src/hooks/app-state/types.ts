import { Role, Tokens, UserInfo } from "../../utils/types";

export type AppStateContext = {
  state: State;
  dispatch: (action: AppDispatch) => void;
};

export enum AppAction {
  SaveUser,
  SaveTokens,
}
export type AppDispatch = SaveTokensD | SaveUserD;

export type State = {
  tokens?: Tokens;
  user?: UserInfo;
  role: Role;
};

type SaveTokensD = {
  type: AppAction.SaveTokens;
  payload: Tokens;
};

type SaveUserD = {
  type: AppAction.SaveUser;
  payload: UserInfo;
};
