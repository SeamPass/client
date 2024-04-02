/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "@/config/axios";

const useWifiDeleteMutation = () => {
  const handleDeleteWifi = async (id: string | undefined) => {
    try {
      const { data } = await axiosInstance.delete("delete-wifi/" + id);
      return data;
    } catch (err: any) {
      toast(err?.response?.data?.message ?? "Something went wrong");
      return err.response.data ?? "Something went wrong";
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleDeleteWifi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wifi"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useWifiDeleteMutation;
