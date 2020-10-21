import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { auth } from "./db";
require("firebase/firestore");

Vue.config.productionTip = false;

let app = null; // waiting for firebase auth to initialize before creating a vue instance

auth.onAuthStateChanged(() => {
  if (!app) {
    // initialize app if not already created
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});