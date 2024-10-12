import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Product from "./Product";
import axios, { AxiosError } from "axios";

interface SearchState {
  name?: string;
  value?: string;
}

const SearchComponent: React.FC = () => {
  const [search, setSearch] = useState<SearchState>({});
  const [debouncedSearch, setDebouncedSearch] = useState<SearchState>({});
  const [openModalSearch, setOpenModalSearch] = useState<boolean>(false);
  const [apidata, setAPIData] = useState([]);

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

  useEffect(() => {
    get();
  }, []);

  async function get() {
    try {
      const response = await axios.get("http://localhost:8080/product/all", {
        params: { search: debouncedSearch.value },
      });
      if (response.status === 200) {
        console.log(response.data);
        setAPIData(response.data.products);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  }

  useEffect(() => {
    // trả về dữ liệu search
    get();
  }, [debouncedSearch]);

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
