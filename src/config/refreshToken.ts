import axiosInstance from "./axios";

function refreshAccessToken() {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/refresh-access-token")
      .then((response) => {
        if (response.data.accessToken) {
          resolve(response.data.accessToken);
          const adjustedExpiresIn = response.data.expiresIn - 60;
          sessionStorage.setItem("expiresIn", adjustedExpiresIn.toString());
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
