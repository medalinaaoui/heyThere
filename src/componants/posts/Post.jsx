import { useState, useEffect, lazy, Suspense } from "react";
import { formatDistance, parseISO } from "date-fns";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
const Comment = lazy(() => import("./Comment"));
import emptyPp from "../../assets/emptyPp.jpg";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { SlOptions } from "react-icons/sl";

const Post = ({ fetchPosts, post, fromprofile }) => {
  const user_id = useSelector((state) => state.auth.user.id);
  const userPosts = useSelector((state) => state.auth.user.posts);
  const dbDate = parseISO(post.created_at);
  const timeAgo = formatDistance(dbDate, new Date(), {
    addSuffix: true,
  });
  const [commentToggle, setCommentToggle] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const privateAxios = useAxiosPrivate();
  const [comment, setComment] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const userPostIds = userPosts?.split(",").map(Number) || [];
  const hasAccess = Boolean(userPostIds.find((p) => p === post.postId));

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const profilePic = post.profilePic || emptyPp;

  const fetchComments = async () => {
    try {
      const response = await privateAxios.get(`/comments/${post.postId}`);
      setComments(response.data);
      setIsLoading(false);
    } catch (error) {
      if (error) console.log("from post try catch: ", error);
      setIsLoading(false);
    }
  };

  const addComment = async () => {
    try {
      const request = await privateAxios.post("/addComment", {
        post_id: post.postId,
        user_id,
        content: comment,
      });

      if (request.status === 200) {
        toast(request.data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        fetchPosts();
        fetchComments();
        setComment("");
      }
    } catch (error) {
      if (error) console.log("from 'addComment' post try catch: ", error);
    }
  };

  const handleCommentToggle = () => {
    setCommentToggle(!commentToggle);
  };

  const [liked, setLiked] = useState(false);

  const fetchPostLikers = async () => {
    try {
      const response = await privateAxios.get(`/likes/${user_id}`);
      const likedPosts = await response.data;
      const isLiked = likedPosts.find((p) => p.post_id === post.postId);
      // console.log("from fetchpostLikers post: ", );
      setLiked(Boolean(isLiked));
    } catch (error) {
      if (error) console.log("error from post fetchpostlikers: ", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleLike = async () => {
    try {
      const req = await privateAxios.post("/addLike", {
        user_id,
        post_id: post.postId,
      });

      setLiked(true);
      fetchPostLikers();
      fetchPosts();
    } catch (error) {
      console.error("Error liking the post", error);
    }
  };

  const handleUnlike = async () => {
    try {
      setLiked(false);
      const req = await privateAxios.delete("/addLike", {
        data: { user_id, post_id: post.postId },
      });
      fetchPostLikers();
      fetchPosts();
    } catch (error) {
      console.error("Error unliking the post", error);
    }
  };

  const deletePost = async () => {
    try {
      const req = await privateAxios.delete("/addPost", {
        data: { user_id, post_id: post.postId },
      });
      fetchPosts();
      setShowOptions(!showOptions);
      toast.success("Post deleted successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      console.log("delete post delete: ", req.data);
    } catch (error) {
      console.error("Error unliking the post", error);
      toast.error("Could not delete the post", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    fetchPostLikers();
  }, []);

  return (
    <article
      className={
        fromprofile ? `bg-dark m-8 rounded-md` : `bg-backg m-8 rounded-md`
      }
    >
      <div className="flex justify-between p-2">
        <div className="flex gap-4 items-center">
          <Link to={`/profile/${post.userId}`}>
            <img
              src={`../../public/upload/${profilePic}`}
              alt="profilepic"
              className=" w-8 aspect-square rounded-full"
            />
          </Link>
          <div className="flex flex-col">
            <Link to={`/profile/${post.userId}`}>
              <h2 className=" text-sm truncate">{post.username}</h2>
            </Link>
            <span className="text-sm truncate">{timeAgo}</span>
          </div>
        </div>
        <div className=" relative">
          <button className="text-xl" onClick={toggleOptions}>
            <SlOptions />
          </button>
          {showOptions && (
            <div className="bg-gray text-white p-2 rounded-xl pl-4 pr-8 absolute top-100 right-0 ">
              <ul>
                {hasAccess && (
                  <li className=" cursor-pointer hover:text-accentc">Edit</li>
                )}
                {hasAccess && (
                  <li
                    className=" cursor-pointer hover:text-accentc"
                    onClick={deletePost}
                  >
                    Delete
                  </li>
                )}
                <li className=" cursor-pointer hover:text-accentc">Report</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="px-2 pb-1">
        <p>{post.content}</p>
      </div>
      <div className={`${post.img ? "w-full h-auto" : "hidden"}`}>
        <img
          src={`../../../public/upload/${post.img}`}
          alt="postpic"
          className=" object-contain h-full w-full"
          loading="lazy"
        />
      </div>
      <div className="flex gap-4 p-2 justify-between">
        <p className="flex gap-2 items-center text-red-500 cursor-pointer">
          {/* <AiFillHeart className="text-2xl" /> */}
        </p>
        <p className="flex gap-2 items-center text-white cursor-pointer">
          {/* <AiOutlineComment className="text-2xl" /> */}
        </p>
      </div>
      <div className=" flex justify-between p-2">
        {liked ? (
          <button
            className="flex items-center hover:text-white text-red-500"
            onClick={handleUnlike}
          >
            <AiFillHeart className="text-2xl mr-2 mb-1" />
            <span
              className={
                post.postsLikes === 0 ? " invisible mr-1" : "text-base mr-1"
              }
            >
              {post.postsLikes}
            </span>{" "}
            Like
          </button>
        ) : (
          <button
            className="flex items-center hover:text-red-500"
            onClick={handleLike}
          >
            <AiFillHeart className="text-2xl mr-2 mb-1" />
            <span
              className={
                post.postsLikes === 0 ? " invisible mr-1" : "text-base mr-1"
              }
            >
              {post.postsLikes}
            </span>{" "}
            Like
          </button>
        )}

        <button
          onClick={handleCommentToggle}
          className="flex items-center hover:text-white"
        >
          <AiOutlineComment className="text-2xl mr-2 mb-1" />
          <span
            className={
              post.postsCommentsNumber === 0
                ? "invisible mr-1"
                : "text-base mr-1"
            }
          >
            {post.postsCommentsNumber}
          </span>{" "}
          Comment
        </button>
        <button className="flex gap-4 items-center hover:text-blue-500">
          <AiOutlineShareAlt className="text-2xl" />
          Share
        </button>
      </div>
      {commentToggle && (
        <div className="p-2 flex flex-col gap-3">
          <div className="flex  justify-between">
            <input
              type="text"
              className="w-full px-2 rounded-l-md outline-none"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="px-2 rounded-r-md bg-accentc text-backg hover:bg-thatcolor  duration-300"
              onClick={addComment}
            >
              Sent
            </button>
          </div>
          <Suspense fallback={<p>Loading comments...</p>}>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              comments.map((c, i) => (
                <Comment comment={c} fetchComments={fetchComments} key={i} />
              ))
            )}
          </Suspense>
        </div>
      )}
    </article>
  );
};
export default Post;
