import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  worker: {},
};

const getWorkerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {
    getWorker: (state, action) => {
      state.worker = action.payload;
    },
  },
});

export const { getWorker } = getWorkerSlice.actions;
export default getWorkerSlice.reducer;
