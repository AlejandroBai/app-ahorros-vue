import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuex from 'vuex';
import router  from "./routes";
import {store} from './vuex/store';

import "bootstrap/dist/css/bootstrap-grid.css";

Vue.use(VueRouter);

// const router = new VueRouter({
//   routes,
//   mode: "history"
// });
/* --- Router --- */
Vue.router = router;

/* --- Store --- */
Vue.store = store;

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if(requiresAuth) {
//      next({name: 'registrarse'});
//   } else {
//     next();
//   }
//   });
  

Vue.filter("formatear", function(num, tipo) {
  var numSplit, entero, decimal, tipo, signo;
  num = Math.abs(num);
  num = num.toFixed(2);
  numSplit = num.split(".");
  entero = numSplit[0];
  if (entero.length > 3) {
    entero =
      entero.substr(0, entero.length - 3) +
      "," +
      entero.substr(entero.length - 3, 3);
  }
  // else if(entero.length >= 6 && entero.length < 10) {
  //   entero = entero.substr(0, entero.length - 6) + "," + entero.substr(entero.length - 3, 3) + ","  + entero.substr(entero.length - 3, 3);
  // }else if(entero.length >= 9 ) {
  //   entero = entero.substr(0, entero.length - 9) + "," + entero.substr(entero.length - 3, 3) + "," + entero.substr(entero.length - 3, 3) + "," + entero.substr(entero.length - 3, 3);
  // }
  decimal = numSplit[1];

  if (entero > 0 && tipo === "ingreso") {
    return "+ " + entero + "." + decimal + " €";
  } else if (entero < 0 && tipo === "gasto") {
    return "- " + entero + "." + decimal + " €";
  } else {
    return entero + "." + decimal + " €";
  }
});

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});