import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./reducers/counter/counterSlice";

export default configureStore({
  reducer: { counter: counterSlice },
});
