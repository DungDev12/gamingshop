export const routerClient = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {},
    meta: { requiresAuth: true },
  },
];
export const routerAdmin = [{}];
