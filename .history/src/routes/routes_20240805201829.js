import { lazy } from "react";

export const routerClient = [
  {
    path: "/",
    name: "Home",
    component: () => lazy(import("@/page/client/pages/home/Home")),
  },
];
export const routerAdmin = [{}];
