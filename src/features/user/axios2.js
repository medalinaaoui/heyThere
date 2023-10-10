import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8800/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
