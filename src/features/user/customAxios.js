import axios from "axios";
import apiUrl from "../../config/varsConfig";
import store from "../../store";

const axiosInstance = axios.create({
  baseURL: apiUrl.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let accessToken = null;

axiosInstance.interceptors.request.use(
  (req) => {
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Update the access token when the state changes
store.subscribe(() => {
  const state = store.getState();
  accessToken = state.auth.accessToken;
});

export default axiosInstance;
