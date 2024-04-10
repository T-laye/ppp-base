import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  take: 10,
  pageNumber: 1,
  search: "",
  productName: "",
  pocName: "",
  staffName: "",
};
const variableSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    handlePageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    handleTake: (state, action) => {
      state.take = action.payload;
    },
    handleSearch: (state, action) => {
      state.search = action.payload;
    },
    handleProductName: (state, action) => {
      state.productName = action.payload;
    },
    handlePocName: (state, action) => {
      state.pocName = action.payload;
    },
    handleStaffName: (state, action) => {
      state.staffName = action.payload;
    },
  },
});

export const { handlePageNumber, handleTake, handleSearch, handleProductName, handlePocName, handleStaffName } =
  variableSlice.actions;
export default variableSlice.reducer;
