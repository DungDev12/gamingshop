import { Route, Routes } from "react-router-dom";
import { routerClient } from "./routes/routes";
import LayoutClient from "./public/layout/LayoutClient";
import { Fragment } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const baseURL = import.meta.env.VITE_BASE_URL || "/";
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider  >
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
    </QueryClientProvider>
  );
}

export default App;
