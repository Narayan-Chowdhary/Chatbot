import axios from "axios";
import { base_url } from "../utils/_data/ApiEndPoints";

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BASEURL,
  baseURL: base_url,
});

// Interceptors to include Bearer token from local storage
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("collection_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance?.interceptors?.response?.use(
  function (response) {
    if (response && response?.status == 401) {
      window.localStorage.clear();
      window.location.href = "/";
      return;
    }
    return response;
  },
  function (error) {
    if (error?.response?.status == 401) {
      window.localStorage.clear();
      window.location.href = "/";
      return;
    }
    return Promise.reject(error);
  }
);

export default instance;
