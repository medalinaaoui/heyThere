import { leftBarSections } from "../../data";
import LeftbarSection from "./LeftbarSection";

const Leftbar = () => {
  return (
    <aside className="shrink-0  hidden md:flex flex-col gap-8 bg-backg px-8 pt-4 h-full sticky top-16 pb-7">
      {leftBarSections.map((section, i) => (
        <LeftbarSection section={section} key={i} />
      ))}
    </aside>
  );
};
export default Leftbar;
