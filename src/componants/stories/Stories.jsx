import { storiesData } from "../../data";
import Story from "./Story";
import { activeUser } from "../../data";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
import useAxiosPrivate2 from "../../hooks/usePrivateAxios2";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const Stories = () => {
  const privateAxios = useAxiosPrivate();
  const privateAxiosTwo = useAxiosPrivate2();
  const [story, setStory] = useState("");
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user_id = useSelector((state) => state.auth.user.id);

  const fetchStories = async () => {
    try {
      const response = await privateAxios.get("/stories");
      console.log(response.data);
      setStories(response.data);
      setIsLoading(false);
    } catch (error) {
      if (error) console.log("error from Stories try catch: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", story);
      const res = await privateAxiosTwo.post("/upload", formData);
      console.log("res from upload Stories: ", res.data);
      return res.data;
    } catch (err) {
      console.log("err from upload addpost: ", err);
    }
  };

  const handleAddStory = async (e) => {
    e.preventDefault();

    if (!story) {
      toast.error("you have to select a story", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      const imgUrl = await upload();

      try {
        const req = await privateAxios.post("/addStory", {
          user_id,
          img: imgUrl,
        });
        console.log("req from addStory: ", req);
        if (req.status === 200) {
          toast(req.data.message, {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });

          setStory("");
        }
      } catch (error) {
        if (error) console.log("error from addPost trycatch: ", error);
      }
    }
  };

  return (
    <div className="flex p-2 gap-4 overflow-x-auto  w-full scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300">
      <div className="relative flex flex-col items-center">
        <div class="w-[4.4rem] h-[4.4rem] border-2 border-blue-500 rounded-full"></div>
        <div
          className="w-16 h-16 rounded-full overflow-hidden absolute inset-[0.2rem]"
          style={{ flexShrink: 0 }}
        >
          <img
            src={activeUser.personPic}
            alt="activeUserPic"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-sm absolute bottom-4 left-1 text-white ">
          <label htmlFor="fileInput">
            <AiFillPlusCircle className="text-3xl text-blue-500" />
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setStory(e.target.files[0])}
            />
          </label>
        </span>
        <span className="text-sm  text-white ">Your story</span>
        <button onClick={handleAddStory}>Add Story</button>
      </div>
      {isLoading ? (
        <div> Loading...</div>
      ) : (
        <div className="flex gap-1">
          {stories.map((s, i) => (
            <Story story={s} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Stories;
