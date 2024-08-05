export const routerClient = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "admin" */ "./views/Admin.vue"),
    meta: { requiresAuth: true },
  },
];
export const routerAdmin = [{}];
