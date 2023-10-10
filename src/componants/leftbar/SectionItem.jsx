import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SectionItem = ({ item }) => {
  const userId = useSelector((state) => state.auth.user.id);
  return (
    <li className="">
      <Link
        to={`${item.link}/${userId}`}
        className="flex gap-8 items-center group "
      >
        <span>
          {
            <item.icon className=" text-4xl text-accentc group-hover:text-textc" />
          }
        </span>
        <h2 className=" text-base text-accentc group-hover:text-textc">
          {item.head}
        </h2>
      </Link>
    </li>
  );
};
export default SectionItem;
