import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

export const Desktop = ({ children }) => {
  const DesktopLaptop = useMediaQuery({ minWidth: 1024 });
  return DesktopLaptop ? { children } : null;
};
Desktop.propTypes = {
  children: PropTypes.string,
};
