import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const loginUser = async (payload: string) => {
  const response = await api.post("/api/auth/login", { payload });
  return response;
};

export const registerUser = async (payload: string) => {
  const response = await api.post("/api/auth/register", { payload });
  return response;
};

export const loginGoogle = async (payload: string) => {
  const response = await api.post("/api/auth/google", { payload });
  return response;
};

export const updateInfo = async (payload: string, id: number | undefined) => {
  const response = await api.post(`/api/user/${id}/update-info`, { payload });
  return response;
};

export const cartUser = async (id: number) => {
  const response = await api.get(`/cart/${id}`);
  return response;
};

export const point = async (id: number) => {
  const response = await api.get(`/api/user/point/${id}`, {
    withCredentials: true,
  });
  return response;
};
