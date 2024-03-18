import axios from "axios";
import refreshAccessToken from "./refreshToken";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_PUBLIC_API_ENDPOINT}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Content-Language": "en-US",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const timestampInSeconds = Math.floor(new Date().getTime() / 1000);
    const expiresIn = Number(sessionStorage.getItem("expiresIn"));
    const originalRequest = error.config;
    if (timestampInSeconds > expiresIn && error.response.status !== 401) {
      originalRequest._retry = true;
      return refreshAccessToken().then((newToken) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return axios(originalRequest);
      });
    } else {
      // sessionStorage.clear();
      // window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
