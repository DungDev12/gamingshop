import PropTypes from "prop-types";
import Footer from "@/page/client/pages/layout/Footer";
import Header from "@/page/client/pages/layout/Header";

const LayoutClient = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
LayoutClient.propTypes = {
  children: PropTypes.object,
};
export default LayoutClient;
