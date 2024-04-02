/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/config/axios";

export interface IDeleteMultiplePasswordProps {
  passwordIds: string[];
}

const useDeleteMultiplePasswordMutation = () => {
  const handleDeleteMultiplePassword = async ({
    passwordIds,
  }: IDeleteMultiplePasswordProps) => {
    try {
      const { data } = await axiosInstance.delete<IDeleteMultiplePasswordProps>(
        "/delete-passwords",
        { data: { passwordIds } }
      );
      return data;
    } catch (err: any) {
      toast(err?.response?.data?.message ?? "Something went wrong");
      return err.response.data ?? "Something went wrong";
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleDeleteMultiplePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["password"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useDeleteMultiplePasswordMutation;
