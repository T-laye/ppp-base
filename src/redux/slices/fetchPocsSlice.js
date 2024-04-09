import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pocs: {},
};

const fetchPocsSlice = createSlice({
  name: "pocs",
  initialState,
  reducers: {
    fetchPocs: (state, action) => {
      state.pocs = action.payload;
    },
  },
});

export const { fetchPocs } = fetchPocsSlice.actions;
export default fetchPocsSlice.reducer;
