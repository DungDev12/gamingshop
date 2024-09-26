import Layout from "@Pages/DefaultPage/Layout";
import { RouterBase } from "@routes/routes";
import { Route, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { getCookie, refreshAccessToken } from "./Component/utils/JwtCookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "./store/actions/UserSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const jwt = getCookie("jwt");
    if (jwt) {
      const decoded = jwtDecode(jwt);
      dispatch(setUser(decoded));
    }
  }, [dispatch]);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const refreshToken = getCookie("jwt"); // Lấy refresh token từ cookie
      if (refreshToken) {
        await refreshAccessToken(); // Cố gắng refresh token
      }
    };
    checkAndRefreshToken();
  }, []);

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
                      <Page />
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
