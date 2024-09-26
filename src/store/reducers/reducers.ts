import { combineReducers } from "@reduxjs/toolkit";
import filterReduce from "../actions/filterSlice";
import useReducer from "../actions/UserSlice";

const rootReducer = combineReducers({
  filter: filterReduce,
  user: useReducer,
});

export default rootReducer;
