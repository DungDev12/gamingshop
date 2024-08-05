import { Route, Routes } from "react-router-dom";
import { routerClient } from "./routes/routes";

function App() {
  return (
    <>
      <Routes>
        {routerClient &&
          routerClient.map((route, i) => {
            return <Route key={i} path={route.path} element={route.element} />;
          })}
      </Routes>
    </>
  );
}

export default App;