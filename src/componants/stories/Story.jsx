import { useState } from "react";

const Story = ({ story }) => {
  const [isViewed, setIsViewed] = useState(false);

  const handleStoryClick = () => {
    setIsViewed(true);
  };

  return (
    <div
      className="relative flex flex-col items-center"
      onClick={handleStoryClick}
    >
      <div
        class={
          isViewed
            ? "w-[4.4rem] h-[4.4rem] border-2 border-rose-300 rounded-full"
            : "w-[4.4rem] h-[4.4rem] border-2  rounded-full border-blue-500"
        }
      ></div>

      <div
        className="w-16 h-16 rounded-full overflow-hidden absolute inset-[0.2rem] "
        style={{ flexShrink: 0 }}
        id="custom-scrollbar"
      >
        <img
          src={`../../public/upload/${story.profilePic}`}
          alt="storyPic"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-sm  text-white ">{story.username}</span>
    </div>
  );
};
export default Story;
