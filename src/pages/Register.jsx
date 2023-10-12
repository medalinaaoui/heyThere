import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../features/user/userSlice";
import { useRef, useState, useEffect } from "react";
import {
  FULLNAME_REGEX,
  USERNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../config/varsConfig";
import axios from "../features/user/axios";
import { BiError } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { BsFillCheckCircleFill } from "react-icons/bs";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [userFullName, setUserFullName] = useState("");
  const [validFullName, setValidFullName] = useState(false);
  const [userFullNameFocus, setUserFullNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USERNAME_REGEX.test(user));
  }, [user]);
  useEffect(() => {
    setValidFullName(FULLNAME_REGEX.test(userFullName));
  }, [userFullName]);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [user, userFullName, email, password, matchPassword]);

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    const v1 = FULLNAME_REGEX.test(userFullName);
    const v2 = USERNAME_REGEX.test(user);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post("/register", {
        name: userFullName,
        username: user.toLowerCase(),
        email,
        password,
      });
      dispatch(
        register({
          accessToken: response.data.access_token,
          userData: response.data.userData,
        })
      );

      setSuccess(true);
      navigate("/");
      setUser("");
      setUserFullName("");
      setEmail("");
      setPassword("");
      setMatchPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 402) {
        setErrMsg("Please fill in the info");
      } else if (err.response?.status === 403) {
        setErrMsg("Username already exits try another one");
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
      <div className="flex text-textc h-[78%] gap-16  bg-backg px-12 py-12 rounded-2xl bg-image-center">
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
            <button className="duration-500 w-fit px-12 border-none text-sm py-1 font-semibold rounded-md  bg-accentc text-secondarybg hover:text-accentc hover:bg-secondarybg">
              Login
            </button>
          </Link>
        </div>
        <div className="flex flex-col justify-center sm:py-20 h-full sm:w-1/2 mt-3  ">
          <h2 className="text-4xl font-bold mb-4">Register</h2>
          <form
            onSubmit={handleSubmit}
            className=" flex-1 flex gap-6 flex-col justify-center"
          >
            <div className="relative">
              <label htmlFor="fullname">
                <span
                  className={
                    validFullName
                      ? "flex absolute right-2 md:right-16 bottom-[0.61rem] border-green-500 text-green-500"
                      : " hidden"
                  }
                >
                  <BsFillCheckCircleFill />
                </span>
                <span
                  className={
                    validFullName || !userFullName
                      ? "hidden"
                      : "flex absolute right-2 md:right-16 bottom-[0.61rem] border-red-500 text-red-500"
                  }
                >
                  <GiCancel />
                </span>
              </label>
              <input
                type="text"
                id="fullname"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUserFullName(e.target.value)}
                value={userFullName}
                required
                aria-invalid={validFullName ? "false" : "true"}
                aria-describedby="ufidnote"
                onFocus={() => setUserFullNameFocus(true)}
                onBlur={() => setUserFullNameFocus(false)}
                placeholder="Full Name"
                className=" outline-none bg-inherit border-b-[1px] sm:placeholder-slate-400 text-white placeholder-[#ffffffda]"
              />
              <p
                id="ufidnote"
                className={
                  !userFullNameFocus && userFullName && !validFullName
                    ? "hidden xl:flex text-xs font-light text-white absolute top-9"
                    : "hidden"
                }
              >
                Please enter a valid full name. It should consist of letters,
                hyphens, and apostrophes only.
              </p>
            </div>

            <div className="relative">
              <label htmlFor="usename">
                <span
                  className={
                    validName
                      ? "flex absolute right-2 md:right-16 bottom-[0.61rem] border-green-500 text-green-500"
                      : " hidden"
                  }
                >
                  <BsFillCheckCircleFill />
                </span>
                <span
                  className={
                    validName || !user
                      ? "hidden"
                      : "flex absolute right-2 md:right-16 bottom-[0.61rem] border-red-500 text-red-500"
                  }
                >
                  <GiCancel />
                </span>
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  name="username"
                  placeholder="Username"
                  className=" outline-none bg-inherit text-white border-b-[1px] sm:placeholder-slate-400 placeholder-[#ffffffda]"
                />
              </label>
              <p
                id="uidnote"
                className={
                  !userFocus && user && !validName
                    ? "hidden xl:flex text-xs font-light text-white absolute top-9"
                    : "hidden"
                }
              >
                It should consist of letters, numbers, periods, and underscores
                only.
              </p>
            </div>

            <div className=" relative">
              <label htmlFor="email">
                <span
                  className={
                    validEmail
                      ? "flex absolute right-2 md:right-16 bottom-[0.61rem] border-green-500 text-green-500"
                      : " hidden"
                  }
                >
                  <BsFillCheckCircleFill />
                </span>
                <span
                  className={
                    validEmail || !email
                      ? "hidden"
                      : "flex absolute right-2 md:right-16 bottom-[0.61rem] border-red-500 text-red-500"
                  }
                >
                  <GiCancel />
                </span>
                <input
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  id="email"
                  type="email"
                  placeholder="Email"
                  className=" outline-none bg-inherit text-white border-b-[1px] sm:placeholder-slate-400 placeholder-[#ffffffda]"
                />
              </label>
              <p
                id="emailnote"
                className={
                  !emailFocus && email && !validEmail
                    ? "hidden xl:flex text-xs font-light text-white absolute top-9"
                    : "hidden"
                }
              >
                It should be in the format user@example.com
              </p>
            </div>

            <div className=" relative">
              <label htmlFor="password">
                <span
                  className={
                    validPassword
                      ? "flex absolute right-2 md:right-16 bottom-[0.61rem] border-green-500 text-green-500"
                      : " hidden"
                  }
                >
                  <BsFillCheckCircleFill />
                </span>
                <span
                  className={
                    validPassword || !password
                      ? "hidden"
                      : "flex absolute right-2 md:right-16 bottom-[0.61rem] border-red-500 text-red-500"
                  }
                >
                  <GiCancel />
                </span>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="passwordnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  name="password"
                  placeholder="Password"
                  className=" outline-none bg-inherit text-white border-b-[1px] sm:placeholder-slate-400 placeholder-[#ffffffda]"
                />
              </label>

              <p
                id="passwordnote"
                className={
                  !passwordFocus && password && !validPassword
                    ? "hidden xl:flex text-xs font-light text-white absolute top-9"
                    : "hidden"
                }
              >
                8 to 24 characters long & include
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>

            <div className=" relative">
              <label htmlFor="confirm_password">
                <span
                  className={
                    validMatch && matchPassword
                      ? "flex absolute right-2 md:right-16 bottom-[0.61rem] border-green-500 text-green-500"
                      : " hidden"
                  }
                >
                  <BsFillCheckCircleFill />
                </span>
                <span
                  className={
                    validMatch || !matchPassword
                      ? "hidden"
                      : "flex absolute right-2 md:right-16 bottom-[0.61rem] border-red-500 text-red-500"
                  }
                >
                  <GiCancel />
                </span>
                <input
                  type="password"
                  id="confirm_password"
                  placeholder="Repeat your password"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  value={matchPassword}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="outline-none bg-inherit text-white border-b-[1px] sm:placeholder-slate-400 placeholder-[#ffffffda]"
                />
              </label>
              <p
                id="confirmnote"
                className={
                  !matchFocus && matchPassword && !validMatch
                    ? " hidden xl:flex text-xs font-light text-white absolute top-9"
                    : "hidden"
                }
              >
                Must match the first password input field.
              </p>
            </div>

            <button
              type="submit"
              disabled={
                !validName ||
                !validFullName ||
                !validEmail ||
                !validPassword ||
                !validMatch
                  ? true
                  : false
              }
              className="duration-500 w-fit px-12 border-none text-sm py-1 font-semibold rounded-md  bg-accentc text-secondarybg hover:text-accentc hover:bg-secondarybg"
            >
              Submit
            </button>
          </form>
          <div
            className={errMsg ? "pt-4 flex items-center gap-1" : "invisible"}
          >
            <BiError className=" text-sm text-red-200" />
            <p
              ref={errRef}
              className={"text-red-200 text-sm whitespace-nowrap 	"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
