import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Product from "./Product";

interface SearchState {
  name?: string;
  value?: string;
}

const SearchComponent: React.FC = () => {
  const [search, setSearch] = useState<SearchState>({});
  const [debouncedSearch, setDebouncedSearch] = useState<SearchState>({});
  const [openModalSearch, setOpenModalSearch] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch({ name, value });
  };

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  // TODO Hoàn thành tính năng tìm kiếm và trả dữ liệu về
  useEffect(() => {
    // trả về dữ liệu search
    console.log(debouncedSearch);
  }, [debouncedSearch]);

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
  ];

  return (
    <div className="">
      <div
        className={`w-[300px] bg-[#fff] flex items-center justify-between px-[10px] py-[2px] gap-2 border-black border-[1.5px] rounded-[5px] ${
          openModalSearch && "relative z-[51]"
        }`}
        onClick={() => setOpenModalSearch(true)}
      >
        <input
          type="text"
          name="search"
          className="outline-none flex-1 "
          onChange={handleInput}
        />
        <IoIosSearch className="text-[24px] cursor-pointer" />
      </div>
      {openModalSearch && (
        <>
          <div
            className={`bg-[#00000091] w-full h-full top-0 left-0 fixed ${
              openModalSearch && "z-[50]"
            } `}
            onClick={() => {
              setOpenModalSearch(false);
            }}
          ></div>
          <div className="absolute bg-[#ebebeb] w-[90%] min-h-[80px] top-[8em] left-[5%] rounded-[24px] z-[51]">
            {apidata.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 p-4 place-content-center">
                {apidata.map((item) => (
                  <Product key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="w-full h-[80px] grid place-items-center text-[18px] font-bold">
                <p>Không có dữ liệu cần tìm</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchComponent;
