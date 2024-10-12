import { combineReducers } from "@reduxjs/toolkit";
import filterReduce from "../actions/filterSlice";
import useReducer from "../actions/UserSlice";
import modalReducer from "../actions/ModalSlice";

const rootReducer = combineReducers({
  filter: filterReduce,
  user: useReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
