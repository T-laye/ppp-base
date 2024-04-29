import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vouchers: {},
};

const fetchVouchersSlice = createSlice({
  name: "vouchers",
  initialState,
  reducers: {
    fetchVouchers: (state, action) => {
      state.vouchers = action.payload;
    },
  },
});

export const { fetchVouchers } = fetchVouchersSlice.actions;
export default fetchVouchersSlice.reducer;
