import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.userData;
      // state.error = action.payload.userData
    },
    login: (state, action) => {
      (state.isAuthenticated = true),
        (state.accessToken = action.payload.accessToken);
      state.user = action.payload.userData;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    refreshAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.userData;
    },
  },
});

export const { register, login, logout, refreshAccessToken } =
  authSlice.actions;

export default authSlice.reducer;
