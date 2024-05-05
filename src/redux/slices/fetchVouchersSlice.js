import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vouchers: {},
  queuedVouchers: {},
  approvedVouchers: {},
  collectedVouchers: {},
};

const fetchVouchersSlice = createSlice({
  name: "vouchers",
  initialState,
  reducers: {
    fetchVouchers: (state, action) => {
      state.vouchers = action.payload;
    },
    fetchQueuedVouchers: (state, action) => {
      state.queuedVouchers = action.payload;
    },
    fetchApprovedVouchers: (state, action) => {
      state.approvedVouchers = action.payload;
    },
    fetchCollectedVouchers: (state, action) => {
      state.collectedVouchers = action.payload;
    },
  },
});

export const {
  fetchVouchers,
  fetchQueuedVouchers,
  fetchApprovedVouchers,
  fetchCollectedVouchers,
} = fetchVouchersSlice.actions;
export default fetchVouchersSlice.reducer;
