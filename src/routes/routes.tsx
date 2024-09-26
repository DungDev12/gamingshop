import NotFound from "@Pages/DefaultPage/NotFound";
import Login from "@Pages/Desktop/Auth/Login";
import Cart from "@Pages/Desktop/Cart/Cart";
import Collections from "@Pages/Desktop/Collections/Collections";
import Home from "@Pages/Desktop/Home/Home";
import Product from "@Pages/Desktop/Products/Products";
interface RouteType {
  id: string;
  path: string;
  element: React.ComponentType<any>;
  disableLayout?: boolean;
}

const baseURL = import.meta.env.VITE_BASE_URL;

export const RouterBase: RouteType[] = [
  {
    id: "home",
    path: `${baseURL}`,
    element: Home,
    // disableLayout: true
  },
  {
    id: "products",
    path: `${baseURL}/products/:name`,
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
];
