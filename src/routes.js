import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from "./components/Home.vue";
import Register from "./components/Register.vue";
import SignIn from "./components/SignIn.vue";
// Importo la constante para poder usarla
import {store} from './vuex/store';

Vue.use(VueRouter);

var trueA = store.state.requireAuth;

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      auth: trueA
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/sign-in",
    name: "signin",
    component: SignIn
  }
  // {
  //   path: "*",
  //   redirect: "/"
  // }
];

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({ routes, mode: 'history' });

// Si meta.auth es true, redirige a Register
router.beforeEach((to, from, next) => {
  if (store.state.requireAuth && to.meta.auth === true) {
    next({ name: "register" });
  } else {
    next();
  }
  console.log('Requiere Auth: ' + store.state.requireAuth);
});

export default router

