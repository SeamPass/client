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
  async (error) => {
    const originalRequest = error.config;

    // If the error is not an authentication error, reject the promise
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // If we're here, it's a 401 error
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const expiresIn = Number(sessionStorage.getItem("expiresIn"));

    // Check if the token has expired and we haven't already retried the request
    if (
      expiresIn &&
      timestampInSeconds > expiresIn &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();

        // Set the new token in the headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        // Update the token in the session storage
        sessionStorage.setItem("accessToken", JSON.stringify(newToken));

        // Retry the original request with the new token
        return axios(originalRequest);
      } catch (tokenRefreshError) {
        // If token refresh also fails, clear session and force login
        sessionStorage.clear();
        window.location.reload();
        return Promise.reject(tokenRefreshError);
      }
    }

    if (error.response.status === 401) {
      sessionStorage.clear();
      window.location.reload();
    }

    // Reject the promise for all other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
