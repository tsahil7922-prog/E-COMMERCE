//set up the redux store to manage the state in a RAM(app ki memory me)
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // path check karo

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
