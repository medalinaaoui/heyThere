import "./index.css";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Navbar, Leftbar, Rightbar } from "./componants/index";
import { Profile, Home, Login, Register } from "./pages/index";
import store from "./store";
import { Provider } from "react-redux";
function App() {
  // const currUserStatus = true;
  // const ProtectedRoute = ({ element }) => {
  //   if (!currUserStatus) return <Navigate to="/login" />;
  //   return element;
  // };

  const Layout = () => {
    return (
      <div className=" bg-home flex flex-col ">
        <Navbar />
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
      element: <Layout />,
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
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <Provider store={store}>
      <div className="font-roboto h-full">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}
export default App;
