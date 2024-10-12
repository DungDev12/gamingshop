import { FloatingIndicator, UnstyledButton } from "@mantine/core";
import { useCallback, useState } from "react";
import InputComponent from "../../../Component/InputComponent";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { AxiosError } from "axios";
import { TypeForm } from "../../../Component/Interface/Login";
import { encrypt, encryptPayload } from "../../../Component/utils/JwtCookie";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { google, login, register } from "../../../store/actions/userActions";
import { AppDispatch, RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { changeType } from "../../../store/actions/ModalSlice";

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

const Login = ({ closeModal }: { closeModal: () => void }) => {
  const openWith = useSelector((state: RootState) => state.modal?.type);
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [active, setActive] = useState(openWith == "login" ? 0 : 1);
  const [formData, setFormData] = useState<TypeForm>({});
  const [err, setErr] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };
  const navigate = useNavigate();

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

  const handleChange = (item: string, index: number) => {
    dispatch(changeType({ type: item }));
    setActive(index);
  };

  /* ----------------------- Set Value to State formData ---------------------- */
  const handleOnChange = useCallback((name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  /* ---------------------------- Login or Register --------------------------- */
  //* Login and Register user (finish)
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    type: string
  ) => {
    e.preventDefault();
    console.log(formData);
    if (type !== "login") {
      if (formData.password != formData.passwordReEnter) {
        return setErr("Mật khẩu không khớp");
      }
      if (formData.username == "" || formData.username == undefined) {
        return setErr("Tài khoản không được để trống");
      }
      if (formData.email == "" || formData.email == undefined) {
        return setErr("Email không được để trống");
      }
      if (formData.phone == "" || formData.phone == undefined) {
        return setErr("Số điện thoại không được để trống");
      }
      if (formData.phone.length < 9) {
        return setErr("Số điện thoại không hợp lệ");
      }
      if (formData.lastName == "" || formData.lastName == undefined) {
        return setErr("Tên không được để trống");
      }
      if (!formData.email.includes("@")) {
        return setErr("Email không hợp lệ");
      }
    } else {
      if (formData.username == "" || formData.username == undefined) {
        return setErr("Tài khoản không được để trống");
      }
      if (formData.password == "" || formData.password == undefined) {
        return setErr("Mật khẩu không được để trống");
      }
    }
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
    try {
      if (type === "login") {
        await dispatch(login(encryptPayload(payload))).unwrap();
      } else {
        await dispatch(register(encryptPayload(payload))).unwrap();
      }
      closeModal();
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  };

  /* -------------------------- Login Google Account -------------------------- */
  //* Login Google (finish)
  const handleLoginGoogle = async (tokenResponse: CredentialResponse) => {
    try {
      const payload = tokenResponse.credential!;
      await dispatch(google(encrypt(payload))).unwrap();
      closeModal();
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
    }
  };

  return (
    <div
      style={{ overflow: "hidden" }}
      className="px-[16px] pt-[16px] relative"
    >
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
              <div className="mb-[5px] text-[12px]">
                <span
                  className="cursor-pointer text-blue-400 underline underline-offset-2 hover:text-blue-600"
                  onClick={() => {
                    if (!user?.logged) {
                      navigate(
                        `${import.meta.env.VITE_BASE_URL}/forgot-password`
                      );
                      closeModal();
                    }
                  }}
                >
                  Quên mật khẩu?
                </span>
              </div>
              <button
                type="submit"
                className={`px-[20px] py-[5px] rounded-[4px] text-white ${
                  user?.loading
                    ? "bg-blue-200 pointer-events-none"
                    : "bg-blue-400 hover:bg-blue-600"
                }`}
              >
                Đăng nhập
              </button>
            </form>
            <hr className="mb-[0.5rem]" />
            <div className="mb-[10px] inline-block">
              <GoogleLogin
                onSuccess={async (tokenResponse) =>
                  await handleLoginGoogle(tokenResponse)
                }
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-[20px] px-[15px] w-full">
            <h2 className="text-[24px] font-bold">Đăng ký</h2>
            <form
              className="my-[10px]"
              onSubmit={(e) => handleSubmit(e, "register")}
            >
              <div className="flex items-center gap-4">
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
              {err && <p className="text-red-600 text-[12px]">{err}</p>}
              <button
                type="submit"
                className={`px-[20px] py-[5px] rounded-[4px] text-white ${
                  user?.loading
                    ? "bg-blue-200 pointer-events-none"
                    : "bg-blue-400 hover:bg-blue-600"
                }`}
              >
                Đăng ký
              </button>
            </form>
          </div>
        )}
      </div>
      {user?.loading && (
        <div className="w-full h-full absolute bg-[#0000006e] z-[1] top-0 left-0 grid place-items-center">
          <AiOutlineLoading3Quarters className="text-[60px] text-white animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Login;
