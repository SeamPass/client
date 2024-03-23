/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDisable2StepMutation = () => {
  const handleGet2Step = async () => {
    try {
      const { data } = await axiosInstance.post("/disable2Step");
      return data;
    } catch (err: any) {
      return err?.response?.data ?? "Something went wrong";
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleGet2Step,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useDisable2StepMutation;
