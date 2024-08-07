import { Route, Routes } from "react-router-dom";
import { routerClient } from "./routes/routes";
import LayoutClient from "./public/layout/LayoutClient";
import { Fragment } from "react";

function App() {
  const baseURL = import.meta.env.VITE_BASE_URL || "/";
  const queryClient = new QueryClient()
  return (
    <>
      <Routes>
        {routerClient &&
          routerClient.map((route, i) => {
            console.log(route);
            const Page = route.page;
            const Layout = !route.offLayout ? LayoutClient : Fragment;
            return (
              <Route
                key={i}
                path={`${route.path}${baseURL}`}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
      </Routes>
    </>
  );
}

export default App;
