const StoryView = ({ imageSrc, onHide }) => (
  <div
    className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-80 z-50"
    onClick={onHide}
  >
    <div className=" h-full px-32">
      <img src={imageSrc} alt="story pic" />
    </div>
  </div>
);
export default StoryView;
