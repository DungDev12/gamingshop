import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  cartUser,
  loginGoogle,
  loginUser,
  point,
  registerUser,
  updateInfo,
} from "@routes/config/api";
import { AxiosError } from "axios";
import { ErrorAlbert } from "../../Component/utils/errorSwal";
import { ErrorResponse } from "react-router-dom";

export const login = createAsyncThunk(
  "user/login",
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await loginUser(payload);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      ErrorAlbert(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await registerUser(payload);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      ErrorAlbert(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const google = createAsyncThunk(
  "user/google",
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await loginGoogle(payload);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      ErrorAlbert(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

interface UpdateInfoParams {
  payload: string;
  id: number | undefined;
}

export const update = createAsyncThunk(
  "user/update-info",
  async ({ payload, id }: UpdateInfoParams, { rejectWithValue }) => {
    try {
      const response = await updateInfo(payload, id); // Giả sử updateInfo là hàm API để cập nhật thông tin
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      console.error(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const cart = createAsyncThunk(
  "user/cart",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await cartUser(id);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      console.error(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updatePoint = createAsyncThunk(
  "user/update-point",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await point(id);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      console.error(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
