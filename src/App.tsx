import Layout from "@Pages/DefaultPage/Layout";
import { RouterAdmin, RouterBase } from "@routes/routes";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PrivateRouter from "@Pages/Desktop/Auth/private/PrivateRoute";
import LayoutAdmin from "@Pages/DefaultPage/LayoutAdmin";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./store/actions/UserSlice";

function App() {
  const navigate = useNavigate();
  const dispath = useDispatch();

  useEffect(() => {
    const checkCookie = () => {
      const jwtCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("JWT="));
      console.log(jwtCookie);
      if (!jwtCookie) {
        dispath(logout());
      }
    };

    checkCookie();

    const intervalId = setInterval(checkCookie, 60000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_KEY_GOOGLE}>
        <Routes>
          {RouterBase &&
            RouterBase.map((route) => {
              const Page = route.element;
              const LayoutWrapper = !route.disableLayout ? Layout : Fragment;
              return (
                <Route
                  key={route.id}
                  path={route.path}
                  element={
                    <LayoutWrapper>
                      {route?.auth ? (
                        <PrivateRouter>
                          <Page />
                        </PrivateRouter>
                      ) : (
                        <Page />
                      )}
                    </LayoutWrapper>
                  }
                />
              );
            })}
          {RouterAdmin &&
            RouterAdmin.map((route) => {
              const Page = route.element;
              const LayoutWrapper = !route.disableLayout
                ? LayoutAdmin
                : Fragment;
              return (
                <Route
                  key={route.id}
                  path={route.path}
                  element={
                    <LayoutWrapper>
                      {route?.auth ? (
                        <PrivateRouter>
                          <Page />
                        </PrivateRouter>
                      ) : (
                        <Page />
                      )}
                    </LayoutWrapper>
                  }
                />
              );
            })}
        </Routes>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
