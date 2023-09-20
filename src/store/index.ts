import { createStore, type MutationTree } from "vuex";
import type { ActionsContext, Mutations, State } from "./Users.types";
import { getUserById, getUserByIdOrName } from "../api";

const initialState: State = {
  user: null,
  userError: null,
  userStatus: "nothing",
  results: null,
  resultsError: null,
  resultsStatus: "nothing",
  searchValue: null,
};

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
