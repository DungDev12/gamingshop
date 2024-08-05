import Home from "@/page/client/pages/home/Home";

export const routerClient = [
  {
    path: "/",
    name: "Home",
    page: Home,
    meta: {
      layout: "user",
    },
  },
];
export const routerAdmin = [{}];
