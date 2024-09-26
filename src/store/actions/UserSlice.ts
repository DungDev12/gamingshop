import { createSlice } from "@reduxjs/toolkit";

interface UserTypes {
  lastName: string;
  role: string;
  email: string;
  logged: boolean;
  avatar: string;
}

const initialState: UserTypes = {
  lastName: "",
  role: "",
  email: "",
  logged: false,
  avatar: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { lastName, role, verify, email, avatarUrl } = action.payload;
      state.lastName = lastName;
      state.role = role;
      state.email = email;
      state.logged = verify;
      state.avatar = avatarUrl;
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
