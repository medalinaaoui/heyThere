import { createSlice } from "@reduxjs/toolkit";
import pic1 from "../../assets/al pacino.png";
import pic2 from "../../assets/Caché.png";
import pic3 from "../../assets/daniel night lewis.png";
import pic4 from "../../assets/sons of anarchy 1.jpg";
import pic5 from "../../assets/photo (2).jpg";
import profileP from "../../assets/photo_2023-09-25_20-04-30.jpg";
import { formatDistanceToNow } from "date-fns";

const specificDate = new Date("2023-09-25T08:00:00");
const timeDifference = formatDistanceToNow(specificDate, { addSuffix: true });
const initialState = [
  {
    id: 1,
    userId: 1,
    user: "Med ali",
    userPro: profileP,
    content: "i dn dzwhat t o eawaddad",
    pic: pic1,
    timeDifference,
    likes: 22,
    commontsN: 0,
    comments: ["awesome", "nice", "cool"],
  },
  {
    id: 2,
    userId: 1,
    user: "Med ali",
    userPro: profileP,
    content: "ye di want to writz something asle",
    pic: pic4,
    timeDifference,
    likes: 44,
    commontsN: 3,
    comments: ["awesome", "nice", "cool"],
  },
  {
    id: 3,
    userId: 1,
    user: "Med ali",
    userPro: profileP,
    content:
      "ccaaaaaaaaaaepiocnaklaz pzoaeiipaozeip aezpoae poeazepoi poazei e  eoaiep ape paepaieoa irao azeuâu",
    pic: pic3,
    timeDifference,
    likes: 22,
    commontsN: 0,
    comments: ["awesome", "nice", "cool"],
  },
  {
    id: 1,
    userId: 1,
    user: "Med ali",
    userPro: profileP,
    content: "i dn dzwhat t o eawaddad",
    pic: pic5,
    timeDifference,
    likes: 22,
    commontsN: 0,
    comments: ["awesome", "nice", "cool"],
  },
  {
    id: 1,
    userId: 1,
    user: "Med ali",
    userPro: profileP,
    content: "i dn dzwhat t o eawaddad",
    pic: pic2,
    timeDifference,
    likes: 22,
    commontsN: 4,
    comments: ["awesome", "nice", "cool"],
  },
];
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action) {
      return [...state, action.payload];
    },
    addComment(state, action) {
      const [postId, comment] = action.payload;

      // Create a new state array with the comment added to the correct post
      return state.map((post) => {
        if (post.id === postId) {
          // Create a new post object with the updated comments array
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      });
    },
  },
});

export default postsSlice.reducer;
export const selectPosts = (state) => state.posts;
export const { addPost, addComment } = postsSlice.actions;
