// redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice"; // You'll define this later
import registerReducer from "./slices/registerWorkerSlice"; // You'll define this later
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    login: loginReducer,
    register: registerReducer,
    // Add other reducers here if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
  // middleware: (getDefaultMiddleware) =>
  //   process.env.NODE_ENV === "production"
  //     ? getDefaultMiddleware().concat(apiSlice.middleware)
  //     : getDefaultMiddleware({
  //         immutableCheck: false,
  //       }),
});

export default store;
