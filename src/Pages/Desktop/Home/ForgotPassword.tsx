import { PinInput, rem, Stepper } from "@mantine/core";
import { IconMailOpened, IconShieldCheck } from "@tabler/icons-react";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import {
  MdNoEncryptionGmailerrorred,
  MdOutlineAlternateEmail,
  MdPassword,
} from "react-icons/md";
import { encrypt, encryptPayload } from "../../../Component/utils/JwtCookie";
import { IoCheckmarkDoneCircle, IoClose } from "react-icons/io5";
import InputComponent from "../../../Component/InputComponent";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface PassProps {
  password: string;
  passwordReEnter: string;
}

const ForgotPassword = () => {
  const logged = useSelector((state: RootState) => state.user?.logged);
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0);
  const [errStep, setErrStep] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [finalRe, setFinalRe] = useState<string>("s");
  const [otp, setOTP] = useState<string>("");
  const [err, setErr] = useState<string>("1");
  const [pass, setPass] = useState<PassProps>({
    password: "",
    passwordReEnter: "",
  });

  /* ---------------------------------- Email --------------------------------- */
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value.includes("@") || !value.includes(".")) {
      setErr("Email không hợp lệ!");
    } else {
      setErr("");
    }
    setEmail(value);
    setErr("");
  };

  /* ---------------------------- Submit Send Email --------------------------- */
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrStep(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        {
          payload: encrypt(email),
        }
      );
      if (response.status === 200) {
        setStep(1);
      }
    } catch (err) {
      const error = err as AxiosError;
      setErrStep(true);
      const errorMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Đã xảy ra lỗi. Vui lòng thử lại.";
      setErr(errorMessage);
    }
    setLoading(false);
  };

  /* ---------------------------- Handle Input OTP ---------------------------- */
  const handleOTP = (value: string) => {
    setOTP(value);
    setErr("");
  };

  /* ----------------------------- Submit Sent OTP ---------------------------- */
  const sentOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrStep(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/verify-otp",
        {
          payload: encryptPayload({ otp, email }),
        }
      );
      if (response.status === 200) {
        setStep(2);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      setErrStep(true);
      const errorMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Đã xảy ra lỗi. Vui lòng thử lại.";
      setErr(errorMessage);
    }
    setLoading(false);
  };

  /* -------------------------- Handle Input Password ------------------------- */
  const handleInput = useCallback((name: string, value: string) => {
    setPass((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  useEffect(() => {
    if (pass.password != pass.passwordReEnter) {
      setErr("Mật khẩu không khớp");
    } else {
      setErr("");
    }
  }, [pass]);

  /* ------------------------ Submit Sent New Password ------------------------ */
  const sentNewPass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        {
          payload: encryptPayload({ email, password: pass.password }),
        }
      );
      if (response.status === 200) {
        setStep(3);
        setFinalRe("success");
        setTimeout(() => {
          navigate(import.meta.env.VITE_BASE_URL);
        }, 3000);
      }
    } catch (err) {
      const error = err as AxiosError;
      setErrStep(true);
      const errorMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Đã xảy ra lỗi. Vui lòng thử lại.";
      setErr(errorMessage);
      setFinalRe("error");
    }
  };

  return !logged ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-[50%] min-h-[200px] bg-[#fff] p-4 mx-auto my-[2rem] rounded-[8px] shadow-2xl">
        <div className="">
          <Stepper
            active={step}
            color={
              finalRe == "error" ? "red" : finalRe == "success" ? "#00FF7F" : ""
            }
            completedIcon={
              finalRe == "error" ? (
                <IoClose
                  style={{
                    width: rem(30),
                    height: rem(30),
                    color: "#fff",
                  }}
                />
              ) : (
                <FaCheck style={{ width: rem(24), height: rem(24) }} />
              )
            }
          >
            <Stepper.Step
              icon={
                errStep && step == 0 ? (
                  <IoClose
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#ff0000",
                    }}
                  />
                ) : (
                  <IconMailOpened style={{ width: rem(24), height: rem(24) }} />
                )
              }
              label="Step 1"
              loading={loading && step == 0}
              description="Verify Email"
              color={
                finalRe == "error"
                  ? "red"
                  : step > 0 && !loading
                  ? "#00FA9A"
                  : errStep
                  ? "red"
                  : ""
              }
            />
            <Stepper.Step
              icon={
                errStep && step == 1 ? (
                  <IoClose
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#ff0000",
                    }}
                  />
                ) : (
                  <MdPassword style={{ width: rem(24), height: rem(24) }} />
                )
              }
              label="Step 2"
              loading={loading && step == 1}
              description="Verify OTP"
              color={
                finalRe == "error"
                  ? "red"
                  : step > 1 && !loading
                  ? "#00FA9A"
                  : errStep
                  ? "red"
                  : ""
              }
            />

            <Stepper.Step
              icon={
                errStep && step == 2 ? (
                  <IoClose
                    style={{
                      width: rem(30),
                      height: rem(30),
                      color: "#ff0000",
                    }}
                  />
                ) : (
                  <IconShieldCheck
                    style={{ width: rem(24), height: rem(24) }}
                  />
                )
              }
              label="Step 3"
              loading={loading && step == 2}
              description="Get full access"
              color={
                finalRe == "error"
                  ? "red"
                  : step > 2 && !loading
                  ? "#00FA9A"
                  : errStep
                  ? "red"
                  : ""
              }
            />
          </Stepper>
        </div>
        <div>
          {step == 0 ? (
            //*  Step Verify Email
            <form onSubmit={sendEmail}>
              <div
                className={`w-[300px] mx-auto ${
                  err
                    ? "border-[#fa5252] text-[#fa5252] "
                    : "border-black text-black"
                } border-[1.5px] p-2 mt-4 rounded-[5px] flex items-center justify-start `}
              >
                <MdOutlineAlternateEmail className="mr-1 mt-1" />
                <input
                  className="w-full outline-none"
                  onChange={handleEmail}
                  value={email}
                />
              </div>
              <p className="text-center mt-1 text-red-600 font-semibold text-[14px]">
                {err}
              </p>
              <div className="flex items-center justify-center mt-[1rem]">
                <button
                  className={`bg-blue-300 text-[#fff] px-3 rounded-[5px] hover:bg-blue-600 ${
                    err && "pointer-events-none"
                  }`}
                >
                  Gửi
                </button>
              </div>
            </form>
          ) : step == 1 ? (
            //* Step Verify OTP
            <form
              className="grid place-items-center mt-[2rem]"
              onSubmit={sentOTP}
            >
              <PinInput
                length={6}
                onChange={handleOTP}
                type={/^[0-9]*$/}
                styles={{
                  input: {
                    borderColor: err
                      ? "red"
                      : otp.length === 0
                      ? ""
                      : otp.length === 6
                      ? "green"
                      : "red",
                    "&:focus": {
                      borderColor: "blue",
                    },
                  },
                }}
              />
              <p className="text-center mt-1 text-red-600 font-semibold text-[14px]">
                {err}
              </p>
              <div className="flex items-center justify-centers my-[1rem]">
                <button
                  className={`bg-blue-300 hover:bg-blue-600 text-[#fff] px-3 rounded-[5px] ${
                    otp.length != 6 && "pointer-events-none"
                  }`}
                >
                  Gửi
                </button>
              </div>
            </form>
          ) : step == 2 ? (
            <div>
              <form className="max-w-[400px]  mx-auto" onSubmit={sentNewPass}>
                <InputComponent
                  type="password"
                  title="Mật khẩu mới"
                  name="password"
                  valueGetter={pass.password}
                  onChangeReturn={handleInput}
                />
                <InputComponent
                  type="password"
                  title="Xác nhận mật khẩu"
                  name="passwordReEnter"
                  valueGetter={pass.passwordReEnter}
                  onChangeReturn={handleInput}
                />
                <p className="text-center mt-1 text-red-600 font-semibold text-[14px]">
                  {err}
                </p>
                <div className="flex items-center justify-center">
                  <button
                    className={`bg-blue-300 ${
                      pass.password && pass.passwordReEnter
                        ? "hover:bg-blue-600"
                        : "pointer-events-none"
                    } ${
                      err && "pointer-events-none"
                    } px-3 rounded-[5px] text-white`}
                  >
                    Tạo
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="grid place-items-center min-h-[150px] text-[24px] font-bold">
              {finalRe == "success" ? (
                <div className="grid place-items-center pointer-events-none">
                  <IoCheckmarkDoneCircle className="text-[60px] text-[#32CD32]" />
                  <p className="text-[#32CD32]">
                    Khôi phục mật khẩu thành công
                  </p>
                </div>
              ) : (
                <div className="grid place-items-center pointer-events-none">
                  <MdNoEncryptionGmailerrorred className="text-[60px] text-[#fa5252]" />
                  <p className="">Khôi phục mật khẩu thất bại</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={import.meta.env.VITE_BASE_URL} />
  );
};

export default ForgotPassword;
