const Story = ({ story }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div class="w-[4.4rem] h-[4.4rem] border-2 border-blue-500 rounded-full"></div>

      <div
        className="w-16 h-16 rounded-full overflow-hidden absolute inset-[0.2rem] "
        style={{ flexShrink: 0 }}
        id="custom-scrollbar"
      >
        <img
          src={story.personPic}
          alt="storyPic"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-sm  text-white ">{story.personName}</span>
    </div>
  );
};
export default Story;
