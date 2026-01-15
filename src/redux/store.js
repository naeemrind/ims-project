import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from "./courseSlice";
import studentReducer from "./studentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    students: studentReducer,
  },
});

export default store;
