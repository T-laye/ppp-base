import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: {},
};

const getCustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
});

export const { getCustomer } = getCustomerSlice.actions;
export default getCustomerSlice.reducer;
