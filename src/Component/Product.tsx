import { Skeleton } from "@mantine/core";
import { iconsSpec } from "@routes/config/iconProducts";
import React, { memo, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaCheck, FaHeart } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { currentNumber } from "./utils/current";
import { ProductProps, SpecProduct } from "./Interface/Product";
import { useNavigate } from "react-router-dom";

const Product: React.FC<ProductProps> = ({ item }) => {
  const [favorite, setFavorite] = useState<boolean>(item.isFavorite ?? false);
  const [loading, setLoading] = useState<boolean>(true);
  const urlBase = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  const handleFavorite = () => {
    setFavorite(!favorite);
    handleLikesProduct();
  };
  // TODO create button likes product
  async function handleLikesProduct() {}

  const handleProductDetails = async (name: string) => {
    const nameProduct = name.replace(" ", "-").toLowerCase();
    navigate(`${urlBase}/products/${nameProduct}`);
  };
  return (
    <div
      className="w-full max-w-[250px] min-h-[436px]  h-full rounded-[8px] bg-[#fff] overflow-hidden group relative p-2 border-gray-600 shadow-2xl border-[1px] grid grid-flow-row"
      onClick={() => handleProductDetails(item.name)}
    >
      <Skeleton visible={loading}>
        <div className="w-full h-[220px] overflow-hidden cursor-pointer">
          <img
            src={item.image}
            loading="lazy"
            className="hidden group-hover:scale-110 object-cover transition-all duration-200 ease-in-out object-center mx-auto w-full h-full"
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
          <div className="bg-[#ECECEC] mt-0.5 w-full p-1.5 rounded-[8px] flex flex-wrap gap-2">
            {item.specProducts &&
              item.specProducts.map((spec: SpecProduct) => {
                const Icon = iconsSpec[spec.icon];
                return (
                  <div
                    key={spec.icon}
                    className="flex items-center gap-1 text-[12px] text-[#6D6E72] font-medium"
                  >
                    <Icon />
                    <span className="">{spec.spec}</span>
                  </div>
                );
              })}
          </div>
        </Skeleton>
        {item.price && (
          <>
            <Skeleton visible={loading} className="my-1">
              <del className="text-[12px] text-[#6D6E72]">
                {currentNumber(item.price.original)}
              </del>
              <strong className="text-[18px] block leading-tight">
                {currentNumber(item.price.sale)}
              </strong>
            </Skeleton>
            {!loading && (
              <div className="absolute bg-yellow-400 px-2 py-1 text-[12px] font-bold rounded-[5px] right-1 top-1">
                {item.price.discount}%
              </div>
            )}
            {!item.isStock && (
              <Skeleton visible={loading}>
                <div className="flex items-center gap-2 text-green-600 font-bold">
                  <FaCheck />
                  <span>Còn hàng</span>
                </div>
              </Skeleton>
            )}
          </>
        )}
      </div>
      <div>
        <div className="flex gap-2 mb-2">
          <Skeleton visible={loading}>
            {!item.isStock ? (
              <button className="border-red-600 border-[2px] rounded-[5px] text-white bg-red-600 font-bold w-full h-[30px] uppercase">
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
              onClick={handleFavorite}
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
  );
};

export default memo(Product);
