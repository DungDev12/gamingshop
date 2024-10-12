import { createSlice } from "@reduxjs/toolkit";

export interface ModalTypes {
  type: string;
  loginOpened: boolean;
  categoryOpened: boolean;
}

const initialState: ModalTypes = {
  type: "",
  loginOpened: false,
  categoryOpened: false,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state, action) => {
      state.type = action.payload.type;
      state.loginOpened = true;
    },
    closeLoginModal: (state) => {
      state.loginOpened = false;
    },
    openCategoryModal: (state) => {
      state.categoryOpened = true;
    },
    closeCategoryModal: (state) => {
      state.categoryOpened = false;
    },
    changeType: (state, action) => {
      state.type = action.payload.type;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openCategoryModal,
  closeCategoryModal,
  changeType,
} = ModalSlice.actions;
export default ModalSlice.reducer;
