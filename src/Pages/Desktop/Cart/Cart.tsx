import axios, { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { Product } from "../../../Component/Interface/Product";
import { currentNumber } from "../../../Component/utils/current";
import { BsPlus, BsTrash } from "react-icons/bs";
import { FaMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { cart } from "../../../store/actions/userActions";
import { toast } from "react-toastify";

interface ProductProps {
  id: number;
  quantity: number;
  product: Product;
}

const Cart: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user?.id);
  const [product, setProduct] = useState<ProductProps[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    let priceTotal = 0;
    if (product.length > 0) {
      product.map((productItem) => {
        priceTotal += productItem.product.price * productItem.quantity;
      });
    }
    setTotal(priceTotal);
  }, [product]);

  async function get() {
    try {
      const reponse = await axios.get(
        `http://localhost:8080/cart/${userId}/all`
      );
      if (reponse.status === 200) {
        setProduct(reponse.data);
      }
      if (userId) {
        await dispatch(cart(userId));
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  }

  const handleOnchange = async (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { value } = e.target;
    try {
      const response = await axios.post(
        "http://localhost:8080/cart/add",
        null,
        {
          params: {
            userID: userId,
            productID: id,
            quantity: parseInt(value) != 0 ? value : 1,
            type: true,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("oke");
        get();
        toast.success("Thêm sản phẩm thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      toast.error("Thêm sản phẩm thất bại", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleAdd = async (id: number) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/cart/add",
        null,
        {
          params: {
            userID: userId,
            productID: id,
            quantity: 1,
            type: false,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        get();
        toast.success("Thêm số lượng sản phẩm thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      toast.error("Thêm số lượng sản phẩm thất bại", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleRemove = async (id: number) => {
    try {
      try {
        const response = await axios.post(
          "http://localhost:8080/cart/remove",
          null,
          {
            params: {
              userID: userId,
              productID: id,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          get();
          toast.success("Giảm số lượng sản phẩm thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (err) {
        const error = err as AxiosError;
        console.log(error);
        toast.success("Giảm số lượng sản phẩm thất bại", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete("http://localhost:8080/cart/delete", {
        params: {
          userID: userId,
          productID: id,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        get();
        toast.success("Xóa sản phẩm thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      toast.error("Xóa sản phẩm thất bại", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleOrder = async () => {
    const items = product.map(({ id, quantity }) => ({ id, quantity }));
    const order = {
      userId: userId,
      totalPrice: total,
      items: items,
    };
    try {
      console.log(JSON.stringify(order));
      const response = await axios.post(
        "http://localhost:8080/api/user/order-cart",
        order,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        get();
        toast.success("Đặt hàng thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      toast.error("Đặt hàng thất bại", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="bg-[#fff] max-w-[800px] mx-auto my-[2rem] shadow-2xl rounded-[5px] p-4">
        {product.length > 0 ? (
          <div>
            {product.map((item) => (
              <div
                className=" p-2 rounded-[5px] flex items-start gap-4 my-[1rem] border-black border-[1px] shadow-2xl"
                key={item.id}
              >
                <div>
                  <div className="w-[300px] h-[200px] overflow-hidden rounded-[5px]">
                    <img
                      className="object-cover"
                      src={`http://localhost:8080/product/${item.product.id}/${item.product.image}`}
                      alt="image"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <h2 className="text-[20px] font-semibold">
                      {item.product.name}
                    </h2>
                    <div className="flex items-start gap-2 my-[1rem]">
                      <strong className="text-[20px]">
                        {currentNumber(item.product.price)}
                      </strong>
                      <del className="text-[20px]">
                        {currentNumber(item.product.originalPrice)}
                      </del>
                      <span className="px-3 py-0.5 rounded-[5px] bg-yellow-500 font-semibold text-[12px]">
                        {item.product.discount}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-[120px] ml-auto gap-2 p-1 border-black border-[1px] rounded-[5px]">
                    <button onClick={() => handleAdd(item.product.id)}>
                      <BsPlus className="text-[24px] hover:text-green-500" />
                    </button>
                    <input
                      className="w-[50px] text-center outline-none"
                      value={item.quantity}
                      onChange={(e) => handleOnchange(e, item.product.id)}
                    />
                    <button>
                      <FaMinus
                        className="text-[20px] hover:text-red-600"
                        onClick={() => handleRemove(item.product.id)}
                      />
                    </button>
                  </div>
                  <div>
                    <p className="text-[18px] font-bold">
                      Tổng:{" "}
                      <span className="text-red-600">
                        {currentNumber(item.quantity * item.product.price)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <button onClick={() => handleDelete(item.product.id)}>
                      <BsTrash className="hover:text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-[20px]">
                  Tổng:{" "}
                  <span className="text-[24px] text-red-600">
                    {currentNumber(total)}
                  </span>
                </strong>
              </div>
              <button
                className="bg-red-600 text-white px-3 py-1 text-[20px] rounded-[5px] font-bold hover:text-red-600 hover:bg-white border-red-600 border-[1.5px]"
                onClick={handleOrder}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>Không có sản phẩm trong giỏ hàng</p>
            <span className="font-bold text-[20px] text-blue-600 hover:underline hover:underline-offset-1">
              <Link to={`${import.meta.env.VITE_BASE_URL}`}>Trang chủ</Link>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
