import Home from "@/page/client/pages/home/Home";

// offLayout: true,  /// tắt layout header, footer
export const routerClient = [
  {
    path: "/",
    name: "Home",
    page: Home,
    offLayout: true,
  },
];
export const routerAdmin = [{}];
