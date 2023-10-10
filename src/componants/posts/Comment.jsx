import { formatDistance, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import emptyPp from "../../assets/emptyPp.jpg";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
import { useState } from "react";
import toast from "react-hot-toast";
import { SlOptions } from "react-icons/sl";

const Comment = ({ comment, fetchComments }) => {
  const userComments = useSelector((state) => state.auth.user.comments);
  const user_id = useSelector((state) => state.auth.user.id);
  const profilePic = comment.profilePic || emptyPp;
  const dbDate = parseISO(comment.created_at);
  const timeAgo = formatDistance(dbDate, new Date(), {
    addSuffix: true,
  });
  const userCommentIds = userComments?.split(",").map(Number) || [];
  const hasAccess = Boolean(
    userCommentIds.find((p) => p === comment.commentId)
  );
  const [showOptions, setShowOptions] = useState(false);
  const privateAxios = useAxiosPrivate();

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const deleteComment = async () => {
    try {
      const req = await privateAxios.delete("/addComment", {
        data: { user_id, comment_id: comment.commentId },
      });
      setShowOptions(!showOptions);
      toast.success("Comment deleted successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      fetchComments();
      console.log("delete post delete: ", req.data);
    } catch (error) {
      console.error("Error delete Comment Comment", error);
      toast.error("Could not delete the comment", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  return (
    <div className="flex justify-between">
      <div className="flex gap-6 items-start">
        <img
          src={profilePic}
          alt="profilepic"
          className=" w-8 aspect-square rounded-full"
        />
        <div className="w-full">
          <h2 className=" text-sm font-semibold truncate">
            {comment.username}
          </h2>
          <p className="text-sm truncate ">{comment.content}</p>
        </div>
      </div>
      <div className="flex gap-3 items-start">
        <p className="text-sm">{timeAgo}</p>
        <div className=" relative w-fit">
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
                    onClick={deleteComment}
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
    </div>
  );
};
export default Comment;
