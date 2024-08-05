import { Route, Routes } from "react-router-dom";
import LayoutClient from "./public/layout/LayoutClient";
import { Fragment } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes/routes";

function App() {
  const baseURL = import.meta.env.VITE_BASE_URL || "/";
  const portAdmin = import.meta.env.VITE_BASE_PORT_ADMIN || "8081";
  const portClient = import.meta.env.VITE_BASE_PORT_CUSTOMER || "8081";
  const queryClient = new QueryClient();

  // Kiểm tra port server
  const checkPort = () => {
    const port = window.location.port;
    return port == 8081 ? "admin" : "client";
  };
  console.log(router[checkPort()]);
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {router &&
          checkPort() &&
          router[checkPort()].map((route, i) => {
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
