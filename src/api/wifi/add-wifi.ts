/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

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

  const mutation = useMutation({
    mutationFn: handleAddWifi,
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useAddWifiMutation;
