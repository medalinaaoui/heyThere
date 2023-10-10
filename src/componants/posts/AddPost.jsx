import { useState } from "react";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
import useAxiosPrivate2 from "../../hooks/usePrivateAxios2";
import { useSelector } from "react-redux";
import emptyPp from "../../assets/emptyPp.jpg";
import toast from "react-hot-toast";
import { IoImages } from "react-icons/io5";

const AddPost = ({ fetchPosts }) => {
  const user_id = useSelector((state) => state.auth.user.id);
  const username = useSelector((state) => state.auth.user.username);
  const profilePic =
    useSelector((state) => state.auth.user.profilePic) || emptyPp;

  const [post, setPost] = useState("");
  const [file, setFile] = useState("");
  const privateAxios = useAxiosPrivate();
  const privateAxiosTwo = useAxiosPrivate2();

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await privateAxiosTwo.post("/upload", formData);
      console.log("res from upload: ", res.data);
      return res.data;
    } catch (err) {
      console.log("err from upload addpost: ", err);
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    try {
      const req = await privateAxios.post("/addPost", {
        user_id,
        content: post,
        img: imgUrl,
      });
      console.log("req from addPost: ", req);
      if (req.status === 200) {
        toast(req.data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        fetchPosts();
        setPost("");
        setFile("");
      }
    } catch (error) {
      if (error) console.log("error from addPost trycatch: ", error);
    }
  };

  return (
    <article className="bg-backg m-8 rounded-md py-3">
      <div className="flex justify-between px-2">
        <div className="flex gap-2 items-center">
          <img
            src={`../../public/upload/${profilePic}`}
            alt="profilepic"
            className=" w-8 aspect-square rounded-full"
          />
          <div className="flex flex-col">
            <h2 className=" text-sm truncate">{username}</h2>
          </div>
        </div>
      </div>
      <div className="px-2 p-3 relative">
        <input
          value={post}
          onChange={(event) => {
            setPost(event.target.value);
          }}
          type="text"
          className="  w-full text-sm p-2 rounded-xl"
          placeholder="What's on your mind? "
        />
        <div className="flex items-center justify-center absolute top-16 right-2">
          <label className="">
            <IoImages className="text-2xl text-accentc" />
            <input
              type="file"
              id="file"
              name="file"
              className="sr-only"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </label>
        </div>
      </div>
      <button
        className="btn btn-sm btn-primary px-2 mx-2"
        onClick={handleAddPost}
      >
        Post
      </button>
    </article>
  );
};
export default AddPost;
