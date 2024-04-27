import axiosInstance from "./axios";

function refreshAccessToken() {
  const refreshToken = sessionStorage.getItem("refreshToken");
  return new Promise((resolve, reject) => {
    if (!refreshToken) {
      reject("No refresh token available.");
      return;
    }
    axiosInstance
      .post("/refresh-access-token", { refreshToken })
      .then((response) => {
        if (response.data.accessToken) {
          sessionStorage.setItem("accessToken", response.data.accessToken);
          sessionStorage.setItem("refreshToken", response.data.refreshToken);
          const adjustedExpiresIn = response.data.expiresIn - 60;
          sessionStorage.setItem("expiresIn", adjustedExpiresIn.toString());
          resolve(response.data.accessToken);
        } else {
          reject("Failed to refresh token.");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default refreshAccessToken;
