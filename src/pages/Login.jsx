import { Link, useNavigate } from "react-router-dom";
import axios from "../features/user/axios";
import { USERNAME_REGEX, PASSWORD_REGEX } from "../config/varsConfig";
import { useEffect, useRef, useState } from "react";
import { login } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { BiError } from "react-icons/bi";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validInput, setValidInput] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const validUsername = USERNAME_REGEX.test(username);
  useEffect(() => {
    if (!username || !password) {
      setValidInput(false);
    } else if (validUsername) {
      setValidInput(true);
    }
  }, [username, password]);
  useEffect(() => {
    userRef.current.focus();
  }, []);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { username, password });
      dispatch(
        login({
          accessToken: response.data.access_token,
          userData: response.data.userData,
        })
      );
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 402) {
        setErrMsg("user not found");
      } else if (err.response?.status === 403) {
        setErrMsg("Wrong Password");
      } else if (err.response.data.error.errno === 1062) {
        setErrMsg("email already exits, you can login in instead");
      } else {
        console.log("err from register try catch", err);
      }
      errRef.current.focus();
    }
  };

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
            <button className="duration-500 w-fit px-12 border-none text-sm py-1 font-semibold rounded-md  bg-accentc text-secondarybg hover:text-accentc hover:bg-secondarybg">
              Register
            </button>
          </Link>
        </div>
        <div className="flex flex-col justify-center sm:py-20 h-full sm:w-1/2">
          <h2 className="text-4xl font-bold mb-4">Login</h2>
          <form
            onSubmit={handleSubmit}
            className=" flex-1 flex gap-8 flex-col justify-center"
          >
            <input
              type="text"
              name="username"
              ref={userRef}
              value={username}
              onChange={handleUsernameChange}
              placeholder="username"
              className=" outline-none bg-inherit border-b-[1px]"
              autocomplete="off"
            ></input>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="********"
              className=" outline-none bg-inherit border-b-[1px]"
            />

            <div className="flex flex-col gap-1">
              <button
                type="submit"
                disabled={!validInput}
                className="duration-500 w-fit px-12 border-none text-sm py-1 font-semibold rounded-md  bg-accentc text-secondarybg hover:text-accentc hover:bg-secondarybg"
              >
                Submit
              </button>
              <span className=" hover:animate-pulse cursor-pointer text-sm">
                Forgot Password?
              </span>
            </div>
            <div
              className={errMsg ? "pt-4 flex items-center gap-1" : "invisible"}
            >
              <BiError className=" text-sm text-red-200" />
              <p
                // ref={errRef}
                className={"text-red-200 text-sm whitespace-nowrap 	"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
