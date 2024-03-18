/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

interface UserPayload {
  email: string;
  password: string;
}

const useLoginMutation = () => {
  const handleLogin = async (loginDetails: UserPayload) => {
    try {
      const { data } = await axiosInstance.post<UserPayload>(
        "/login",
        loginDetails
      );
      return data;
    } catch (err: any) {
      return err?.response?.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleLogin,
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export default useLoginMutation;
