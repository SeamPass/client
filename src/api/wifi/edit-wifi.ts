/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

export interface IAddWifiProps {
  wifiName: string;
  wifiPassword: { encWifiPassword: string; iv: string };
}

const useEditWifiMutation = (id: string) => {
  const handleEditWifi = async (userWifiInfo: IAddWifiProps) => {
    console.log(userWifiInfo);
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

  const mutation = useMutation({
    mutationFn: handleEditWifi,
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useEditWifiMutation;
