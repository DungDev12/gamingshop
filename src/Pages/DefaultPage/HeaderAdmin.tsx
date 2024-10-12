import { Link } from "react-router-dom";

const HeaderAdmin = () => {
  const urlBase = import.meta.env.VITE_BASE_URL;
  const link = [
    {
      title: "Trang chủ",
      url: `${urlBase}/admin`,
    },
    {
      title: "Sản phẩm",
      url: `${urlBase}/admin/product`,
    },
    {
      title: "Đơn hàng",
      url: `${urlBase}/admin/order`,
    },
  ];
  return (
    <div className="bg-[rgba(33,33,33,0.61)] w-[100px] h-[100vh] hover:w-[200px] transition-all duration-300 ease-linear ">
      <div className="text-center">
        <h1 className=" py-[10px] text-[#fff] font-bold">ADMIN</h1>
        <ul>
          {link &&
            link.map((url) => (
              <li className="text-[#fff] hover:font-semibold" key={url.title}>
                <Link to={url.url}>{url.title}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderAdmin;
