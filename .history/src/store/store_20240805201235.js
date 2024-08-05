import counterSlice from "@/reducers/counter/counterSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: { counter: counterSlice },
});
