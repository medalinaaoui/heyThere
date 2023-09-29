const Story = ({ story }) => {
  return (
    <div
      className="relative w-[5.4rem] h-32 "
      style={{ flexShrink: 0 }}
      id="custom-scrollbar"
    >
      <img
        src={story.personPic}
        alt="storyPic"
        className="bg-cover w-[5.4rem] h-32 rounded-md border-[1px] border-blue-500"
      />
      <span className="text-sm absolute bottom-0 left-2 text-white ">
        {story.personName}
      </span>
    </div>
  );
};
export default Story;
