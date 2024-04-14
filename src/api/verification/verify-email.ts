/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

interface VerifyPayload {
  token: string | any;
}

const useVerifyMutation = () => {
  const handleVerifyEmail = async (token: VerifyPayload) => {
    try {
      const { data } = await axiosInstance.post<VerifyPayload>(
        "/verify",
        token
      );
      return data;
    } catch (err: any) {
      return err?.response?.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleVerifyEmail,
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export default useVerifyMutation;
