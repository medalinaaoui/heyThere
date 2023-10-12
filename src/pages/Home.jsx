import React, { lazy, Suspense } from "react";

const Posts = lazy(() => import("../componants/posts/Posts"));
const Stories = lazy(() => import("../componants/stories/Stories"));

const Home = () => {
  return (
    <main className="shrink flex-1 ">
      <div className="w-full flex justify-center">
        <div className="stories-div bg-backg m-2 rounded-md w-[70vw] lg:w-[40vw] xl:w-[52vw] ">
          <Suspense fallback={<div>Loading Posts...</div>}>
            <Stories />
          </Suspense>
        </div>
      </div>
      <div className="">
        <Suspense fallback={<div>Loading Posts...</div>}>
          <Posts />
        </Suspense>
      </div>
    </main>
  );
};
export default Home;
