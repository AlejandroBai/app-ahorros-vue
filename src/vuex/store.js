import Vue from "vue";
import Vuex from "vuex";
import router from "../routes";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    requireAuth: true
  },
  mutations: {
    cambiarAuth(state) {
      if (state.requireAuth) {
        state.requireAuth = !state.requireAuth;
        router.push({ name: "home" });
      } else {
        state.requireAuth = !state.requireAuth;
        router.push({ name: "register" });
      }
    }
  }
});
