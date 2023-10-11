import { lazy, Suspense } from "react";
import "./index.css";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import StayLoggedIn from "./pages/StayLoggedIn";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "./hooks/usePrivateAxios";
import { logout } from "./features/user/userSlice";
import { useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
const Navbar = lazy(() => import("./componants/navbar/Navbar"));
const Leftbar = lazy(() => import("./componants/leftbar/Leftbar"));
const Rightbar = lazy(() => import("./componants/rightbar/Rightbar"));
const UserSettings = lazy(() => import("./pages/UserSettings"));
const Profile = lazy(() => import("./pages/Profile"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const LogoutCheck = lazy(() => import("./pages/LogoutCheck"));

function App() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const privateAxios = useAxiosPrivate();

  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showLogoutCheck, setShowLogoutCheck] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await privateAxios.get("/logout");
      dispatch(logout());
      setConfirm(true);
    } catch (error) {
      console.log("error from app handleLogout: ", error);
    }
  };

  const Layout = () => {
    return (
      <div className=" bg-home flex flex-col ">
        <Navbar setShowLogoutCheck={setShowLogoutCheck} confirm={confirm} />
        <div className="flex justify-between">
          <Leftbar />
          <Outlet />
          <Rightbar />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <StayLoggedIn>
          <Suspense fallback={<div> Loading... </div>}>
            <Layout />
          </Suspense>
        </StayLoggedIn>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<div> Loading... </div>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<div> Loading... </div>}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "/settings/user/:id",
      element: (
        <StayLoggedIn>
          <Suspense fallback={<div> Loading... </div>}>
            <UserSettings />
          </Suspense>
        </StayLoggedIn>
      ),
    },
  ]);

  return (
    <div className="font-roboto h-full text-thatcolor">
      <Toaster />

      <RouterProvider router={router} />

      {showLogoutCheck && (
        <Suspense fallback={<>Loading...</>}>
          <LogoutCheck
            onConfirm={handleLogout}
            onCancel={() => setShowLogoutCheck(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
export default App;
