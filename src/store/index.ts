import { createStore, type ActionContext, type MutationTree } from "vuex";
import { type User } from "@/types";
import { getUserById, getUserByIdOrName } from "../api";

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

const initialState: State = {
  user: null,
  userError: null,
  userStatus: "nothing",
  results: null,
  resultsError: null,
  resultsStatus: "nothing",
  searchValue: null,
};

interface Mutations {
  changeSearch: (state: State, payload: string) => void;
  resetState: (state: State) => void;
}

type Statuses = "loading" | "error" | "success" | "nothing";

const state: State = JSON.parse(JSON.stringify(initialState));

const mutations: MutationTree<State> & Mutations = {
  changeSearch(state, payload) {
    if (payload.length) {
      state.searchValue = payload;
    } else {
      state.searchValue = null;
    }
  },
  resetState(state) {
    state.user = initialState.user;
    state.userError = initialState.userError;
    state.userStatus = initialState.userStatus;
    state.results = initialState.results;
    state.resultsError = initialState.resultsError;
    state.resultsStatus = initialState.resultsStatus;
    state.searchValue = initialState.searchValue;
  },
};

type ActionsContext = ActionContext<State, any>;

const actions = {
  async fetchUsersForResults({ state }: ActionsContext) {
    state.resultsStatus = "loading";

    state.results = initialState.results;
    state.resultsError = initialState.resultsError;
    try {
      const results = await getUserByIdOrName(state.searchValue ?? "");

      state.results = results;

      state.resultsStatus = "success";
    } catch (error) {
      state.resultsStatus = "error";
      if (error instanceof Error) {
        state.resultsError = error.message;
      } else {
        state.resultsError = "Произошла неизвестная ошибка";
      }
    } finally {
      if (!state.searchValue) state.resultsStatus = "nothing";
    }
  },
  
  async fetchUserForUser({ state }: ActionsContext, id: number) {
    state.userStatus = "loading";

    state.user = initialState.user;
    state.userError = initialState.userError;

    try {
      const user = await getUserById(id);

      state.user = user;

      state.userStatus = "success";
    } catch (error) {
      state.userStatus = "error";
      if (error instanceof Error) {
        state.userError = error.message;
      } else {
        state.userError = "Произошла неизвестная ошибка";
      }
    }
  },
};

const store = createStore({
  state,
  mutations,
  actions,
});

export default store;
