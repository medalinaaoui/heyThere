import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8800/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
