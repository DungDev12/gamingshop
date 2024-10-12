import { Anchor, Breadcrumbs, Pagination } from "@mantine/core";
import {
  IconArrowLeft,
  IconArrowRight,
  IconGripHorizontal,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import Product from "../../../Component/Product";
import FiltersComponent from "../../../Component/FiltersComponent";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const Collections: React.FC = () => {
  const urlBase = import.meta.env.VITE_BASE_URL;
  const userID = useSelector((state: RootState) => state.user?.id);
  const filter = useSelector((state: RootState) => state.filter);
  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const { category, brand } = useParams();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

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

  let filterStock = [...products];
  useEffect(() => {
    filterStock = filterStock.filter(
      (item) => item.price >= filter.min && item.price <= filter.max
    );

    if (filter?.filters.length !== 0) {
      filterStock = filterStock.filter((product) => {
        return filter.filters.every((list) => {
          if (list.title === "Tình trạng sản phẩm") {
            return product.stock < 1;
          } else {
            const matchesBrand =
              product.brandName
                .toUpperCase()
                .includes(list.title.toUpperCase()) &&
              list.arrValue.some(
                (item) =>
                  product.brandItemName.toUpperCase() === item.toUpperCase()
              );

            const matchesConfig = product.details.configurations.some(
              (config) =>
                list.arrValue.includes(config.description.toUpperCase())
            );
            return matchesBrand || matchesConfig;
          }
        });
      });
    }
    setProductsFilter(filterStock);
  }, [filter]);

  useEffect(() => {
    get();
  }, [category, brand, page]);

  async function get() {
    try {
      const response = await axios.get(
        `http://localhost:8080/product/${category}`,
        {
          params: { brand, userID, page, size: 3 },
        }
      );
      if (response.status === 200) {
        setTotalPage(response.data.totalPages);
        setProducts(response.data.products);
        setProductsFilter(response.data.products);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  }

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
        {productsFilter.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4 place-content-center">
            {productsFilter.map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="w-full h-[80px] grid place-items-center text-[18px] font-bold">
            <p>Không có dữ liệu cần tìm</p>
          </div>
        )}
        <div className="flex justify-end mt-[1rem]">
          {productsFilter.length > 0 && (
            <>
              <hr />
              <Pagination
                total={totalPage}
                autoContrast
                boundaries={page}
                nextIcon={IconArrowRight}
                previousIcon={IconArrowLeft}
                dotsIcon={IconGripHorizontal}
                onChange={(e) => setPage(e - 1)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
