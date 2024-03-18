/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";

interface UserPayload {
  password: string;
  repeatPassword: string;
}

const useChangePasswordMutation = () => {
  const handleChangePassword = async (details: UserPayload) => {
    try {
      const { data } = await axiosInstance.post<UserPayload>(
        "/change-password",
        details
      );
      return data;
    } catch (err: any) {
      return err?.response?.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleChangePassword,
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export default useChangePasswordMutation;
