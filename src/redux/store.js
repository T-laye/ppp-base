// redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter"; // You'll define this later

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV === "production"
      ? getDefaultMiddleware()
      : getDefaultMiddleware({
          immutableCheck: false,
        }),
  reducer: {
    counter: counterReducer,
    // Add other reducers here if needed
  },
});

export default store;
