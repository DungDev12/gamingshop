import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}
const PrivateRouter: React.FC<LayoutProps> = ({ children }) => {
  const isLogged = useSelector((state: RootState) => state.user?.logged);
  return isLogged ? children : <Navigate to={import.meta.env.VITE_BASE_URL} />;
};

export default PrivateRouter;
