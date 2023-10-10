import axios from "../features/user/axios";
import { useDispatch } from "react-redux";
import { refreshAccessToken } from "../features/user/userSlice";

const useRefreshAccessToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await axios.get("refresh/accesstoken");
      dispatch(
        refreshAccessToken({
          accessToken: response.data.access_token,
          userData: response.data.userData,
        })
      );
    } catch (error) {
      if (error) return error;
    }
  };

  return refresh;
};

export default useRefreshAccessToken;
