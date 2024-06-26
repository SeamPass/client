/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IAddWifiProps {
  wifiName: string;
  wifiPassword: { encWifiPassword: string; iv: string };
}

const useEditWifiMutation = (id: string) => {
  const handleEditWifi = async (userWifiInfo: IAddWifiProps) => {
    try {
      const { data } = await axiosInstance.put<IAddWifiProps>(
        `/update-wifi/${id}`,
        userWifiInfo
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleEditWifi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wifi"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useEditWifiMutation;
