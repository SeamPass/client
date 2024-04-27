import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_PUBLIC_API_ENDPOINT}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Content-Language": "en-US",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (config) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const timestampInSeconds = Math.floor(new Date().getTime() / 1000);
    const expiresIn = Number(sessionStorage.getItem("expiresIn"));

    if (
      error.response &&
      error.response.status === 401 &&
      timestampInSeconds > expiresIn
    ) {
      sessionStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
