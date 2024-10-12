import { rem, Stepper } from "@mantine/core";
import { useEffect, useState } from "react";
import { BsPersonBoundingBox } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { FaBox, FaCheck, FaDropbox } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface OrderComponentProps {
  status: string;
}
const OrderComponent: React.FC<OrderComponentProps> = ({ status }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (status != "") {
      if (status == "PENDING") {
        setActive(0);
      } else if (status == "PREPARING") {
        setActive(1);
      } else if (status == "IN_TRANSIT") {
        setActive(2);
      } else if (status == "DELIVERED") {
        setActive(3);
      } else if (status == "FINISH") {
        setActive(4);
      } else if (status == "FINISH_ORDER") {
        setActive(5);
      } else if (status == "CANCELED_ORDER") {
        setActive(100);
      }
    }
  }, [status]);

  return (
    <div className="w-[90%] mx-auto my-[1rem]">
      <Stepper
        active={active}
        color={status == "FINISH_ORDER" ? "green" : active === 100 ? "red" : ""}
        style={{ color: active === 100 ? "red" : "" }}
        completedIcon={
          status == "CANCELED_ORDER" ? (
            <IoClose style={{ width: rem(24), height: rem(24) }} />
          ) : (
            <FaCheck style={{ width: rem(18), height: rem(18) }} />
          )
        }
      >
        <Stepper.Step
          icon={
            <BsPersonBoundingBox style={{ width: rem(18), height: rem(18) }} />
          }
          label="Step 1"
          description="Chờ xác thực"
        />
        <Stepper.Step
          icon={<FaBox style={{ width: rem(18), height: rem(18) }} />}
          label="Step 2"
          description="Đang đóng gói"
        />
        <Stepper.Step
          icon={<FaShippingFast style={{ width: rem(18), height: rem(18) }} />}
          label="Step 3"
          description="Đang giao"
        />
        <Stepper.Step
          icon={<FaDropbox style={{ width: rem(18), height: rem(18) }} />}
          label="Step 4"
          description="Nhận hàng"
        />
      </Stepper>
    </div>
  );
};

export default OrderComponent;
