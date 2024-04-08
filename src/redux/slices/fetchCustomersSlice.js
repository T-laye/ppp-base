import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: {},
};

const fetchCustomersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    fetchCustomers: (state, action) => {
      state.customers = action.payload;
    },
  },
});

export const { fetchCustomers } = fetchCustomersSlice.actions;
export default fetchCustomersSlice.reducer;
