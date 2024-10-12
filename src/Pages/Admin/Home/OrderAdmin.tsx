import { Select, Table, TableThead } from "@mantine/core";
import axios, { AxiosError } from "axios";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useEffect, useState } from "react";
import { currentNumber } from "../../../Component/utils/current";
import { toast } from "react-toastify";
import { decryptPayload } from "../../../Component/utils/JwtCookie";

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
  status: string[];
  userPhone: number;
  totalPrice: number;
  orderItems: OrderItemProps[];
}
const OrderAdmin = () => {
  const [order, setOrder] = useState<OrderProps[]>([]);
  const [showOrder, setShowOrder] = useState<OrderProps[]>(order);
  const [orderStatus, setOrderStatus] = useState<string[]>([]);
  const [filterOrder, setFilterOrder] = useState<string | null>("");

  useEffect(() => {
    get();
  }, []);

  async function get() {
    try {
      const getSelection = await axios.get(
        "http://localhost:8080/api/admin/order-status",
        { withCredentials: true }
      );
      if (getSelection.status === 200) {
        setOrderStatus(getSelection.data);
      }
      const response = await axios.get(
        "http://localhost:8080/api/admin/order/all",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setOrder(decryptPayload(response.data));
        setShowOrder(decryptPayload(response.data));
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  }

  const handleChange = async (value: string | null, id: number) => {
    if (value) {
      try {
        const response = await axios.patch(
          "http://localhost:8080/api/admin/order-update",
          null,
          {
            params: { orderId: id, status: value },
            withCredentials: true,
          }
        );
        if (response.status === 204) {
          get();
          toast.success("Cập nhật thành công", {
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
        toast.error("Cập nhật thất bại", {
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
    }
  };

  useEffect(() => {
    if (filterOrder == null) {
      setShowOrder(order);
    } else {
      setShowOrder(order.filter((item) => item.orderStatus === filterOrder));
    }
  }, [filterOrder]);

  return (
    <div className="bg-[#fff] rounded-[5px] overflow-y-auto p-3 max-h-[900px]">
      <div>
        <div>
          <Select
            placeholder="Chọn tình trạng"
            w={200}
            data={orderStatus}
            clearable
            defaultValue={orderStatus[0]}
            allowDeselect={false}
            onChange={(value: string | null) => setFilterOrder(value)}
          />
        </div>
        <Table>
          <TableThead>
            <Table.Tr>
              <Table.Th className="w-[50px]">STT</Table.Th>
              <Table.Th className="w-[250px]">Tên người đặt</Table.Th>
              <Table.Th className="w-[250px]">Số điện thoại</Table.Th>
              <Table.Th className="w-[300px]">Địa chỉ giao hàng</Table.Th>
              <Table.Th className="w-[250px]">Tình trạng đơn hàng</Table.Th>
              <Table.Th className="w-[250px]">Tổng đơn hàng</Table.Th>
              <Table.Th>Tổng giá trị</Table.Th>
            </Table.Tr>
          </TableThead>
        </Table>
        {showOrder &&
          showOrder
            .slice()
            .reverse()
            .map((ord, i) => (
              <Table key={ord.orderId} className="mb-[1rem]">
                <Table.Tbody>
                  <Table.Tr className="border-t-[2px] border-black">
                    <Table.Th className="w-[50px]">{i + 1}</Table.Th>
                    <Table.Td className="w-[250px]">{ord.userName}</Table.Td>
                    {ord.userPhone && (
                      <Table.Td className="w-[250px]">
                        {(() => {
                          const phoneNumber = parsePhoneNumberFromString(
                            ord.userPhone.toString(),
                            "VN"
                          );
                          return phoneNumber
                            ? `0${phoneNumber.nationalNumber}`
                            : "Không có số điện thoại";
                        })()}
                      </Table.Td>
                    )}
                    <Table.Td className="w-[300px]">{ord.userAddress}</Table.Td>
                    <Table.Td className="w-[250px]">
                      <Select
                        placeholder="Chọn tình trạng"
                        data={orderStatus}
                        defaultValue={ord.orderStatus}
                        allowDeselect={false}
                        onChange={(e) => handleChange(e, ord.orderId)}
                      />
                    </Table.Td>
                    <Table.Td className="w-[250px]">
                      {ord.orderItems.length}
                    </Table.Td>
                    <Table.Td className="text-red-600 text-[18px] font-bold">
                      {currentNumber(ord.totalPrice)}
                    </Table.Td>
                  </Table.Tr>
                  {ord.orderItems.map((item, i) => (
                    <Table.Tr key={`${item.details}-${i}`}>
                      <Table.Td colSpan={8}>
                        <div className="flex items-center gap-4">
                          <div className="w-[150px] h-[150px] overflow-hidden rounded-[5px] shadow-lg">
                            <img
                              className="w-[150px] h-[150px] object-cover"
                              src={`http://localhost:8080/product/${item.id}/${item.image}`}
                            />
                          </div>
                          <div className="flex gap-2 justify-between items-center w-full">
                            <div>
                              <p className="text-[24px] font-semibold">
                                {item.productName}
                              </p>
                              <div>
                                {item.details.map((config) => (
                                  <div
                                    className="grid gap-2 font-semibold grid-cols-2"
                                    key={config.name}
                                  >
                                    <p>{config.name}</p>
                                    <p>{config.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <p className="text-[18px] font-bold">
                              {currentNumber(item.price)}
                            </p>
                            <p className="text-[18px] font-bold">
                              {item.quantity}
                            </p>
                            <p className="text-[18px] font-bold text-red-600">
                              {currentNumber(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            ))}
      </div>
    </div>
  );
};

export default OrderAdmin;
