import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
};

const getProductSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { getProduct } = getProductSlice.actions;
export default getProductSlice.reducer;
