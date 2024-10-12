import { Skeleton } from "@mantine/core";
import { iconsSpec } from "@routes/config/iconProducts";
import React, { memo, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaCheck, FaHeart, FaStar } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { currentNumber } from "./utils/current";
import { ProductProps, SpecProduct } from "./Interface/Product";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { toast } from "react-toastify";
import { cart } from "../store/actions/userActions";

const Product: React.FC<ProductProps> = ({ item }) => {
  const [favorite, setFavorite] = useState<boolean>(item.isFavorite ?? false);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user?.id);
  const user = useSelector((state: RootState) => state.user);
  const urlBase = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    }
  }, [loading]);

  const handleFavorite = (id: number) => {
    setFavorite(!favorite);
    handleLikesProduct(id);
  };
  // TODO create button likes product
  async function handleLikesProduct(id: number) {
    try {
      let response;
      if (!favorite) {
        response = await axios.post(
          "http://localhost:8080/api/user/favorites",
          null,
          {
            params: { user: userId, product: id },
            withCredentials: true,
          }
        );
      } else {
        response = await axios.delete(
          "http://localhost:8080/api/user/favorites-delete",
          {
            params: { user: userId, product: id },
            withCredentials: true,
          }
        );
      }

      if (response.status === 200) {
        console.log("ok");
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  }

  const handleProductDetails = async (id: number) => {
    navigate(`${urlBase}/products/${id}`);
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
              productID: item.id,
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
    item && (
      <div className="w-full max-w-[250px] min-h-[436px]  h-full rounded-[8px] bg-[#fff] overflow-hidden group relative p-2 border-gray-600 shadow-2xl border-[1px] grid grid-flow-row">
        <div onClick={() => handleProductDetails(item.id)}>
          <Skeleton visible={loading}>
            <div className="w-full h-[220px] overflow-hidden cursor-pointer rounded-[5px]">
              <img
                src={`http://localhost:8080/product/${item.id}/${item.image}`}
                loading="lazy"
                className="group-hover:scale-110 object-cover transition-all duration-200 ease-in-out object-center mx-auto w-full h-full"
              />
            </div>
          </Skeleton>
          <div className="p-2 row-span-2">
            <Skeleton visible={loading}>
              <h3 className="text-[12px] md:text-[14px] xl:text-[16px] font-semibold cursor-pointer">
                {item.name}
              </h3>
            </Skeleton>
            <Skeleton visible={loading} className="mt-1">
              <div className="bg-[#ECECEC] mt-0.5 w-full p-1.5 rounded-[8px] flex flex-wrap gap-2 cursor-pointer">
                {item.details.configurations &&
                  item.details.configurations.map((spec: SpecProduct) => {
                    const Icon = iconsSpec[spec.name];
                    return (
                      <div
                        key={spec.name}
                        className="flex items-center gap-1 text-[12px] text-[#6D6E72] font-medium"
                      >
                        <Icon />
                        <span className="">{spec.description}</span>
                      </div>
                    );
                  })}
              </div>
            </Skeleton>
          </div>
        </div>
        {item.price && (
          <>
            <Skeleton visible={loading} className="my-1">
              <del className="text-[12px] text-[#6D6E72]">
                {currentNumber(item.originalPrice)}
              </del>
              <strong className="text-[18px] block leading-tight">
                {currentNumber(item.price)}
              </strong>
              <p className="flex gap-1 items-center text-yellow-500">
                <FaStar />
                <span>{item.rating && item.rating}</span>
              </p>
            </Skeleton>
            {!loading && (
              <div className="absolute bg-yellow-400 px-2 py-1 text-[12px] font-bold rounded-[5px] right-1 top-1">
                {item.discount}%
              </div>
            )}
            {item.stock ? (
              <Skeleton visible={loading}>
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <FaCheck />
                  <span>Còn hàng</span>
                </div>
              </Skeleton>
            ) : (
              ""
            )}
          </>
        )}
        <div>
          <div className="flex gap-2 mb-2">
            <Skeleton visible={loading}>
              {item.stock ? (
                <button
                  className="border-red-600 border-[2px] rounded-[5px] text-white bg-red-600 font-bold w-full h-[30px] uppercase"
                  onClick={handleBuy}
                >
                  Mua ngay
                </button>
              ) : (
                <div className="flex items-center gap-2 px-[8px] text-[18px] text-blue-600">
                  <FaPhoneAlt />
                  <span>Đặt hàng</span>
                </div>
              )}
            </Skeleton>
            <Skeleton visible={loading} width={"50px"}>
              <button
                className="w-[30px] h-[30px] relative"
                onClick={() => handleFavorite(item.id)}
              >
                <CiHeart className="text-[30px] mx-auto absolute top-0 left-0" />
                {favorite && (
                  <FaHeart className=" text-[#E91C28] text-[30px] mx-auto absolute top-0 left-0 animate-favourite-heart" />
                )}
              </button>
            </Skeleton>
          </div>
        </div>
      </div>
    )
  );
};

export default memo(Product);
