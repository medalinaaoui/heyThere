import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../features/posts/postsSlice";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const Post = ({ post }) => {
  const [commentToggle, setCommentToggle] = useState(false);
  useEffect(() => {
    console.log("commentToggle:", commentToggle);
  }, [commentToggle]);
  const handleCommentToggle = () => setCommentToggle(!commentToggle);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      dispatch(addComment([post.id, commentText]));
      setCommentText(""); // Clear the input field
    }
  };
  return (
    <article className="bg-backg m-8 rounded-md">
      <div className="flex justify-between p-2">
        <div className="flex gap-4 items-center">
          <Link to={`/profile/${post.userId}`}>
            <img
              src={post.userPro}
              alt="profilepic"
              className=" w-8 aspect-square rounded-full"
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/profile/${post.userId}`}>
              <h2 className=" text-sm truncate">{post.user}</h2>
            </Link>
            <span className="text-sm truncate">{post.timeDifference}</span>
          </div>
        </div>
        <div>
          <button className="text-xl">...</button>
        </div>
      </div>
      <div className="px-2 pb-1">
        <p>{post.content}</p>
      </div>
      <div className={`${post.pic ? "w-full h-auto" : "hidden"}`}>
        <img
          src={post.pic}
          alt="postpic"
          className=" object-contain h-full w-full"
        />
      </div>
      <div className="flex gap-4 p-2 justify-between">
        <p className="flex gap-2 items-center text-red-500 cursor-pointer">
          <AiFillHeart className="text-2xl" />
          {post.likes}
        </p>
        <p className="flex gap-2 items-center text-white cursor-pointer">
          <AiOutlineComment className="text-2xl" />
          {post.commontsN}
        </p>
      </div>
      <div className=" flex justify-between p-2">
        <button className="flex gap-4 items-center hover:text-red-500">
          <AiFillHeart className="text-2xl" />
          Like
        </button>
        <button
          onClick={handleCommentToggle}
          className="flex gap-4 items-center hover:text-white"
        >
          <AiOutlineComment className="text-2xl" />
          Comment
        </button>
        <button className="flex gap-4 items-center hover:text-blue-500">
          <AiOutlineShareAlt className="text-2xl" />
          Share
        </button>
      </div>
      <div
        className={`${commentToggle ? "p-2 flex flex-col gap-3" : "hidden"}`}
      >
        <div className="flex  justify-between">
          <input
            type="text"
            value={commentText}
            onChange={handleCommentChange}
            className="w-full px-2 rounded-l-sm outline-none"
            placeholder="Write a comment"
          />
          <button
            onClick={handleCommentSubmit}
            className="btn btn-primary btn-sm rounded-r-sm rounded-none"
          >
            Sent
          </button>
        </div>
        {post.comments.map((c, i) => (
          <Comment
            comment={c}
            key={i}
            profile={post.userPro}
            user={post.user}
          />
        ))}
      </div>
    </article>
  );
};
export default Post;
