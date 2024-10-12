import { FaCartShopping, FaListUl } from "react-icons/fa6";
import SearchComponent from "../../Component/SearchComponent";
import { Avatar, Badge, Menu, Modal, rem } from "@mantine/core";
import Login from "@Pages/Desktop/Auth/Login";
import { IoIosArrowForward } from "react-icons/io";
import { LuClipboardEdit } from "react-icons/lu";
import {
  IconSettings,
  IconLogout,
  IconArrowsLeftRight,
} from "@tabler/icons-react";
import ModalCategory from "../../Component/ModalCategory";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, persist, RootState } from "../../store/store";
import { logout } from "../../store/actions/UserSlice";
import {
  closeCategoryModal,
  closeLoginModal,
  openCategoryModal,
  openLoginModal,
} from "../../store/actions/ModalSlice";
import { useEffect } from "react";
import { cart } from "../../store/actions/userActions";

const Header = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch<AppDispatch>();
  const modal = useSelector((state: RootState) => state.modal);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchCart = async () => {
      if (user?.id) {
        await dispatch(cart(user.id));
      }
    };
    fetchCart();
  }, []);

  const handleModal = (type: string) => {
    return dispatch(openLoginModal({ type: type }));
  };

  const handleModalCategory = () => {
    if (modal?.categoryOpened) {
      dispatch(closeCategoryModal());
    } else {
      dispatch(openCategoryModal());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    persist.purge();
  };

  return (
    <>
      <header>
        <div className="flex justify-between items-center min-h-[40px] w-full bg-[#89CFF3] px-[50px] p-3">
          {/* logo */}
          <div className="w-[25%] cursor-pointer">
            <div
              className="flex justify-center items-center gap-4"
              onClick={() => navigate(baseURL)}
            >
              <div className="w-[70px] overflow-hidden rounded-[5px]">
                <img
                  className="object-contain w-full scale-150"
                  src="https://i.pinimg.com/originals/77/24/69/772469e807964c438437fc1679f394a1.jpg"
                  alt="logo"
                />
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
              <Link
                to={`${import.meta.env.VITE_BASE_URL}/cart`}
                className="relative flex items-center justify-center gap-2 cursor-pointer hover:text-blue-600 transition-all duration-300 ease-linear"
              >
                <FaCartShopping className="text-[24px]" />
                <div className="absolute -top-2 left-3">
                  <Badge size="xs" circle>
                    {user?.cart}
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
                      src={`http://localhost:8080/api/user/${user.id}/avatar`}
                      alt="no image here"
                      color="indigo"
                    />
                    <div>
                      <div className="text-[14px] font-bold uppercase">
                        {user.lastName}
                      </div>
                      {user?.userRank && (
                        <p className="text-[12px]">
                          Hạng:{" "}
                          <span className="uppercase font-bold">
                            {user?.userRank}
                          </span>
                        </p>
                      )}
                    </div>
                    <IoIosArrowForward />
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Ứng dụng</Menu.Label>
                  <Menu.Item
                    onClick={() => navigate(`${baseURL}/setting/user`)}
                    leftSection={<IconSettings style={{ width: rem(20) }} />}
                  >
                    Cài đặt
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item
                    onClick={() => navigate(`${baseURL}/user/order`)}
                    leftSection={
                      <IconArrowsLeftRight
                        style={{ width: rem(20), height: rem(20) }}
                      />
                    }
                  >
                    Đơn hàng
                  </Menu.Item>
                  <Menu.Item
                    onClick={handleLogout}
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
        opened={modal?.loginOpened || false}
        onClose={() => dispatch(closeLoginModal())}
        withCloseButton={false}
        centered
        styles={{ body: { padding: 0 } }}
      >
        <Login closeModal={() => dispatch(closeLoginModal())} />
      </Modal>
      <Modal
        style={{ zIndex: 1 }}
        opened={modal?.categoryOpened || false}
        onClose={() => dispatch(closeCategoryModal())}
        withCloseButton={false}
        size="100%"
        styles={{
          content: { backgroundColor: "transparent", boxShadow: "none" },
          overlay: { zIndex: 1, "--mb-z-index": 41 },
        }}
      >
        <ModalCategory closeModal={() => dispatch(closeCategoryModal())} />
      </Modal>
    </>
  );
};

export default Header;
