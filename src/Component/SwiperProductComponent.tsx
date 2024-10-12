import React, { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper as SwiperType } from "swiper"; // Import kiểu Swiper

interface SwiperProps {
  images: string[] | undefined;
  id: number | undefined;
}

const SwiperProductComponent: React.FC<SwiperProps> = ({ images, id }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const handleThumbsSwiper = (swiper: SwiperType) => {
    setThumbsSwiper(swiper);
  };

  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs]}
        className="productImage w-[300px] mb-[1rem] overflow-hidden rounded-[5px] bg-gray-700"
      >
        {images &&
          images.map((pic) => (
            <SwiperSlide key={pic}>
              <img
                className="object-cover"
                src={`http://localhost:8080/product/${id}/${pic}`}
                alt={`Nature ${pic}`}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={handleThumbsSwiper}
        loop={images && images?.length > 4 ? true : false}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="productListImage w-[400px]"
      >
        {images &&
          images.map((pic) => (
            <SwiperSlide key={pic} className="cursor-pointer">
              <img
                src={`http://localhost:8080/product/${id}/${pic}`}
                alt={`Nature ${pic}`}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default SwiperProductComponent;
