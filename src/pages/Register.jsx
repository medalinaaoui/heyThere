import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../features/user/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
    console.log("formated data: ", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex justify-center items-center h-screen sm:px-80 login-page ">
      <div className="flex text-textc h-[67%] gap-16  bg-backg px-12 py-12 rounded-2xl bg-image-center">
        <div className="hidden sm:flex flex-col justify-around w-1/2">
          <h1 className="text-6xl font-bold">
            Hey <br /> There!!!
          </h1>
          <p style={{ fontWeight: 500 }} className=" text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. corrupti
            velit consequuntur dolorum omnis ea!
          </p>
          <Link to="/login">
            <span
              style={{ fontWeight: 500 }}
              className="hover:text-accentc duration-500 cursor-pointer text-base"
            >
              You already have account?
            </span>
          </Link>
          <Link to="/login">
            <button className="duration-500 w-fit px-12 border-none btn btn-sm bg-accentc text-secondarybg hover:text-accentc hover:bg-secondarybg">
              Login
            </button>
          </Link>
        </div>
        <div className="flex flex-col justify-center sm:py-20 h-full sm:w-1/2 mt-3  ">
          <h2 className="text-4xl font-bold mb-4">Register</h2>
          <form
            action="/login"
            method="post"
            onSubmit={handleSubmit}
            className=" flex-1 flex gap-6 flex-col justify-center"
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className=" outline-none bg-inherit border-b-[1px] sm:placeholder-slate-400 placeholder-[#ffffffda]"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className=" outline-none bg-inherit border-b-[1px] sm:placeholder-slate-400 placeholder-[#ffffffda]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className=" outline-none bg-inherit border-b-[1px] sm:placeholder-slate-400 placeholder-[#ffffffda]"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className=" outline-none bg-inherit border-b-[1px] sm:placeholder-slate-400 placeholder-[#ffffffda]"
            />
            <button
              type="submit"
              className=" duration-500 border-none w-fit px-12 btn btn-sm bg-accentc text-secondarybg hover:text-accentc hover:bg-secondarybg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
