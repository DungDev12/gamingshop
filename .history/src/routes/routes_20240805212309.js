import Home from "@/page/client/pages/home/Home";

// offLayout: true,  /// tắt layout header, footer
export const router = {
  port: 80,
  routes: [
    {
      path: "/",
      name: "Home",
      page: Home,
    },
  ],
};
export const routerAdmin = [{}];
