import axios, { AxiosError } from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { decryptPayload } from "../../../Component/utils/JwtCookie";
import OrderComponent from "../../../Component/OrderComponent";
import { Rating, Table, Textarea } from "@mantine/core";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { currentNumber } from "../../../Component/utils/current";
import { toast } from "react-toastify";

interface OrderItemProps {
  id: number;
  image: string;
  quantity: number;
  price: number;
  details: { name: string; description: string }[];
  productName: string;
}
interface OrderProps {
  orderId: number;
  orderStatus: string;
  userAddress: string;
  userName: string;
  userPhone: number;
  totalPrice: number;
  orderItems: OrderItemProps[];
}
interface Review {
  [key: string]: { idOrder: string; value: string; rating?: string };
}
const Order = () => {
  const userId = useSelector((state: RootState) => state.user?.id);
  const [order, setOrder] = useState<OrderProps[]>([]);
  const [review, setReview] = useState<Review>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    get();
  }, []);

  async function get() {
    try {
      const response = await axios.get("http://localhost:8080/api/user/order", {
        params: { userId },
        withCredentials: true,
      });
      if (response.status === 200) {
        setOrder(decryptPayload(response.data));
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  }

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (value === "") {
      setReview((prev) => ({
        ...prev,
        [name]: { ...prev[name], value: "", rating: prev[name]?.rating },
      }));
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setReview((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            idOrder: name,
            value,
            rating: prev[name]?.rating,
          },
        }));
      }, 500);
    }
  };

  const sendComment = async (id: number) => {
    try {
      if (review[id]?.value == "" || review[id]?.value.length < 8) {
        return toast.error("Bình luận không được để trống hoặc ít hơn 10 chữ", {
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
      const response = await axios.post(
        "http://localhost:8080/reviews/comment-order",
        null,
        {
          params: {
            orderId: id,
            userId: userId,
            rating: review[id]?.rating,
            comment: review[id]?.value,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Bình luận thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        get();
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      toast.error("Bình luận thất bại", {
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

  useEffect(() => {
    console.log(review);
  }, [review]);

  return (
    <div className="w-[70%] mx-auto bg-[#fff] p-2 shadow-2xl my-[2rem] rounded-[5px]">
      {order.length > 0 ? (
        order
          .slice()
          .reverse()
          .map((item) => {
            if (item.orderItems.length > 0) {
              return (
                <div
                  key={item.orderId}
                  className="pb-[3rem] border-black border-b-2"
                >
                  <OrderComponent status={item.orderStatus} />
                  <div>
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Tên người nhận</Table.Th>
                          <Table.Th>Số điện thoại</Table.Th>
                          <Table.Th>Địa chỉ nhận hàng</Table.Th>
                          <Table.Th>Tổng giá trị đơn hàng</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody className="text-[16px]">
                        <Table.Tr>
                          <Table.Td>{item.userName}</Table.Td>
                          {item.userPhone && (
                            <Table.Td>
                              {(() => {
                                const phoneNumber = parsePhoneNumberFromString(
                                  item.userPhone.toString(),
                                  "VN"
                                );
                                return phoneNumber
                                  ? `0${phoneNumber.nationalNumber}`
                                  : "Không có số điện thoại";
                              })()}
                            </Table.Td>
                          )}
                          <Table.Td>{item.userAddress}</Table.Td>
                          <Table.Td className="text-red-600 text-[20px] font-semibold">
                            {currentNumber(item.totalPrice)}
                          </Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                  </div>
                  <div className="my-[1rem]">
                    <Table className="text-[14px]">
                      <Table.Tbody>
                        {item.orderItems.map((product) => (
                          <Table.Tr key={product.productName}>
                            <Table.Td>
                              <div className="flex items-start justify-start gap-2">
                                <div className="w-[150px] h-[150px] overflow-hidden rounded-[5px]">
                                  <img
                                    className="block object-cover"
                                    src={`http://localhost:8080/product/${product.id}/${product.image}`}
                                    alt={product.productName}
                                  />
                                </div>
                                <div>
                                  <p className="text-[24px] font-bold">
                                    {product.productName}
                                  </p>
                                  {product.details.map((config, i) => (
                                    <div
                                      className="flex items-center gap-2 font-semibold"
                                      key={i}
                                    >
                                      <p>{config.name}</p>
                                      <p>{config.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </Table.Td>
                            <Table.Td className="text-[18px] font-semibold">
                              {currentNumber(product.price)}
                            </Table.Td>
                            <Table.Td className="text-[18px] font-semibold">
                              {product.quantity}
                            </Table.Td>
                            <Table.Td className="text-[24px] font-semibold text-red-600">
                              {currentNumber(product.price * product.quantity)}
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </div>
                  {item.orderStatus === "FINISH" && (
                    <div>
                      <hr className="border-black" />
                      <div className="w-[70%] mx-auto">
                        <div className="flex items-center gap-4 mt-[1rem]">
                          <p className="font-semibold text-[14px]">
                            Đánh giá sản phẩm
                          </p>
                          <Rating
                            fractions={2}
                            onChange={(e) =>
                              setReview((prev) => ({
                                ...prev,
                                [item.orderId]: {
                                  ...prev[item.orderId],
                                  rating: e,
                                },
                              }))
                            }
                          />
                        </div>
                        <Textarea
                          resize="vertical"
                          name={item.orderId.toString()}
                          placeholder="Đánh giá sản phẩm sau khi nhận hàng"
                          onChange={handleInput}
                        />
                        <div className="flex items-center justify-center my-[0.5rem]">
                          <button
                            className="bg-blue-200 hover:bg-blue-600 px-3 text-[#fff] font-semibold rounded-[5px]"
                            onClick={() => sendComment(item.orderId)}
                          >
                            Đánh giá
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div className="text-center font-bold">
                  <p>Không có đơn hàng</p>
                </div>
              );
            }
          })
      ) : (
        <div className="text-center font-bold">
          <p>Không có đơn hàng</p>
        </div>
      )}
    </div>
  );
};

export default Order;
