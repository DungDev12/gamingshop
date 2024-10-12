import { useCallback, useEffect, useState } from "react";
import InputComponent from "../../../Component/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { login } from "../../../store/actions/userActions";
import { encryptPayload } from "../../../Component/utils/JwtCookie";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  username: string;
  password: string;
}

const LoginAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const urlBase = import.meta.env.VITE_BASE_URL;
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user?.logged) {
      if (user?.role != "ADMIN") {
        return navigate(`${urlBase}`);
      }
      return navigate(`${urlBase}/admin`);
    }
  }, [dispatch, user]);
  const [formData, setFormData] = useState<LoginProps>({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    await dispatch(login(encryptPayload(formData)));
  };

  const handleOnChange = useCallback((name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);
  return (
    <div className="min-w-[100vw] min-h-[100vh] grid place-items-center bg-black">
      <div className="w-[400px] h-[300px] bg-[#fff] rounded-[8px] p-3">
        <div className="text-center">
          <h1 className="text-[20px] font-bold uppercase">Đăng nhập</h1>
          <form onSubmit={handleSubmit}>
            <InputComponent
              type="text"
              title="Username"
              name="username"
              valueGetter={formData.username}
              onChangeReturn={handleOnChange}
            />
            <InputComponent
              type="password"
              title="Password"
              name="password"
              valueGetter={formData.password}
              onChangeReturn={handleOnChange}
            />
            <hr className="py-[10px]" />
            <button
              type="submit"
              className="bg-blue-300 px-3 py-1 text-[#fff] rounded-[5px] hover:bg-blue-600 "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
