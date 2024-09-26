import { FaShippingFast } from "react-icons/fa";
import { Link } from "react-router-dom";
import SwiperComponent from "../../../Component/SwiperComponent";
import { SwiperType } from "../../../Component/Interface/Swiper";
import { BannerProps } from "../../../Component/Interface/Banner";
import { Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";

const BannerProduct: React.FC<BannerProps> = ({ data }) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (loading) {
      const time = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(time);
    }
  }, [loading]);
  if (!data) {
    return null;
  }

  return (
    data &&
    data.map((v) => (
      <div
        className="bg-[#fff] w-full my-[40px] py-[8px] rounded-[8px]"
        key={v.id}
      >
        <div className="">
          <div className="flex items-center justify-between px-[2rem] gap-4">
            <div className=" w-[45%] flex items-center gap-4">
              <Skeleton visible={loading} className="inline-block">
                <Link
                  className="text-[24px] font-bold hover:text-red-600 transition-all duration-300 ease-linear"
                  to={"#"}
                >
                  {v.title}
                </Link>
              </Skeleton>
              <Skeleton visible={loading} width={"2px"}>
                <span className="border-r-[1.5px] border-black h-[25px]"></span>
              </Skeleton>
              <Skeleton visible={loading}>
                <div className="flex items-center gap-2">
                  <FaShippingFast className="text-[30px] text-[#00A9FF]" />
                  <span className="font-bold text-[18px]">{v.title_2}</span>
                </div>
              </Skeleton>
            </div>
            <Skeleton visible={loading}>
              <div className="flex items-center justify-end gap-4 flex-1 text-[18px] font-semibold ">
                {v.moreURL &&
                  v.moreURL.map((url) => (
                    <Link
                      to={url.url}
                      key={url.title}
                      className="hover:text-red-600 transition-all duration-300 ease-in-out hover:underline hover:underline-offset-2"
                    >
                      {url.title}
                    </Link>
                  ))}
                <Link
                  to={v.defaultURL}
                  className="text-red-600 hover:text-blue-600 transition-all duration-300 ease-in-out"
                >
                  Xem tất cả
                </Link>
              </div>
            </Skeleton>
          </div>
          <div className="row-span-2 mt-[1rem] ">
            <SwiperComponent
              openWith={SwiperType.Product}
              config={v.configBanner}
              productList={v.productList}
            />
          </div>
        </div>
      </div>
    ))
  );
};

export default BannerProduct;
