import { Route, Routes } from "react-router-dom";
import LayoutClient from "./public/layout/LayoutClient";
import { Fragment } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes/routes";

function App() {
  const baseURL = import.meta.env.VITE_BASE_URL || "/";
  const queryClient = new QueryClient();
  const port = 80;
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* {router &&
          router.map((route, i) => {
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
          })} */}
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
