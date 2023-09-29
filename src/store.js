import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import postsSlice from "./features/posts/postsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice,
  },
});

export default store;
