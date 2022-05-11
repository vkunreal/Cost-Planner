import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/dashboard",
      name: "DashboardView",
      component: () => import("../views/DashboardView"),
    },
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/add/payment/:type",
      name: "AddPayment",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/notfound",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
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
