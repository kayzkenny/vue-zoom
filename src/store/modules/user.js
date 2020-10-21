import { auth } from "../../db";

// initial state
const state = {
  currentUser: {}
};

// getters
const getters = {
  user: state => state.currentUser
};

// actions
const actions = {
  loadUser({ commit }) {
    commit("LOADUSER");
  },
  resetUser({ commit }) {
    commit("RESETUSER");
  }
};

// mutations
const mutations = {
  LOADUSER(state) {
    state.currentUser = auth.currentUser;
  },
  RESETUSER(state) {
    state.currentUser = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
