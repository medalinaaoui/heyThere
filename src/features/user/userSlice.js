import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register(state, payload) {
      state.push(payload);
    },
  },
});

export default userSlice.reducer;
export const { register } = userSlice.actions;
