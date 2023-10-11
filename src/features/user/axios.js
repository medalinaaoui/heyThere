import axios from "axios";

export default axios.create({
  baseURL: "https://hey-there-api-fc5a5cd59152.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
