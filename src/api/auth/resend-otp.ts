/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

interface UserPayload {
  email: string | null;
}

const useResendOtpMutation = () => {
  const handleResendOtp = async (email: UserPayload) => {
    try {
      const { data } = await axiosInstance.post<UserPayload>(
        "/resend-otp",
        email
      );
      return data;
    } catch (err: any) {
      return err?.response?.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleResendOtp,
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export default useResendOtpMutation;
