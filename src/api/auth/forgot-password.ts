/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";

interface UserPayload {
  email: string;
}

const useForgotPasswordMutation = () => {
  const handleForgotPassword = async (userDetails: UserPayload) => {
    try {
      const { data } = await axiosInstance.post<UserPayload>(
        "/forgot-password/confirm",
        userDetails
      );
      return data;
    } catch (err: any) {
      return err?.response?.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleForgotPassword,
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export default useForgotPasswordMutation;
