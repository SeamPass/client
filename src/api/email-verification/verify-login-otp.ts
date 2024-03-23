/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

interface OtpPayload {
  verificationCode: string;
  email: string | null;
}

const useVerifyOtpMutation = () => {
  const handleVerifyOtp = async (details: OtpPayload) => {
    try {
      const { data } = await axiosInstance.post<OtpPayload>(
        "/verify-login-code",
        details
      );
      return data;
    } catch (err: any) {
      return err?.response?.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleVerifyOtp,
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export default useVerifyOtpMutation;
