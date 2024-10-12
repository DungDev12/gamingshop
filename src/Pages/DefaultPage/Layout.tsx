import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="min-h-[79vh]">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
