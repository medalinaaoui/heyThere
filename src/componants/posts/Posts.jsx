import { useSelector } from "react-redux";
import { selectPosts } from "../../features/posts/postsSlice";
import Post from "./Post";
const Posts = () => {
  const posts = useSelector(selectPosts);

  return (
    <section>
      <div>
        {posts.map((p, i) => (
          <Post post={p} key={i} />
        ))}
      </div>
    </section>
  );
};
export default Posts;
