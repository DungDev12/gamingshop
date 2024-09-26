import { memo, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { IoCloseCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { ApiFilter, apiFilter, Item } from "./Interface/Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilter,
  clearFilter,
  clearTitle,
} from "../store/actions/filterSlice";
import { RootState } from "../store/store";
import { RangeSlider } from "@mantine/core";
import { currentNumber } from "./utils/current";

const FiltersComponent = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const { category } = useParams<{ category: string }>();
  const [price, setPrice] = useState<{ min: number; max: number }>({
    min: 1000000,
    max: 100000000,
  });
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter.filters);

  //TODO create button clear filter

  const isValidCategory = (category: string): category is keyof ApiFilter => {
    return category in apiFilter;
  };

  const getItemsByCategory = (category: string): Item[] => {
    if (isValidCategory(category)) {
      return apiFilter[category];
    } else {
      throw new Error(`Filter không tồn tại: ${category}`);
    }
  };

  const isFilterActive = (title: string, value: string) => {
    const filter = filters.find((f) => f.title === title);
    return filter ? filter.arrValue.includes(value) : false;
  };

  const handleFilter = (title: string, name: string) => {
    dispatch(addFilter({ title, value: name }));
  };

  const handleUpdatePrice = async (e: number[]) => {
    setPrice({ min: e[0], max: e[1] });
  };

  return (
    <div className="my-[0.5rem] p-4 relative">
      {openFilter && (
        <div
          className={`w-full h-full fixed bg-[#0000008e] top-0 left-0 ${
            openFilter && "z-[43]"
          }`}
          onClick={() => setOpenFilter(false)}
        ></div>
      )}
      <div
        className={`py-0.5 px-2 cursor-pointer border-black border-[1px] rounded-[5px] inline-block relative bg-white ${
          openFilter && "z-[44]"
        }`}
        onClick={() => setOpenFilter(!openFilter)}
      >
        <div className="flex items-center gap-1">
          <CiFilter className="text-[22px]" />
          <span className="pb-0.5">Bộ lọc</span>
        </div>
      </div>
      <div
        className={`${
          openFilter ? "absolute after:z-[44] z-[44]" : "hidden"
        } bg-[#fff] w-[65%] h-[550px] top-[3.8rem] left-4 rounded-[8px] after:absolute after:border-[#fff] after:w-0 after:top-[-23px] after:left-[10px] after:border-[12.5px] after:border-r-transparent after:border-l-transparent after:border-t-transparent px-2 `}
      >
        <div className="flex items-center gap-2 p-2">
          <span>Tiêu chí sản phẩm:</span>
          {filters &&
            filters.map((item, i: number) => (
              <div
                className="flex items-center justify-start flex-wrap py-1 px-2 border-black border-[1.5px] rounded-[5px]"
                key={i}
              >
                <div className="flex items-center gap-1 ">
                  <p className="text-[14px]">{item.title}:</p>
                  <div className="flex items-center gap-1">
                    <b className="text-[14px] text-blue-500">
                      {item.arrValue.join()}
                    </b>
                  </div>
                </div>
                <button className="ml-2">
                  <IoCloseCircle
                    className="text-blue-500 text-[20px]"
                    onClick={() => dispatch(clearTitle({ index: i }))}
                  />
                </button>
              </div>
            ))}
          {filters.length > 0 && (
            <button
              className="text-[12px] font-bold  hover:underline underline-offset-2 text-gray-400 pt-1 hover:text-blue-600"
              onClick={() => dispatch(clearFilter())}
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 px-2 py-4">
          {category &&
            getItemsByCategory(category).map((item) => {
              if (item.filterNumber) {
                return (
                  <div key={item.id} className="w-full h-full">
                    <h5 className="text-[17px] mb-1 font-bold">{item.title}</h5>
                    <div className="flex items-center text-center justify-center gap-8 mb-3 font-semibold after:absolute after:w-[32px] after:h-[2px] after:-z-10 after:bg-gray-400">
                      <div className="relative z-[2] w-full border-gray-400 border-[1.5px] rounded-[5px] overflow-hidden">
                        <label className="pointer-events-none">
                          {currentNumber(price.min)}
                        </label>
                        <input
                          value={price.min}
                          type="number"
                          className="w-full h-full absolute top-0 left-0 text-center px-1 py-0.5 text-[14px] opacity-0"
                          onChange={(e) =>
                            setPrice((prev) => ({
                              ...prev,
                              min: Number(e.target.value),
                            }))
                          }
                        />
                      </div>
                      <div className="inline-block relative w-full border-gray-400 border-[1.5px] rounded-[5px] overflow-hidden">
                        <label className="pointer-events-none">
                          {currentNumber(price.max)}
                        </label>
                        <input
                          value={price.max}
                          type="number"
                          className="w-full h-full absolute top-0 left-0 text-center px-1 py-0.5 text-[14px] opacity-0"
                          onChange={(e) =>
                            setPrice((prev) => ({
                              ...prev,
                              max: Number(e.target.value),
                            }))
                          }
                        />
                      </div>
                    </div>
                    <RangeSlider
                      value={[price.min, price.max]}
                      onChange={handleUpdatePrice}
                      min={1000000}
                      max={100000000}
                      label={null}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={item.id} className="w-full h-full">
                    <h5 className="text-[17px] mb-1 font-bold">{item.title}</h5>
                    <ul className="text-[14px] font-semibold text-gray-500 flex items-center flex-wrap gap-2 max-h-[200px] scrollbar-thumb-[#b4b4b4] hover:scrollbar-thumb-[#00A9FF] scrollbar scrollbar-thumb-rounded-full scrollbar-w-2 overflow-y-scroll">
                      {item.arrayFilter &&
                        item.arrayFilter.map((f, i) => (
                          <li
                            key={i}
                            className={`hover:text-blue-500 cursor-pointer border-black hover:border-blue-500 border-[1.5px] py-0.5 px-2 rounded-[5px] ${
                              isFilterActive(item.title, f)
                                ? "border-blue-500 text-blue-500"
                                : ""
                            }`}
                            onClick={() => handleFilter(item.title, f)}
                          >
                            {f}
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default memo(FiltersComponent);
