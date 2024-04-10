import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  poc: {},
};

const getPocSlice = createSlice({
  name: "poc",
  initialState,
  reducers: {
    getPoc: (state, action) => {
      state.poc = action.payload;
    },
  },
});

export const { getPoc } = getPocSlice.actions;
export default getPocSlice.reducer;
