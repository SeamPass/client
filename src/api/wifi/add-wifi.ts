/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IAddWifiProps {
  wifiName: string;
  wifiPassword: { encWifiPassword: string; iv: string };
}

const useAddWifiMutation = () => {
  const handleAddWifi = async (wifiInfo: IAddWifiProps) => {
    try {
      const { data } = await axiosInstance.post<IAddWifiProps>(
        `/add-wifi`,
        wifiInfo
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleAddWifi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wifi"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useAddWifiMutation;
