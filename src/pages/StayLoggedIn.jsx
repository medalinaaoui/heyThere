import { useEffect, useState } from "react";
import useRefreshAccessToken from "../hooks/useRefreshAccessToken";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StayLoggedIn = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshAccessToken();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);

  const verifyRefreshToken = async () => {
    try {
      const req = await refresh();

      if (req.status !== 200 && !accessToken && !user) {
        navigate("/login");
        setIsLoading(false);
      }
    } catch (error) {
      if (error) console.log("error from stayLoggedIn tryCAtch: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    verifyRefreshToken();
    console.log("isLoading: ", isLoading);
    console.log("accessToken: ", accessToken);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading</p> : children}</>;
};
export default StayLoggedIn;
