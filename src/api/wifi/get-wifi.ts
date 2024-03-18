/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface IGetWifiProps {
  id: string;
  wifiName: string;
  note: { encWifiPassword: string; iv: string };
  createdAt: string;
  updatedAt: string;
}
export interface IGetWifi {
  data: IGetWifiProps[];
}

const useGetWifiQuery = (pageCount: number) => {
  const handleGetWifi = async () => {
    try {
      const { data } = await axiosInstance.get<IGetWifi>(
        `/get-wifi?page=${pageCount}`
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const query = useQuery({
    queryFn: handleGetWifi,
    queryKey: ["wifi", pageCount],
  });

  return query;
};

export default useGetWifiQuery;
