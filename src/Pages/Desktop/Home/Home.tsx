import Banner from "./Banner";
import BannerProduct from "./BannerProduct";
// import BannerProduct from "./BannerProduct";

const Home: React.FC = () => {
  const APITEST = [
    {
      id: 1,
      title: "PC bán chạy",
      title_2: "Sample Subtitle",
      defaultURL: "http://example.com",
      configBanner: {
        dynamicBullets: true,
        sizePreview: 6,
        spaceBetween: 30,
        autoplay: true,
        setTimeAutoplay: 1500,
        disableOnInteraction: false,
        arrows: true,
        freeMode: true,
      },
    },
    {
      id: 2,
      title: "Laptop",
      title_2: "Sample Subtitle",
      defaultURL: "http://example.com",
      configBanner: {
        dynamicBullets: true,
        sizePreview: 6,
        spaceBetween: 30,
        autoplay: true,
        setTimeAutoplay: 1500,
        disableOnInteraction: false,
        arrows: true,
        freeMode: true,
      },
    },
  ];

  return (
    <>
      <div className="p-[50px] grid grid-flow-row gap-[2rem]">
        <Banner />
      </div>
      {/* <div className="px-[30px]">
        <BannerProduct data={APITEST} />
      </div> */}
    </>
  );
};

export default Home;
