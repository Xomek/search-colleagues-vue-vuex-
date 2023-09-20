import type { User } from "@/types";
import type { ActionContext } from "vuex";

export interface RootState {
  state: State;
}

export interface State {
  searchValue: string | null;
  user: User | null;
  results: User[] | null;
  userStatus: Statuses;
  userError: string | null;
  resultsStatus: Statuses;
  resultsError: string | null;
}

export interface Mutations {
  changeSearch: (state: State, payload: string) => void;
  resetState: (state: State) => void;
}

export type Statuses = "loading" | "error" | "success" | "nothing";
export type ActionsContext = ActionContext<State, any>;
