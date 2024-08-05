export const routerClient = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "admin" */ "./vue"),
    meta: { requiresAuth: true },
  },
];
export const routerAdmin = [{}];
