import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Autoplay,
  EffectFade,
  FreeMode,
  Navigation,
  Pagination,
} from "swiper/modules";
import { SwiperTypeProps } from "./Interface/Swiper";
import Product from "./Product";
import { memo, useMemo } from "react";

const SwiperComponent: React.FC<SwiperTypeProps> = ({
  w,
  h,
  config,
  image,
  openWith,
  productList,
}) => {
  const finalConfig = useMemo(() => {
    const defaultConfig = {
      dynamicBullets: true,
      clickable: true,
      centeredSlides: false,
      spaceBetween: 0,
      arrows: false,
      loop: false,
      effect: "",
      sizePreview: 1,
      freeMode: false,
      autoplay: true,
      setTimeAutoplay: 2500,
      disableOnInteractionAutoplay: false,
    };
    return { ...defaultConfig, ...config };
  }, [config]);

  const calcBreakpoints = useMemo(
    () =>
      ({ get, number }: { get: number; number: number }): number => {
        return get > number ? get - number : get;
      },
    []
  );
  return (
    <div
      className="w-full h-full rounded-[8px] overflow-hidden"
      style={{
        width: `${w}px`,
        height: `${h}px`,
      }}
    >
      <Swiper
        pagination={{
          dynamicBullets: finalConfig.dynamicBullets,
          clickable: finalConfig.clickable,
        }}
        centeredSlides={finalConfig.centeredSlides}
        spaceBetween={finalConfig.spaceBetween}
        navigation={finalConfig.arrows}
        loop={finalConfig.loop}
        effect={finalConfig.effect}
        slidesPerView={finalConfig.sizePreview}
        freeMode={finalConfig.freeMode}
        autoplay={
          finalConfig.autoplay && {
            delay: finalConfig.setTimeAutoplay,
            disableOnInteraction: finalConfig.disableOnInteractionAutoplay,
          }
        }
        breakpoints={{
          200: {
            slidesPerView:
              finalConfig.sizePreview &&
              calcBreakpoints({ get: finalConfig.sizePreview, number: 5 }),
          },
          560: {
            slidesPerView:
              finalConfig.sizePreview &&
              calcBreakpoints({ get: finalConfig.sizePreview, number: 4 }),
          },
          867: {
            slidesPerView:
              finalConfig.sizePreview &&
              calcBreakpoints({ get: finalConfig.sizePreview, number: 3 }),
          },
          1280: {
            slidesPerView:
              finalConfig.sizePreview &&
              calcBreakpoints({ get: finalConfig.sizePreview, number: 2 }),
          },
          1400: {
            slidesPerView:
              finalConfig.sizePreview &&
              calcBreakpoints({ get: finalConfig.sizePreview, number: 1 }),
          },
          1600: {
            slidesPerView: finalConfig.sizePreview && finalConfig.sizePreview,
          },
        }}
        modules={[Pagination, Navigation, Autoplay, EffectFade, FreeMode]}
        className={`SwiperBanner h-full w-full z-0 grid ${
          openWith === "PRODUCT" ? "px-[1rem]" : ""
        }`}
      >
        {openWith === "PRODUCT"
          ? productList?.map((item) => (
              <SwiperSlide key={item.name}>
                <Product item={item} />
              </SwiperSlide>
            ))
          : image?.map((img, i) => (
              <SwiperSlide key={i}>
                <div className={`w-full h-full min-h-[${h}px]`}>
                  <img
                    src={img}
                    className={`w-full h-full object-cover min-h-full`}
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default memo(SwiperComponent);
