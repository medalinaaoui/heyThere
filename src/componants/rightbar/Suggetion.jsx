import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Suggetion = () => {
  const [isLoading, setIsloading] = useState(true);
  const [users, setUsers] = useState([]);
  const privateAxios = useAxiosPrivate();
  const userId = useSelector((state) => state.auth.user.id);
  const fetchUsers = async () => {
    const ensure = parseInt(userId);
    try {
      const response = await privateAxios.get("/allUsers", {
        params: { userId: ensure, limit: 3 },
      });
      setUsers(response.data.results);
      console.log("response from fetchUsers suggestion: ", response);
      setIsloading(false);
    } catch (error) {
      if (error) console.log("error from suggetion trycatch: ", error);
      setIsloading(false);
    }
  };

  const sentFollow = async (followedId) => {
    try {
      const response = await privateAxios.post("/sentFollow/to", {
        follower_id: userId,
        followed_id: followedId,
      });
      console.log("response from sentFollow suggestion: ", response);
      fetchUsers();
    } catch (error) {
      if (error) console.log("error from sentFollow suggestion: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className=" rounded-md bg-dark py-2 w-80 ">
      <div className="flex justify-between px-4">
        <h1 className="  text-sm font-semibold ">Suggestions</h1>{" "}
        <button className="text-sm hover:text-accentc">See more</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        users.map((e, i) => (
          <div key={i} className="flex justify-between  px-4 py-2">
            <div className="flex gap-6 items-center">
              <Link to={`/profile/${e.id}`}>
                <img
                  src={`../../public/upload/${e.profilePic}`}
                  alt="profilepic"
                  className=" w-8 aspect-square rounded-full"
                />
              </Link>
              <h2 className=" text-sm truncate">{e.full_name}</h2>
            </div>
            <div className="flex gap-6 items-center">
              <button
                onClick={() => sentFollow(e.id)}
                className="bg-blue-500 hover:bg-backg duration-300 px-3 py-[0.15rem] rounded-full text-white text-sm  border-none"
              >
                Follow
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};
export default Suggetion;
