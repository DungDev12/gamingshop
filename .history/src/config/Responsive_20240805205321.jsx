import { useMediaQuery } from "react-responsive";

export const Desktop = ({ children }) => {
  const DesktopLaptop = useMediaQuery({ minWidth: 1024 });
  return DesktopLaptop ? { children } : null;
};
