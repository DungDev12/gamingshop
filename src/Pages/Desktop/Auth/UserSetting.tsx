import { Avatar, Progress } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useCallback, useEffect, useState } from "react";
import AccessDenied from "./private/AccessDenied";
import InputComponent from "../../../Component/InputComponent";
import { TypeForm } from "../../../Component/Interface/Login";
import axios from "axios";
import { encryptPayload } from "../../../Component/utils/JwtCookie";
import { update, updatePoint } from "../../../store/actions/userActions";
import { toast } from "react-toastify";

type UserRank = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "DIAMOND";

const UserSetting = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [err, setErr] = useState<string>("");
  const [formData, setFormData] = useState<TypeForm>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  });

  const pointRank: Record<UserRank, { start: number; end: number }> = {
    BRONZE: { start: 0, end: 10000 },
    SILVER: { start: 10000, end: 20000 },
    GOLD: { start: 20000, end: 30000 },
    PLATINUM: { start: 30000, end: 40000 },
    DIAMOND: { start: 40000, end: 50000 },
  };
  const userRank: UserRank | undefined = user?.userRank as UserRank;

  const [progressPoint, setProgressPoint] = useState<number>(0);

  useEffect(() => {
    const getUserPoints = async () => {
      try {
        await dispatch(updatePoint(user.id)); // Gọi API để lấy điểm
      } catch (error) {
        console.error("Lỗi khi lấy điểm người dùng:", error);
      }
    };
    if (user) {
      getUserPoints();
    }
  }, [dispatch]);

  useEffect(() => {
    let point = 0;
    if (user?.points && userRank && pointRank[userRank]) {
      const rank = pointRank[userRank];
      point = ((user.points - rank.start) / (rank.end - rank.start)) * 100;
      point = Math.min(point, 100);
      setProgressPoint(point);
    } else {
      console.error("Điểm người dùng hoặc hạng không hợp lệ");
    }
  }, [user]);

  /* --------------------------- Upload Avatar User --------------------------- */
  // TODO upload fetch API then change Avatar if Upload Success
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setErr("Chỉ cho phép tệp hình ảnh (JPEG, PNG)");
        return (e.target.value = "");
      }

      const maxSize = 1 * 1024 * 1024; // 1MB
      if (file.size > maxSize) {
        setErr("Kích thước tệp phải nhỏ hơn 1MB");
        return (e.target.value = "");
      }
      setErr("");

      // Render Image Review
      const reader = new FileReader();
      reader.onloadend = () => {};
      reader.readAsDataURL(file);

      if (!file) {
        return setErr("Không có file");
      }
      if (!user?.id) {
        return setErr("Không tìm thấy người dùng");
      }
      try {
        const form = new FormData();
        form.append("file", file);
        const response = await axios.post(
          `http://localhost:8080/api/user/${user?.id}/upload-image`,
          form,
          {
            withCredentials: true,
          }
        );
        if (response.status != 200) {
          e.target.value = "";
          return setErr(response.data);
        }
        location.reload();
      } catch (err) {
        e.target.value = "";
        console.error("Failed to upload image:", err);
      }
    } else {
      setErr("Không có tệp nào được chọn.");
    }
  };

  /* ----------------------- Set Value to State formData ---------------------- */
  const handleOnChange = useCallback((name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  /* ------------------------- Submit Update Info User ------------------------ */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(
        update({ payload: encryptPayload(formData), id: user?.id })
      ).unwrap();
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
    } catch (err) {
      console.error("Failed to upload image:", err);
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
  };

  return user?.logged && user?.role != "" ? (
    <div className="bg-white min-h-[500px] max-w-[60%] mx-auto my-[2rem] p-2 rounded-[8px] shadow-2xl">
      User Setting
      <div className="flex items-center px-[50px] gap-4 justify-around">
        <div className="w-[200px]">
          <div className="group relative rounded-full max-w-[120px] overflow-hidden border-[1.5px] border-black shadow-lg mx-auto">
            <Avatar
              size={"120px"}
              src={`http://localhost:8080/api/user/${user.id}/avatar`}
              alt="no image here"
              color="indigo"
              className="absolute top-0 left-0 pointer-events-none"
            />
            {user.loginWith != "google" && (
              <div className="group-hover:block hidden w-full h-[120px] absolute bg-[#0000004c] top-0 left-0">
                <input
                  type="file"
                  className="hidden"
                  id="files"
                  onChange={handleUploadImage}
                  accept=".png, .jpg, .jpeg"
                />
                <label
                  htmlFor={"files"}
                  className="bg-blue-500 inline-block absolute top-[46px] left-[25px] text-white px-2 rounded-[5px] cursor-pointer"
                >
                  Upload
                </label>
              </div>
            )}
          </div>
          {err && (
            <p className="text-red-500 text-[14px] w-full text-center my-[0.5rem]">
              {err}
            </p>
          )}
          <div className="my-4">
            <div>
              <div className="flex items-center justify-between font-serif text-[12px]">
                <span>{user?.userRank && pointRank[userRank].start}</span>
                <span>{user?.userRank && pointRank[userRank].end}</span>
              </div>
              <Progress value={progressPoint} animated />
              <p className="text-[12px] text-center font-semibold text-blue-600">
                {progressPoint.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <form onSubmit={handleSubmit}>
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
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-400  hover:bg-blue-600 font-bold text-[#fff] px-2 rounded-[5px]"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <AccessDenied />
  );
};

export default UserSetting;
