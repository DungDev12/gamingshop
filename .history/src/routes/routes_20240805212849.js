import Home from "@/page/client/pages/home/Home";

// offLayout: true,  /// tắt layout header, footer
export const routerClient = {
  client: [
    {
      path: "/",
      name: "Home",
      page: Home,
    },
  ],
  admin: []
};
export const routerAdmin = [{}];
