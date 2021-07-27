import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../pages/Dashboard.vue"),
    },
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../pages/About.vue"),
    },
    {
      path: "/add/payment/:type",
      name: "AddPayment",
      component: () => import("../pages/Dashboard.vue"),
    },
    {
      path: "/notfound",
      name: "NotFound",
      component: () => import("../pages/NotFound.vue"),
    },
    {
      path: "*",
      redirect: "/notfound",
    },
  ],
});

const setTitle = (name) => {
  return [name];
};

router.afterEach((to) => {
  document.title = setTitle(to.name);
});

export default router;
