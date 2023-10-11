const StoryView = ({ imageUrl, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="absolute inset-0 bg-black opacity-60" />

      <img
        src={`../../public/upload/${imageUrl}`}
        alt="Full Screen Image"
        className="max-h-screen max-w-screen h-auto"
      />
    </div>
  );
};

export default StoryView;
