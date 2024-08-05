import { Route, Routes } from "react-router-dom";
import { routerClient } from "./routes/routes";
import LayoutClient from "./public/layout/LayoutClient";
import { Fragment } from "react";

function App() {
  const baseURL = import.meta.env.VITE_BASE_URL || "/";
  return (
    <>
      <Routes>
        {routerClient &&
          routerClient.map((route, i) => {
            console.log(route);
            const Page = route.page;
            const LayoutClient = !route.offLayout ? LayoutClient : Fragment;
            return (
              <Route
                key={i}
                path={`${route.path}${baseURL}`}
                element={<Page />}
              />
            );
          })}
      </Routes>
    </>
  );
}

export default App;
