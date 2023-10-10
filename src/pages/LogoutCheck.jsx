const LogoutCheck = ({ onConfirm, onCancel }) => (
  <div
    className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-80 z-50"
    onClick={onCancel}
  >
    <div className="flex flex-col gap-2 px-32 py-8 bg-accentc rounded-3xl text-black">
      <h1 className="text-2xl font-semibold">Do you want to logout?</h1>
      <div className="flex gap-8 text-black justify-center">
        <button
          className="bg-backg  text-white py-1 px-4 rounded-xl"
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          className="bg-backg  text-white py-1 px-4 rounded-xl"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </div>
  </div>
);
export default LogoutCheck;
