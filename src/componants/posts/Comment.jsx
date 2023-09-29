const Comment = ({ comment, profile, user }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-6 items-start">
        <img
          src={profile}
          alt="profilepic"
          className=" w-8 aspect-square rounded-full"
        />
        <div className="w-full">
          <h2 className=" text-sm font-semibold truncate">{user}</h2>
          <p className="text-sm truncate ">{comment}</p>
        </div>
      </div>
      <div className="">
        <p className="text-sm">2 days ago</p>
      </div>
    </div>
  );
};
export default Comment;
