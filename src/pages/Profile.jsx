import { useParams } from "react-router-dom";
import { platformUsers } from "../data";
const Profile = () => {
  const { id } = useParams();
  const foundUser = platformUsers?.find((user) => user.id === Number(id));
  console.log("founded user: ", foundUser);
  console.log("paramstype: ", typeof id);
  return (
    <main className="p-4 bg-backg mt-3 rounded-md">
      <div className="relative h-96 aspect-video">
        <img
          src={foundUser?.cover}
          alt="cover img"
          className=" object-cover w-full h-full rounded-md"
        />

        <div className="flex items-center gap-4 absolute -bottom-[8.5rem]">
          <div className="h-44 aspect-square rounded-full">
            <img
              src={foundUser?.pic}
              alt="profile pic"
              className=" object-cover w-full h-full rounded-full border-4 border-backg"
            />
          </div>
          <h1 className=" text-4xl font-semibold text-textc">
            {foundUser.name}
          </h1>
        </div>
      </div>
    </main>
  );
};
export default Profile;
