import { Route, Routes } from "react-router-dom";
import { routerClient } from "./routes/routes";

function App() {
  return <>
    <Routes>
      {
        routerClient && routerClient.map((route))
      }
    </Routes>
  </>;
}

export default App;
