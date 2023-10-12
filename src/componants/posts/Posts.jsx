import { useEffect, useState, lazy, Suspense } from "react";
const Post = lazy(() => import("./Post"));
import usePrivateAxios from "../../hooks/usePrivateAxios";
import AddPost from "./AddPost";
const Posts = () => {
  const privateAxios = usePrivateAxios();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      const response = await privateAxios.get("/posts");
      setPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      if (error) console.log("err from posts try catch: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section>
      <AddPost fetchPosts={fetchPosts} />
      {isLoading ? (
        <p>Loading</p>
      ) : posts.length === 0 ? (
        <p>No posts for now</p>
      ) : (
        <div>
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
              <Post fetchPosts={fetchPosts} post={p} />
            </Suspense>
          ))}
        </div>
      )}
    </section>
  );
};
export default Posts;
