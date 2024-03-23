/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

const useEnable2StepMutation = () => {
  const handleGet2Step = async () => {
    try {
      const { data } = await axiosInstance.post("/enable2Step");
      return data;
    } catch (err: any) {
      return err?.response?.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleGet2Step,
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useEnable2StepMutation;
