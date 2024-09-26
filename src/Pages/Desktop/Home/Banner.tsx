import { sizeBannerDefault } from "@routes/config/config";
import SwiperComponent from "../../../Component/SwiperComponent";
import { SwiperType } from "../../../Component/Interface/Swiper";
import { useMediaQuery } from "@mantine/hooks";

const Banner = () => {
  //#TEST
  const APIIMG = [
    {
      configBanner: {
        loop: true,
        arrows: true,
        dynamicBullets: true,
        autoplay: true,
        setTimeAutoplay: 3000,
        disableOnInteraction: true,
        sizePreview: 1,
      },
      //   effect: "fade", // 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
      image: [
        "https://hanoicomputercdn.com/media/banner/20_Aug89ef30310fa6a0b9af35d3c1396389f0.jpg",
        "https://file.hstatic.net/200000722513/file/gearvn_800x400_fundiin.jpg",
        "https://hanoicomputercdn.com/media/banner/19_Aug61c0ab57df7aa2c4e2d3b323342ed245.jpg",
      ],
    },
    {
      configBanner: {
        dynamicBullets: true,
        arrows: true,
      },
      image: [
        "https://hanoicomputercdn.com/media/banner/10_Sep721ed348f1492afb77baf89effd91b58.jpg",
        "https://i.ytimg.com/vi/kiE5INK14Iw/hq720.jpg",
      ],
    },
    {
      configBanner: {},
      image: [
        "https://i.ytimg.com/vi/kiE5INK14Iw/hq720.jpg",
        "https://i.ytimg.com/vi/kiE5INK14Iw/hq720.jpg",
      ],
    },
    {
      configBanner: {},
      image: [
        "https://i.ytimg.com/vi/kiE5INK14Iw/hq720.jpg",
        "https://i.ytimg.com/vi/kiE5INK14Iw/hq720.jpg",
      ],
    },
    {
      configBanner: {},
      image: ["https://i.ytimg.com/vi/kiE5INK14Iw/hq720.jpg"],
    },
    {
      configBanner: {},
      image: [
        "https://i.ytimg.com/vi/kiE5INK14Iw/hq720.jpg",
        "https://i.ytimg.com/vi/kiE5INK14Iw/hq720.jpg",
      ],
    },
  ];

  const isDesktop = useMediaQuery("(min-width: 1400px)");
  // const isMobile = useMediaQuery("(max-width: 1399px)");
  return (
    <>
      {isDesktop && APIIMG && (
        <div className="w-[90%] mx-auto grid grid-cols-3 gap-4 mb-[16px]">
          <div className="col-span-2">
            <SwiperComponent
              h={sizeBannerDefault.mainBanner}
              config={APIIMG[0].configBanner}
              image={APIIMG[0].image}
              openWith={SwiperType.Banner}
            />
          </div>
          <div>
            <div className="grid grid-rows-2 h-full gap-2">
              <SwiperComponent
                h={sizeBannerDefault.mainBanner / 2 - 4}
                config={APIIMG[1].configBanner}
                image={APIIMG[1].image}
                openWith={SwiperType.Banner}
              />
              <SwiperComponent
                h={sizeBannerDefault.mainBanner / 2 - 4}
                config={APIIMG[2].configBanner}
                image={APIIMG[2].image}
                openWith={SwiperType.Banner}
              />
            </div>
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-4">
              <SwiperComponent
                h={sizeBannerDefault.bottomBanner}
                config={APIIMG[3].configBanner}
                image={APIIMG[3].image}
                openWith={SwiperType.Banner}
              />
              <SwiperComponent
                h={sizeBannerDefault.bottomBanner}
                config={APIIMG[4].configBanner}
                image={APIIMG[4].image}
                openWith={SwiperType.Banner}
              />
              <SwiperComponent
                h={sizeBannerDefault.bottomBanner}
                config={APIIMG[5].configBanner}
                image={APIIMG[5].image}
                openWith={SwiperType.Banner}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
