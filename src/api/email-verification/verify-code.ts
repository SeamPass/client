/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CodePayload {
  verificationCode: string;
}

const useVerifyCodeMutation = () => {
  const handleVerifyCode = async (details: CodePayload) => {
    try {
      const { data } = await axiosInstance.post<CodePayload>(
        "/verify-code",
        details
      );
      return data;
    } catch (err: any) {
      return err?.response?.data ?? "Something went wrong";
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleVerifyCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export default useVerifyCodeMutation;
