import { FaCartShopping, FaListUl } from "react-icons/fa6";
import SearchComponent from "../../Component/SearchComponent";
import { useDisclosure } from "@mantine/hooks";
import { Avatar, Badge, Menu, Modal, rem } from "@mantine/core";
import Login from "@Pages/Desktop/Auth/Login";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { LuClipboardEdit } from "react-icons/lu";
import {
  IconSettings,
  IconPhoto,
  IconLogout,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
import ModalCategory from "../../Component/ModalCategory";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteCookie } from "../../Component/utils/JwtCookie";

const Header = () => {
  const [modalLoginOpened, { open: openModalLogin, close: closeModalLogin }] =
    useDisclosure(false);
  const [
    modalCategory,
    { open: openModalCategory, close: closeModalCategory },
  ] = useDisclosure(false);

  const [typeChoose, setTypeChoose] = useState<string>("");
  const user = useSelector((state: RootState) => state.user);

  const handleModal = (type: string) => {
    setTypeChoose(type);
    return openModalLogin();
  };

  const handleModalCategory = () => {
    if (modalCategory) {
      closeModalCategory();
    } else {
      openModalCategory();
    }
  };

  return (
    <>
      <header>
        <div className="flex justify-between items-center min-h-[40px] w-full bg-[#89CFF3] px-[50px] p-3">
          {/* logo */}
          <div className="w-[25%] cursor-pointer">
            <div className="flex justify-center items-center gap-4">
              <div>
                <img className="object-cover w-full" src="#" alt="logo" />
              </div>
              <h1 className="text-[18px] font-bold uppercase">Gaming Shop</h1>
            </div>
          </div>
          {/* Menu */}
          <div onClick={handleModalCategory}>
            <div
              className={`flex items-center justify-center gap-1 cursor-pointer border-black border-[1.5px] rounded-[5px] p-1.5 hover:bg-[#00A9FF] hover:text-white transition duration-300 ease-linear relative z-[42] bg-[#89CFF3]`}
            >
              <FaListUl />
              <span className="mb-0.5 text-[16px]">Danh Mục</span>
            </div>
          </div>
          <div className="w-[40%] flex items-center justify-between">
            <SearchComponent />
            <div className="flex items-center justify-end gap-2 flex-1">
              <div className="flex items-center justify-center gap-2 cursor-pointer hover:text-blue-600 transition-all duration-300 ease-linear">
                <LuClipboardEdit className="text-[22px]" />
                <span className="w-[70px] text-[14px] font-semibold">
                  Tra cứu sản phẩm
                </span>
              </div>
              <Link
                to={`${import.meta.env.VITE_BASE_URL}/cart`}
                className="relative flex items-center justify-center gap-2 cursor-pointer hover:text-blue-600 transition-all duration-300 ease-linear"
              >
                <FaCartShopping className="text-[24px]" />
                <div className="absolute -top-2 left-3">
                  <Badge size="xs" circle>
                    1
                  </Badge>
                </div>
                <span className="w-[70px] text-[14px] font-semibold">
                  Giỏ hàng
                </span>
              </Link>
            </div>
          </div>
          {user?.logged ? (
            <div className="">
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar
                      src={user?.avatar}
                      alt="no image here"
                      color="indigo"
                    />
                    <div>
                      <div className="text-[14px] font-bold uppercase">
                        {user.lastName}
                      </div>
                      <p className="text-[12px]">
                        Hạng: <span className="uppercase font-bold">VIP1</span>
                      </p>
                    </div>
                    <IoIosArrowForward />
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Ứng dụng</Menu.Label>
                  <Menu.Item
                    leftSection={<IconSettings style={{ width: rem(20) }} />}
                  >
                    Cài đặt
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconPhoto style={{ height: rem(20) }} />}
                  >
                    Hình ảnh
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Label></Menu.Label>
                  <Menu.Item
                    leftSection={
                      <IconArrowsLeftRight
                        style={{ width: rem(20), height: rem(20) }}
                      />
                    }
                  >
                    Lịch sử giao dịch
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => deleteCookie("jwt")}
                    color="red"
                    leftSection={
                      <IconLogout
                        style={{
                          width: rem(20),
                          height: rem(20),
                        }}
                      />
                    }
                  >
                    Đăng Xuất
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          ) : (
            <div className="w-[10%] flex items-center gap-3">
              <button onClick={() => handleModal("login")}>Đăng Nhập</button>
              <button onClick={() => handleModal("register")}>Đăng Ký</button>
            </div>
          )}
        </div>
      </header>
      <Modal
        opened={modalLoginOpened}
        onClose={closeModalLogin}
        withCloseButton={false}
        centered
      >
        <Login type={typeChoose} closeModal={closeModalLogin} />
      </Modal>
      <Modal
        style={{ zIndex: 1 }}
        opened={modalCategory}
        onClose={closeModalCategory}
        withCloseButton={false}
        size="100%"
        styles={{
          content: { backgroundColor: "transparent", boxShadow: "none" },
          overlay: { zIndex: 1, "--mb-z-index": 41 },
        }}
      >
        <ModalCategory />
      </Modal>
    </>
  );
};

export default Header;
