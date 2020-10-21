import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user";
import Rooms from "./modules/rooms";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    Rooms,
  }
});