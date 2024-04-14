/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

interface ResendPayload {
  email: string | any;
}

const useResendVerificationLinkMutation = () => {
  const handleResendLink = async (email: ResendPayload) => {
    try {
      const { data } = await axiosInstance.post<ResendPayload>(
        "/resend-verification-link",
        email
      );
      return data;
    } catch (err: any) {
      return err?.response?.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleResendLink,
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export default useResendVerificationLinkMutation;
