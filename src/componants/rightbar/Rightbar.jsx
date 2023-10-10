import Suggetion from "./Suggetion";
import Reqs from "./Reqs";
import LatestActive from "./LatestActive";

const Rightbar = () => {
  return (
    <aside className="sticky shrink-0 top-16 left-0 p-4 bg-backg h-full hidden lg:flex flex-col gap-3">
      <Suggetion />
      <Reqs />
      <LatestActive />
    </aside>
  );
};
export default Rightbar;
