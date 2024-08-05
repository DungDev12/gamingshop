import Header from "@/page/client/pages/layout/Header";

const LayoutClient = ({ children }) => {
  return <>
  <Header/>
  {children}
  <Foo
  </>;
};

export default LayoutClient;
