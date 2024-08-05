import Home from "@/page/client/pages/home/Home";

// offLayout: true,  /// tắt layout header, footer
export const router = {
  client: [
    {
      path: "/",
      name: "Home",
      page: Home,
    },
  ],
  admin: [
    {
      path: "/",
      name: "Home",
      page: Home,
    },
  ],
};
export const routerAdmin = [{}];
