import { Tokens } from "../../utils/types";

export type AppStateContext = {
  state: State;
  dispatch: (action: any) => void;
};

export type State = {
  tokens?: Tokens;
};
