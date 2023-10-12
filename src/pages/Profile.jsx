import { useParams } from "react-router-dom";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { useEffect, useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { BiLinkAlt } from "react-icons/bi";
import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
const Post = lazy(() => import("../componants/posts/Post"));

const Profile = () => {
  const { id } = useParams();
  const theUserId = useSelector((state) => state.auth.user.id);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const privateAxios = usePrivateAxios();
  const fetchUserData = async () => {
    try {
      const response = await privateAxios.get(`/users/${id}`);
      setUser(response.data.userData);
      setIsLoading(false);
    } catch (error) {
      if (error) console.log("error from profile try catch: ", error);
      setIsLoading(false);
    }
  };

  const {
    bio = "",
    coverPic,
    email,
    full_name,
    id: userId,
    location,
    profilePic,
    username,
    website,
    num_posts,
    num_followers,
    num_following,
  } = user;

  const fetchPosts = async () => {
    try {
      const response = await privateAxios.get(`/userPosts/${id}`);
      setPosts(response.data);
      console.log("res fetchPosts from profile: ", response.data);
      setIsLoadingPosts(false);
    } catch (error) {
      if (error) console.log("err from profile try catch: ", error);
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPosts();
      await fetchUserData();
    };
    fetchData();
  }, [id]);

  return (
    <main className="p-4 w-full bg-backg mt-3 rounded-md">
      {isLoading && isLoadingPosts ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="relative w-full aspect-video mb-12 ">
            <img
              src={coverPic}
              alt="cover img"
              className=" object-cover w-full h-full rounded-md"
            />
            <div className="md:w-40 sm:w-36  w-28 aspect-square rounded-full absolute bottom-[-20%]">
              <img
                src={profilePic}
                alt="profile pic"
                className=" object-cover w-full h-full rounded-full border-4 border-backg "
              />
            </div>
          </div>
          <div className="flex items-center gap-4 -bottom-[8.5rem] w-full">
            <div className="flex flex-col justify-center flex-grow sm:gap-1">
              <div className=" pb-6">
                <h1 className="text-xl sm:text-4xl font-semibold text-textc text-center">
                  {full_name}
                </h1>
                <h2 className="text-sm sm:text-xl text-textc text-center">
                  {username}
                </h2>
              </div>

              <div className="w-full flex justify-around items-center px-4 text-thatcolor pb-6">
                <div className=" flex flex-col items-center">
                  <span className=" font-semibold ">{num_posts}</span>
                  <p>Posts</p>
                </div>
                <div className=" flex flex-col items-center">
                  <span className=" font-semibold ">{num_followers}</span>
                  <p>Followers</p>
                </div>
                <div className=" flex flex-col items-center">
                  <span className=" font-semibold ">{num_following}</span>
                  <p>Following</p>
                </div>
              </div>

              <div className="flex justify-around">
                <h3
                  className={
                    location
                      ? "text-accentc flex items-center gap-1 "
                      : "hidden"
                  }
                >
                  <SlLocationPin className="mb-1 text-sm sm:text-xl" />
                  <span className=" italic text-sm sm:text-xl">{location}</span>
                </h3>
                <h4
                  className={
                    website ? "text-accentc flex items-center gap-1 " : "hidden"
                  }
                >
                  <BiLinkAlt className="mb-1 text-sm sm:text-xl" />
                  <span className=" italic text-sm sm:text-xl">{website}</span>
                </h4>
              </div>
              <div className="p-4 px-6">
                <p>{bio}</p>
              </div>
            </div>
          </div>
          {posts?.map((p, i) => (
            <Suspense
              key={i}
              fallback={
                <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mb-6">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-700 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              <Post fetchPosts={fetchPosts} post={p} fromprofile={true} />
            </Suspense>
          ))}
        </>
      )}
    </main>
  );
};
export default Profile;
