/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

const useLogoutMutation = () => {
  const handleLogout = async () => {
    try {
      const { data } = await axiosInstance.get("/logout"); // Even though it's a GET, consider if POST is more appropriate
      return data;
    } catch (err: any) {
      console.error("Logout failed:", err);
      return err.response?.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleLogout,
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export default useLogoutMutation;
