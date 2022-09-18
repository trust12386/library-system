import axios from "axios";
import { baseURL } from "../constants";

const http = axios.create({
  baseURL,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (!token) return config;

    const bearerAuth = `Bearer ${localStorage.getItem("token")}`;

    return {
      ...config,
      headers: {
        Authorization: bearerAuth,
      },
    };
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (response) => {
    if (response.data.retcode !== 0) {
      alert(response.data.message);
    }
    return response.data;
  },
  (err) => {
    if (err.message.includes("401")) {
      window.location.replace("/login");
    }
    return Promise.reject(err);
  }
);

export default http;
