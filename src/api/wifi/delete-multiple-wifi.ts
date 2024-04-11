/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/config/axios";

export interface IDeleteMultipleSecretProps {
  wifiIds: string[];
}

const useDeleteMultipleWifiMutation = () => {
  const handleDeleteMultipleWifi = async ({
    wifiIds,
  }: IDeleteMultipleSecretProps) => {
    try {
      const { data } = await axiosInstance.delete<IDeleteMultipleSecretProps>(
        "/delete-wifis",
        { data: { wifiIds } }
      );
      return data;
    } catch (err: any) {
      toast(err?.response?.data?.message ?? "Something went wrong");
      return err.response.data ?? "Something went wrong";
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleDeleteMultipleWifi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wifi"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useDeleteMultipleWifiMutation;
