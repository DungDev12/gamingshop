import { ReactNode } from "react";
import HeaderAdmin from "./HeaderAdmin";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: ReactNode;
}
const LayoutAdmin: React.FC<LayoutProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);

  return user?.logged ? (
    user?.role === "ADMIN" ? (
      <div className="flex items-stretch justify-start">
        <HeaderAdmin />
        <div className="max-h-[100vh] overflow-hidden p-4 flex-1">
          {children}
        </div>
        <ToastContainer />
      </div>
    ) : (
      <Navigate to={`${import.meta.env.VITE_BASE_URL}/admin/access-denied`} />
    )
  ) : (
    <Navigate to={`${import.meta.env.VITE_BASE_URL}/admin/login`} />
  );
};

export default LayoutAdmin;
