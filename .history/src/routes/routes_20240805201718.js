export const routerClient = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "admin" */ "./"),
    meta: { requiresAuth: true },
  },
];
export const routerAdmin = [{}];
