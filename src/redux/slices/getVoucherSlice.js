import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  voucher: {},
};

const getVoucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    getVoucher: (state, action) => {
      state.voucher = action.payload;
    },
  },
});

export const { getVoucher } = getVoucherSlice.actions;
export default getVoucherSlice.reducer;
