import { FloatingIndicator, UnstyledButton } from "@mantine/core";
import { useCallback, useState } from "react";
import InputComponent from "../../../Component/InputComponent";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TypeForm } from "../../../Component/Interface/Login";
import { encryptPayload, getCookie } from "../../../Component/utils/JwtCookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/actions/UserSlice";

const data = [
  {
    title: "Đăng nhập",
    type: "login",
  },
  {
    title: "Đăng ký",
    type: "register",
  },
];

const Login = ({
  type,
  closeModal,
}: {
  type: string;
  closeModal: () => void;
}) => {
  const [openWith, setOpenWith] = useState<string>(type || "");
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [active, setActive] = useState(openWith == "login" ? 0 : 1);
  const [formData, setFormData] = useState<TypeForm>({});
  const dispatch = useDispatch();

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };
  const controls = data.map((item, index) => (
    <UnstyledButton
      key={index}
      className={
        "px-[10px] py-[5px] leading-8 text-gray-700 rounded-md text-sm transition-colors duration-100 ease-in-out font-medium data-[active]:text-white"
      }
      ref={setControlRef(index)}
      mod={{ active: active === index }}
    >
      <span
        className={"relative z-[1] px-[10px]"}
        onClick={() => handleChange(item.type, index)}
      >
        {item.title}
      </span>
    </UnstyledButton>
  ));

  /// Lỗi chưa set Time chuyển trang -> khi click nhanh trang không được render lại
  const handleChange = (item: string, index: number) => {
    setOpenWith(item);
    setActive(index);
  };

  const handleOnChange = useCallback((name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    type: string
  ) => {
    e.preventDefault();
    console.log(type, formData);

    //TODO create logic error

    const payload =
      type === "login"
        ? { username: formData.username, password: formData.password }
        : {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            firstName: formData.firstName,
            lastName: formData.lastName,
          };
    const api =
      type == "login"
        ? "http://localhost:8080/api/auth/login"
        : "http://localhost:8080/api/auth/register";
    try {
      const res = await axios.post(
        api,
        { payload: encryptPayload(payload) },
        { withCredentials: true }
      );
      if (res.status === 200) {
        const jwt = getCookie("jwt");
        if (jwt) {
          const decoded = jwtDecode(jwt);
          dispatch(setUser(decoded));
          closeModal();
        }
      }
    } catch (err) {
      console.log("Login/Register: ", err);
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div
        className={"relative flex gap-[10px] justify-center"}
        ref={setRootRef}
      >
        {controls}
        <FloatingIndicator
          target={controlsRefs[active]}
          parent={rootRef}
          className={"bg-green-500 rounded-[5px]"}
        />
      </div>
      <div
        className={`flex w-[100%] gap-4 transform transition-all duration-200 ease-linear `}
      >
        {openWith == "login" ? (
          <div className="text-center py-[20px] w-full">
            <h2 className="text-[24px] font-bold">Đăng nhập</h2>
            <form
              className="my-[10px]"
              onSubmit={(e) => handleSubmit(e, "login")}
            >
              <InputComponent
                title="Tài khoản hoặc số điện thoại"
                name="username"
                type="text"
                valueGetter={formData?.username}
                onChangeReturn={handleOnChange}
              />
              <InputComponent
                title="Mật khẩu"
                name="password"
                type="password"
                valueGetter={formData?.password}
                onChangeReturn={handleOnChange}
              />
              <div className="mb-[5px] text-[12px]">
                <p>
                  Bạn chưa có tài khoản?{" "}
                  <span
                    className="cursor-pointer text-blue-400 underline underline-offset-2 hover:text-blue-600"
                    onClick={() =>
                      handleChange(
                        openWith == "login" ? "register" : "login",
                        openWith == "login" ? 1 : 0
                      )
                    }
                  >
                    Tạo Tài Khoản
                  </span>
                </p>
              </div>
              <button
                type="submit"
                className={`bg-blue-400 px-[20px] py-[5px] rounded-[4px] text-white hover:bg-blue-600`}
              >
                Đăng nhập
              </button>
            </form>
            <hr className="mb-[0.5rem]" />
            <div className="mb-[10px] inline-block">
              <GoogleLogin
                onSuccess={async (tokenResponse) => {
                  console.log(tokenResponse);
                  try {
                    const response = await axios.post(
                      "http://localhost:8080/api/auth/verify-google-jwt",
                      tokenResponse.credential,
                      {
                        withCredentials: true,
                      }
                    );

                    if (response.status == 200) {
                      const jwt = getCookie("jwt");
                      if (jwt) {
                        const decoded = jwtDecode(jwt);
                        dispatch(setUser(decoded));
                        closeModal();
                      }
                    }
                  } catch (error) {
                    console.error("Lỗi JWT: ", error);
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-[20px] w-full">
            <h2 className="text-[24px] font-bold">Đăng ký</h2>
            <form
              className="my-[10px]"
              onSubmit={(e) => handleSubmit(e, "register")}
            >
              <div className="flex items-center gap-4 px-[20px]">
                <InputComponent
                  title="Họ"
                  name="firstName"
                  type="text"
                  valueGetter={formData?.firstName}
                  onChangeReturn={handleOnChange}
                />
                <InputComponent
                  title="Tên"
                  name="lastName"
                  type="text"
                  valueGetter={formData?.lastName}
                  onChangeReturn={handleOnChange}
                />
              </div>
              <InputComponent
                title="Tên Tài Khoản"
                name="username"
                type="text"
                valueGetter={formData?.username}
                onChangeReturn={handleOnChange}
              />
              <InputComponent
                title="Mật khẩu"
                name="password"
                type="password"
                valueGetter={formData?.password}
                onChangeReturn={handleOnChange}
              />
              <InputComponent
                title="Nhập lại mật khẩu"
                name="passwordReEnter"
                type="password"
                valueGetter={formData?.passwordReEnter}
                onChangeReturn={handleOnChange}
              />
              <InputComponent
                title="Số điện thoại"
                name="phone"
                type="phone"
                valueGetter={formData?.phone}
                onChangeReturn={handleOnChange}
              />
              <InputComponent
                title="Email"
                name="email"
                type="text"
                valueGetter={formData?.email}
                onChangeReturn={handleOnChange}
              />
              <InputComponent
                title="Địa chỉ"
                name="address"
                type="text"
                valueGetter={formData?.address}
                onChangeReturn={handleOnChange}
              />
              <button
                type="submit"
                className="bg-blue-600 px-[20px] py-[5px] rounded-[4px] text-white "
              >
                Đăng ký
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
