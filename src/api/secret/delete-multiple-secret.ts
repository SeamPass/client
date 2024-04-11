/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/config/axios";

export interface IDeleteMultipleSecretProps {
  secretIds: string[];
}

const useDeleteMultipleSecretMutation = () => {
  const handleDeleteMultipleSecret = async ({
    secretIds,
  }: IDeleteMultipleSecretProps) => {
    try {
      const { data } = await axiosInstance.delete<IDeleteMultipleSecretProps>(
        "/delete-secrets",
        { data: { secretIds } }
      );
      return data;
    } catch (err: any) {
      toast(err?.response?.data?.message ?? "Something went wrong");
      return err.response.data ?? "Something went wrong";
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleDeleteMultipleSecret,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secret"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useDeleteMultipleSecretMutation;
