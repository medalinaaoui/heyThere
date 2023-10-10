import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import postsSlice from "./features/posts/postsSlice";

const store = configureStore({
  reducer: {
    auth: userSlice,
    posts: postsSlice,
  },
});

export default store;
