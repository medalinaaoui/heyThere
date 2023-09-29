import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen sm:px-80 login-page ">
      <div className="flex text-textc h-2/3 gap-16  bg-backg px-12 py-12 rounded-2xl  bg-image-left">
        <div className="hidden sm:flex flex-col justify-around w-1/2">
          <h1 className="text-6xl font-bold">
            Hey <br /> There!!!
          </h1>
          <p style={{ fontWeight: 500 }} className=" text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. corrupti
            velit consequuntur dolorum omnis ea!
          </p>
          <Link to="/register">
            <span
              style={{ fontWeight: 500 }}
              className="duration-500 hover:text-secondarybg cursor-pointer text-base"
            >
              You don't have an account?
            </span>
          </Link>
          <Link to="/register">
            <button className="duration-500 w-fit px-12 border-none btn btn-sm bg-accentc text-secondarybg hover:text-accentc hover:bg-secondarybg">
              Register
            </button>
          </Link>
        </div>
        <div className="flex flex-col justify-center sm:py-20 h-full sm:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Login</h2>
          <form
            action="/login"
            method="post"
            className=" flex-1 flex gap-8 flex-col justify-center"
          >
            <input
              type="text"
              name="username"
              placeholder="username"
              className=" outline-none bg-inherit border-b-[1px]"
            ></input>
            <input
              type="password"
              name="password"
              placeholder="********"
              className=" outline-none bg-inherit border-b-[1px]"
            />

            <div className="flex flex-col gap-1">
              <button
                type="submit"
                className="duration-500 border-none w-fit px-12 btn btn-sm bg-accentc text-secondarybg hover:text-accentc hover:bg-secondarybg"
              >
                Submit
              </button>
              <span className=" hover:animate-pulse cursor-pointer text-sm">
                Forgot Password?
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
