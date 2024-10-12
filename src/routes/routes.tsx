import LoginAdmin from "@Pages/Admin/Auth/LoginAdmin";
import HomeAdmin from "@Pages/Admin/Home/HomeAdmin";
import OrderAdmin from "@Pages/Admin/Home/OrderAdmin";
import ProductAdmin from "@Pages/Admin/Home/ProductAdmin";
import NotFound from "@Pages/DefaultPage/NotFound";
import Login from "@Pages/Desktop/Auth/Login";
import AccessDenied from "@Pages/Desktop/Auth/private/AccessDenied";
import UserSetting from "@Pages/Desktop/Auth/UserSetting";
import Cart from "@Pages/Desktop/Cart/Cart";
import Order from "@Pages/Desktop/Cart/Order";
import Collections from "@Pages/Desktop/Collections/Collections";
import ForgotPassword from "@Pages/Desktop/Home/ForgotPassword";
import Home from "@Pages/Desktop/Home/Home";
import Product from "@Pages/Desktop/Products/Products";
interface RouteType {
  id: string;
  path: string;
  element: React.ComponentType<any>;
  disableLayout?: boolean;
  auth?: boolean;
}

const baseURL = import.meta.env.VITE_BASE_URL;

export const RouterBase: RouteType[] = [
  {
    id: "home",
    path: `${baseURL}`,
    element: Home,
    // disableLayout: true
    auth: false,
  },
  {
    id: "products",
    path: `${baseURL}/products/:id`,
    element: Product,
    // disableLayout: true
  },
  {
    id: "collection",
    path: `${baseURL}/collections/:category`,
    element: Collections,
    // disableLayout: true
  },
  {
    id: "collection",
    path: `${baseURL}/collections/:category/:brand`,
    element: Collections,
    // disableLayout: true
  },
  {
    id: "notfound",
    path: "*",
    element: NotFound,
    disableLayout: true,
  },
  {
    id: "login",
    path: `${baseURL}/auth/login`,
    element: Login,
    // disableLayout: true
  },
  {
    id: "cart",
    path: `${baseURL}/cart`,
    element: Cart,
    // disableLayout: true
  },
  {
    id: "user_setting",
    path: `${baseURL}/setting/user`,
    element: UserSetting,
    // disableLayout: true
    auth: true,
  },
  {
    id: "forgot_password",
    path: `${baseURL}/forgot-password`,
    element: ForgotPassword,
    // disableLayout: true
  },
  {
    id: "order",
    path: `${baseURL}/user/order`,
    element: Order,
    // disableLayout: true
  },
];
export const RouterAdmin: RouteType[] = [
  {
    id: "admin/login",
    path: `${baseURL}/admin/login`,
    element: LoginAdmin,
    disableLayout: true,
  },
  {
    id: "admin",
    path: `${baseURL}/admin`,
    element: HomeAdmin,
    auth: true,
  },
  {
    id: "admin/product",
    path: `${baseURL}/admin/product`,
    element: ProductAdmin,
    auth: true,
  },
  {
    id: "admin/order",
    path: `${baseURL}/admin/order`,
    element: OrderAdmin,
    auth: true,
  },
  {
    id: "admin/access-denied",
    path: `${baseURL}/admin/access-denied`,
    element: AccessDenied,
    disableLayout: true,
  },
];
