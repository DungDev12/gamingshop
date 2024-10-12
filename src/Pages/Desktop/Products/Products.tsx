import { FaStar } from "react-icons/fa6";
import SwiperProductComponent from "../../../Component/SwiperProductComponent";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Anchor, Breadcrumbs, Rating, Table } from "@mantine/core";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { openLoginModal } from "../../../store/actions/ModalSlice";
import { cart } from "../../../store/actions/userActions";
import { toast } from "react-toastify";

interface ReviewProps {
  comment: string;
  date: string;
  image: string;
  name: string;
  rating: number;
}
interface ProductProps {
  id: number | undefined;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[] | undefined;
  configurations: { name: string; description: string }[];
  rating: number;
  category: string | undefined;
  brand: string | undefined;
  isStock: boolean;
  review: ReviewProps[];
}

const Product: React.FC = () => {
  const { id } = useParams();
  const urlBase = import.meta.env.VITE_BASE_URL;
  const [product, setProduct] = useState<ProductProps>();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    get();
  }, []);

  const items = [
    { title: "Trang chủ", href: `${urlBase}` },
    {
      title: product?.category,
      href: `${urlBase}/collections/${product?.category?.toLowerCase()}`,
      isDisable: !product?.brand,
    },
    ...(!product?.brand
      ? []
      : [
          {
            title: product?.brand,
            href: `${urlBase}/collections/${product?.brand.toLowerCase()}`,
            isDisable: true,
          },
        ]),
  ];
  async function get() {
    try {
      const response = await axios.get(
        `http://localhost:8080/product/${id}/product-details`
      );
      if (response.status === 200) {
        setProduct(response.data);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  }
  console.log(product);
  const rows = product?.configurations.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
    </Table.Tr>
  ));

  const handleAddCart = async () => {
    if (user?.logged) {
      try {
        const response = await axios.post(
          `http://localhost:8080/cart/add`,
          null,
          {
            params: {
              userID: user?.id,
              productID: product?.id,
              quantity: 1,
              type: false,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          await dispatch(cart(user.id));
          toast.success("Thêm sản phẩm thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (err) {
        const error = err as AxiosError;
        toast.error("Thêm sản phẩm thất bại", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(error);
      }
    } else {
      dispatch(openLoginModal({ type: "login" }));
    }
  };

  const handleBuy = async () => {
    if (user?.logged) {
      try {
        const response = await axios.post(
          `http://localhost:8080/cart/add`,
          null,
          {
            params: {
              userID: user?.id,
              productID: product?.id,
              quantity: 1,
              type: false,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          await dispatch(cart(user.id));
          navigate(`${import.meta.env.VITE_BASE_URL}/cart`);
        }
      } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        toast.error(`${error}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      dispatch(openLoginModal({ type: "login" }));
    }
  };

  return (
    <div className="w-[80%] mx-auto my-[2rem]">
      <Breadcrumbs className="mb-[1rem]">
        {items.map((item) => {
          return (
            item.title && (
              <Anchor
                className={
                  item.isDisable ? "pointer-events-none !text-gray-600" : ""
                }
                href={item.href}
                key={item.title}
              >
                {item.title?.toUpperCase()}
              </Anchor>
            )
          );
        })}
      </Breadcrumbs>
      <div className="bg-[#fff] p-2  rounded-[5px] shadow-2xl">
        {product ? (
          <div className="flex items-start justify-start gap-[30px] w-[90%] mx-auto my-[1rem]">
            <div>
              <SwiperProductComponent images={product.images} id={product.id} />
            </div>
            <div className="">
              <h1 className="text-[24px] font-bold">{product.name}</h1>
              <p className="flex gap-1 items-center text-yellow-500">
                <FaStar />
                <span>{product.rating ? product.rating : "0.0"}</span>
              </p>
              <div className="flex gap-3">
                <strong className="text-red-600 text-[24px]">19.000.000</strong>
                <del className="text-[24px] text-gray-400">20.000.000</del>
                <div>
                  <span className="bg-yellow-500 px-3 py-0.5 rounded-[5px] text-[12px] font-semibold">
                    5%
                  </span>
                </div>
              </div>
              <div>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Thông số</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </div>
              {!product.isStock ? (
                <div className="flex items-center gap-2 px-[8px] text-[18px] text-blue-600 mt-[1rem]">
                  <FaPhoneAlt />
                  <span>Đặt hàng</span>
                </div>
              ) : (
                <div className="flex items-center-center justify-center gap-5 mt-[2rem]">
                  <button
                    className="bg-blue-600 px-3 py-1 rounded-[5px] text-[#fff] font-semibold"
                    onClick={handleAddCart}
                  >
                    Thêm giỏ hàng
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded-[5px] text-[#fff] font-semibold"
                    onClick={handleBuy}
                  >
                    Mua ngay
                  </button>
                </div>
              )}
            </div>
            <div>
              {product.review &&
                product.review
                  .slice()
                  .reverse()
                  .map((comment, i) => (
                    <div key={comment.name + i} className="mb-[1rem]">
                      <div className="flex items-center gap-2">
                        <div className="w-[40px] h-[40px]">
                          <img
                            src={comment.image}
                            alt={comment.name}
                            className="object-cover block w-full"
                          />
                        </div>
                        <p className="text-[18px] font-semibold">
                          {comment.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Rating value={comment.rating} readOnly />
                        <p className="font-semibold">{comment.date}</p>
                      </div>
                      <div className="px-3 py-0.5 border-black border-[1.5px] rounded-[5px]">
                        <p>{comment.comment}</p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        ) : (
          <div className="text-center font-bold text-[20px] py-[2rem]">
            Không tìm thấy dữ liệu
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
