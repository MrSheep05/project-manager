import { Tokens } from "../../utils/types";

export type AppStateContext = {
  state: State;
  dispatch: (action: AppDispatch) => void;
};

export enum AppAction {
  SaveUser,
  SaveTokens,
}
export type AppDispatch = SaveTokensD;

export type State = {
  tokens?: Tokens;
};

type SaveTokensD = {
  type: SaveTokensD;
  payload: Tokens;
};
