import { Route, Routes } from "react-router-dom";
import { routerClient } from "./routes/routes";

function App() {
  const baseURL = import.meta.VITE_BASE_URL || "/"
  return (
    <>
      <Routes>
        {routerClient &&
          routerClient.map((route, i) => {
            console.log(route);
            const Page = route.page;
            return <Route key={i} path={route.path} element={<Page />} />;
          })}
      </Routes>
    </>
  );
}

export default App;
