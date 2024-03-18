// redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice"; // You'll define this later
import registerReducer from "./reducers/registerWorkerSlice"; // You'll define this later

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware()
      : getDefaultMiddleware({
          immutableCheck: false,
        }),
  reducer: {
    login: loginReducer,
    register: registerReducer,
    // Add other reducers here if needed
  },
});

export default store;
