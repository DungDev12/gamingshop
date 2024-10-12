const keySC = import.meta.env.VITE_KEY_SC;
import * as CryptoTS from "crypto-ts";
import { TypeForm } from "../Interface/Login";
import axios, { AxiosError } from "axios";

export function encryptPayload(payload: TypeForm) {
  return CryptoTS.AES.encrypt(
    JSON.stringify(payload),
    CryptoTS.enc.Utf8.parse(keySC),
    {
      mode: CryptoTS.mode.ECB,
      padding: CryptoTS.pad.PKCS7,
    }
  ).toString();
}
export function encrypt(payload: string) {
  return CryptoTS.AES.encrypt(
    JSON.stringify(payload),
    CryptoTS.enc.Utf8.parse(keySC),
    {
      mode: CryptoTS.mode.ECB,
      padding: CryptoTS.pad.PKCS7,
    }
  ).toString();
}

export function decryptPayload(res: string) {
  return JSON.parse(
    CryptoTS.AES.decrypt(res, CryptoTS.enc.Utf8.parse(keySC), {
      mode: CryptoTS.mode.ECB,
      padding: CryptoTS.pad.PKCS7,
    }).toString(CryptoTS.enc.Utf8)
  );
}

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length > 1) {
    const cookieValue = parts[1].split(";")[0];
    return cookieValue;
  }
  return ""; // Nếu cookie không tồn tại, trả về chuỗi rỗng
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
};

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/auth", // Địa chỉ API
  withCredentials: true, // Cho phép gửi cookie
});

export const makeApiCall = async (): Promise<TypeForm | undefined> => {
  const accessToken = getCookie("jwt"); // Hoặc từ cookie
  try {
    const response = await apiClient.get("/protected-endpoint", {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    console.log("Dữ liệu nhận được:", response.data);
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      if (err.response.status === 401) {
        await refreshAccessToken(accessToken); // Gọi lại hàm refresh token
        return makeApiCall(); // Thử gọi lại API
      }
      console.error("Lỗi khi gọi API:", err.response.data);
    }
  }
};

export const refreshAccessToken = async (token: string) => {
  try {
    await apiClient.post(
      "/refresh-token",
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${decryptPayload(token)}`,
        },
      }
    );
    console.log("Refresh Token thành công");
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error("Refresh token không hợp lệ");
    }
    // Thực hiện logout hoặc điều hướng đến trang đăng nhập
    deleteCookie("jwt");
  }
};
