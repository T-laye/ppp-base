import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {},
};

const fetchProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { fetchProducts } = fetchProductsSlice.actions;
export default fetchProductsSlice.reducer;
