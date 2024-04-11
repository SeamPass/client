/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface IGetWifiProps {
  note: {
    encWifiPassword: string;
    iv: string;
  };
  _id: string;
  user: string;
  wifiName: string;
  createdAt: Date;
  updatedAt: Date;
}

const useGetSingleWifiQuery = (id: string) => {
  const handleGetSingleWifi = async () => {
    try {
      const { data } = await axiosInstance.get<IGetWifiProps>(
        `/get-wifi/${id}`
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const query = useQuery({
    queryFn: handleGetSingleWifi,
    queryKey: ["wifi", id],
    enabled: !!id,
  });

  return query;
};

export default useGetSingleWifiQuery;
