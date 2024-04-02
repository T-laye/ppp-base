// redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import fetchCustomersReducer from "./slices/fetchCustomersSlice";
import variableReducer from "./slices/variableSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: fetchCustomersReducer,
    variables: variableReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,

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
