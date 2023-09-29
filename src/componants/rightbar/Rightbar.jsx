import Suggetion from "./Suggetion";
import Reqs from "./Reqs";
import LatestActive from "./LatestActive";

const Rightbar = () => {
  return (
    <aside className="sticky shrink-0  top-16 left-0 p-4 bg-backg h-full hidden md:flex flex-col gap-3">
      <Reqs />
      <Suggetion />
      <LatestActive />
    </aside>
  );
};
export default Rightbar;
