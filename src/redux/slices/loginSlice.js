import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  pending: false, // Add a new state for pending
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.pending = true;
      state.error = null; // Reset error when login request starts
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.pending = false; // Reset pending state upon success
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.pending = false; // Reset pending state upon failure
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.pending = false; // Reset pending state upon logout
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = loginSlice.actions;
export default loginSlice.reducer;
