import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

export const Desktop = ({ children }) => {
  const DesktopLaptop = useMediaQuery({ minWidth: 768 });
  return DesktopLaptop ? children : null;
};
Desktop.propTypes = {
  children: PropTypes.object,
};
export const Mobile = ({ children }) => {
  const DesktopLaptop = useMediaQuery({ maxDeviceWidth: 767 });
  return DesktopLaptop ? children : null;
};
Mobile.propTypes = {
  children: PropTypes.object,
};