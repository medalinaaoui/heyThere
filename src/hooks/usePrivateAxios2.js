import useRefreshAccessToken from "./useRefreshAccessToken";
import axios2 from "../features/user/axios2";
import { useEffect } from "react";
import store from "../store";

const useAxiosPrivate = () => {
  const state = store.getState();
  const accessToken = state.auth.accessToken;
  const refresh = useRefreshAccessToken();

  useEffect(() => {
    const requestIntercept = axios2.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axios2.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios2(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios2.interceptors.request.eject(requestIntercept);
      axios2.interceptors.response.eject(responseIntercept);
    };
  }, [state, refresh]);

  return axios2;
};

export default useAxiosPrivate;
