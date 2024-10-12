import { createSlice } from "@reduxjs/toolkit";
import { decryptPayload, deleteCookie } from "../../Component/utils/JwtCookie";
import {
  cart,
  google,
  login,
  register,
  update,
  updatePoint,
} from "./userActions";

export interface UserTypes {
  id: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: string;
  email?: string;
  logged: boolean;
  address?: string;
  loginWith: string;
  userRank: string | undefined;
  loading: boolean;
  error?: string;
  points?: number;
  cart?: number;
}

const initialState: UserTypes = {
  id: 0,
  firstName: "",
  lastName: "",
  role: "",
  phone: "",
  address: "",
  email: "",
  logged: false,
  loginWith: "",
  userRank: "",
  loading: false,
  error: "",
  points: 0,
  cart: 0,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        id,
        firstName,
        lastName,
        role,
        logged,
        email,
        phone,
        address,
        loginWith,
        userRank,
        points,
      } = action.payload;
      return {
        ...state,
        id,
        firstName,
        lastName,
        role,
        email,
        logged,
        phone,
        address,
        loginWith,
        userRank,
        points,
      };
    },
    logout: () => {
      deleteCookie("JWT");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------------------------------- Login --------------------------------- */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.logged = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loginWith = "login";
        Object.assign(state, decryptPayload(action.payload));
        state.logged = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.logged = false;
      })
      /* -------------------------------- Register -------------------------------- */
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.logged = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.loginWith = "login";
        Object.assign(state, decryptPayload(action.payload));
        state.logged = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.logged = false;
      })
      /* --------------------------------- Google --------------------------------- */
      .addCase(google.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.logged = false;
      })
      .addCase(google.fulfilled, (state, action) => {
        state.loading = false;
        state.loginWith = "google";
        Object.assign(state, decryptPayload(action.payload));
        state.logged = true;
      })
      .addCase(google.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.logged = false;
      })
      /* ------------------------------- Update Info ------------------------------ */
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        console.log(decryptPayload(action.payload));
        Object.assign(state, decryptPayload(action.payload));
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      /* ---------------------------------- Cart ---------------------------------- */
      .addCase(cart.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(cart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(cart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      /* ------------------------------ Point Update ------------------------------ */
      .addCase(updatePoint.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updatePoint.fulfilled, (state, action) => {
        state.loading = false;
        state.points = action.payload;
      })
      .addCase(updatePoint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUser, logout } = UserSlice.actions;
export default UserSlice.reducer;
