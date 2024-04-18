/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface IGetWifiProps {
  id: string;
  wifiName: string;
  wifiPassword: string;
  createdAt: string;
  updatedAt: string;
}
export interface IGetWifi {
  data: IGetWifiProps[];
}

const useGetWifiQuery = (pageCount: number, search: string) => {
  const handleGetWifi = async () => {
    try {
      const { data } = await axiosInstance.get<IGetWifi>(
        `/get-wifi?page=${pageCount}&search=${search}`
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const query = useQuery({
    queryFn: handleGetWifi,
    queryKey: ["wifi", pageCount, search],
  });

  return query;
};

export default useGetWifiQuery;
