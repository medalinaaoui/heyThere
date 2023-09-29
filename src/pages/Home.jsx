import Stories from "../componants/stories/Stories";
import Posts from "../componants/posts/Posts";
const Home = () => {
  return (
    <main className="shrink flex-1">
      <div className="stories-div bg-backg m-2 rounded-md">
        <Stories />
      </div>
      <div className="">
        <Posts />
      </div>
    </main>
  );
};
export default Home;
