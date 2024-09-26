import { Anchor, Breadcrumbs, Pagination } from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import Product from "../../../Component/Product";
import FiltersComponent from "../../../Component/FiltersComponent";

const Collections: React.FC = () => {
  const urlBase = import.meta.env.VITE_BASE_URL;
  const { category, brand } = useParams();
  const items = [
    { title: "Trang chủ", href: `${urlBase}` },
    {
      title: category,
      href: `${urlBase}/collections/${category}`,
      isDisable: !brand,
    },
    ...(!brand
      ? []
      : [
          {
            title: brand,
            href: `${urlBase}/collections/${brand}`,
            isDisable: true,
          },
        ]),
  ];

  //#TEST
  const apidata: any[] = [
    {
      id: 1,
      name: "Laptop 1",
      isStock: true,
      image:
        "https://product.hstatic.net/200000722513/product/vobook_14_oled_x1405v_m1405y_cool_silver_black_keyboard_13_fingerprint_6701c548b729416d90498bdac33dec13_medium.png",
      price: {
        discount: 10,
        original: 10000,
        sale: 9000,
      },
      specProducts: [
        {
          icon: "CPU",
          spec: "i5 13500H",
        },
        {
          icon: "RAM",
          spec: "16GB",
        },
        {
          icon: "SSD",
          spec: "512GB",
        },
      ],
    },
    {
      id: 2,
      name: "Laptop 2",
      image:
        "https://product.hstatic.net/200000722513/product/vobook_14_oled_x1405v_m1405y_cool_silver_black_keyboard_13_fingerprint_6701c548b729416d90498bdac33dec13_medium.png",
      price: {
        discount: 10,
        original: 10000,
        sale: 9000,
      },
      specProducts: [
        {
          icon: "CPU",
          spec: "i5 13500H",
        },
        {
          icon: "RAM",
          spec: "16GB",
        },
        {
          icon: "SSD",
          spec: "512GB",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
      ],
    },
    {
      id: 3,
      name: "Laptop 3",
      isFavorite: true,
      image:
        "https://product.hstatic.net/200000722513/product/vobook_14_oled_x1405v_m1405y_cool_silver_black_keyboard_13_fingerprint_6701c548b729416d90498bdac33dec13_medium.png",
      price: {
        discount: 10,
        original: 10000,
        sale: 9000,
      },
      specProducts: [
        {
          icon: "CPU",
          spec: "i5 13500H",
        },
        {
          icon: "RAM",
          spec: "16GB",
        },
        {
          icon: "SSD",
          spec: "512GB",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
      ],
    },
    {
      id: 4,
      name: "Laptop 4",
      isFavorite: true,
      image:
        "https://product.hstatic.net/200000722513/product/vobook_14_oled_x1405v_m1405y_cool_silver_black_keyboard_13_fingerprint_6701c548b729416d90498bdac33dec13_medium.png",
      price: {
        discount: 10,
        original: 10000,
        sale: 9000,
      },
      specProducts: [
        {
          icon: "CPU",
          spec: "i5 13500H",
        },
        {
          icon: "RAM",
          spec: "16GB",
        },
        {
          icon: "SSD",
          spec: "512GB",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
      ],
    },
    {
      id: 5,
      name: "Laptop 5",
      isFavorite: true,
      image:
        "https://product.hstatic.net/200000722513/product/vobook_14_oled_x1405v_m1405y_cool_silver_black_keyboard_13_fingerprint_6701c548b729416d90498bdac33dec13_medium.png",
      price: {
        discount: 10,
        original: 10000,
        sale: 9000,
      },
      specProducts: [
        {
          icon: "CPU",
          spec: "i5 13500H",
        },
        {
          icon: "RAM",
          spec: "16GB",
        },
        {
          icon: "SSD",
          spec: "512GB",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
      ],
    },
    {
      id: 6,
      name: "Laptop 6",
      isFavorite: true,
      image:
        "https://product.hstatic.net/200000722513/product/vobook_14_oled_x1405v_m1405y_cool_silver_black_keyboard_13_fingerprint_6701c548b729416d90498bdac33dec13_medium.png",
      price: {
        discount: 10,
        original: 10000,
        sale: 9000,
      },
      specProducts: [
        {
          icon: "CPU",
          spec: "i5 13500H",
        },
        {
          icon: "RAM",
          spec: "16GB",
        },
        {
          icon: "SSD",
          spec: "512GB",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
      ],
    },
    {
      id: 7,
      name: "Laptop 7",
      isFavorite: true,
      image:
        "https://product.hstatic.net/200000722513/product/vobook_14_oled_x1405v_m1405y_cool_silver_black_keyboard_13_fingerprint_6701c548b729416d90498bdac33dec13_medium.png",
      price: {
        discount: 10,
        original: 10000,
        sale: 9000,
      },
      specProducts: [
        {
          icon: "CPU",
          spec: "i5 13500H",
        },
        {
          icon: "RAM",
          spec: "16GB",
        },
        {
          icon: "SSD",
          spec: "512GB",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
        {
          icon: "GPU",
          spec: "GTX 2060",
        },
      ],
    },
  ];

  return (
    <div className="w-[90%] mx-auto my-[50px] h-full min-h-[600px]">
      <Breadcrumbs>
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
      <div className="w-full h-full bg-[#fff] rounded-[6px] mt-[20px] p-4">
        <FiltersComponent />
        {apidata.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4 place-content-center">
            {apidata.map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="w-full h-[80px] grid place-items-center text-[18px] font-bold">
            <p>Không có dữ liệu cần tìm</p>
          </div>
        )}
        <hr />
        <div className="flex justify-end mt-[1rem]">
          <Pagination
            total={15}
            autoContrast
            boundaries={1}
            nextIcon={IconArrowRight}
            previousIcon={IconArrowLeft}
            dotsIcon={IconGripHorizontal}
          />
        </div>
      </div>
    </div>
  );
};

export default Collections;
