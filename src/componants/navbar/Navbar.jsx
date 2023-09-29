import { AiFillHome } from "react-icons/ai";
import { FaMoon, FaUserAlt, FaSearch } from "react-icons/fa";
import { BiMessageSquare, BiMenuAltRight } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-8 md:px-16 py-4 border-accentc bg-backg sticky top-0 z-50">
      <div className="flex justify-between md:w-auto w-full gap-6 items-center text-accentc">
        <Link to="/">
          <h1 className="font-lora font-semibold text-base md:text-2xl mr-4">
            Hey There!
          </h1>
        </Link>
        <div className="flex gap-6 items-center text-accentc">
          <Link to="/">
            <AiFillHome className="text-2xl" />
          </Link>
          <FaMoon className="text-xl" />
          <div className=" relative md:flex hidden">
            <FaSearch className="text-xl absolute left-3 top-1" />
            <input
              type="text"
              placeholder="Search"
              className=" placeholder-accentc py-1 outline-none lg:w-96 md:w-40 w-20 rounded-sm pl-12"
            />
          </div>
          <div className="md:hidden flex gap-6">
            <FaSearch className="text-xl " />
            <BiMenuAltRight className="text-2xl" />
          </div>
        </div>
      </div>
      <div className="md:flex hidden gap-6 items-center text-accentc">
        <FaUserAlt className="text-xl" />
        <BiMessageSquare className="text-2xl" />
        <IoIosNotifications className="text-2xl font-bold" />
      </div>
    </nav>
  );
};
export default Navbar;
