/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/config/axios";

const useSecretDeleteMutation = () => {
  const handleDeleteSecret = async (id: string | undefined) => {
    try {
      const { data } = await axiosInstance.delete("delete-secret/" + id);
      return data;
    } catch (err: any) {
      toast(err?.response?.data?.message ?? "Something went wrong");
      return err.response.data ?? "Something went wrong";
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleDeleteSecret,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secret"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useSecretDeleteMutation;
