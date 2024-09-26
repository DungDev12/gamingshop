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
      moreURL: [{ title: "More Info", url: "http://example.com/more" }],
      productList: [
        {
          id: 1,
          name: "Product 1",
          isFavorite: true,
          isStock: true,
          image: "http://example.com/image1.jpg",
          price: { discount: 10, original: 100, sale: 90 },
          specProducts: [
            { icon: "CPU", spec: "Intel i7" }, // Ensure icon matches IconSpecKeys
            { icon: "RAM", spec: "16GB" },
          ],
        },
        {
          id: 2,
          name: "Product 2",
          isFavorite: false,
          image: "http://example.com/image2.jpg",
          price: { discount: 5, original: 200, sale: 190 },
          specProducts: [
            { icon: "SSD", spec: "512GB" },
            { icon: "DISPLAY", spec: "15.6 inch" },
          ],
        },
        {
          id: 3,
          name: "Product 3",
          isFavorite: false,
          image: "http://example.com/image2.jpg",
          price: { discount: 5, original: 200, sale: 1900 },
          specProducts: [
            { icon: "SSD", spec: "512GB" },
            { icon: "DISPLAY", spec: "15.6 inch" },
          ],
        },
        {
          id: 4,
          name: "Product 4",
          isFavorite: false,
          image: "http://example.com/image2.jpg",
          price: { discount: 5, original: 200, sale: 190 },
          specProducts: [
            { icon: "SSD", spec: "512GB" },
            { icon: "DISPLAY", spec: "15.6 inch" },
          ],
        },
        {
          id: 5,
          name: "Product 5",
          isFavorite: false,
          image: "http://example.com/image2.jpg",
          price: { discount: 5, original: 200, sale: 190 },
          specProducts: [
            { icon: "SSD", spec: "512GB" },
            { icon: "DISPLAY", spec: "15.6 inch" },
          ],
        },
        {
          id: 6,
          name: "Product 6",
          isFavorite: false,
          image: "http://example.com/image2.jpg",
          price: { discount: 5, original: 200, sale: 190 },
          specProducts: [
            { icon: "SSD", spec: "512GB" },
            { icon: "DISPLAY", spec: "15.6 inch" },
          ],
        },
      ],
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
      moreURL: [
        { title: "ASUS", url: "#" },
        { title: "ACER", url: "#" },
      ],
      productList: [
        {
          id: 1,
          name: "Product 1",
          isFavorite: false,
          isStock: true,
          image: "http://example.com/image1.jpg",
          price: { discount: 10, original: 1900, sale: 90 },
          specProducts: [
            { icon: "CPU", spec: "Intel i7" }, // Ensure icon matches IconSpecKeys
            { icon: "RAM", spec: "16GB" },
          ],
        },
        {
          id: 2,
          name: "Product 2",
          isFavorite: false,
          image: "http://example.com/image2.jpg",
          price: { discount: 5, original: 200, sale: 190 },
          specProducts: [
            { icon: "SSD", spec: "512GB" },
            { icon: "DISPLAY", spec: "15.6 inch" },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <div className="p-[50px] grid grid-flow-row gap-[2rem]">
        <Banner />
      </div>
      <div className="px-[30px]">
        <BannerProduct data={APITEST} />
      </div>
    </>
  );
};

export default Home;
