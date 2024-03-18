/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface IGetPasswordProps {
  id: string;
  websiteName: string;
  url: string;
  username: string;
  password: string;
  compromised: boolean;
  passwordStrength: string;
  lastUsed: string;
}
export interface IGetPasswords {
  data: IGetPasswordProps[];
}

const useGetSinglePasswordQuery = (id: string) => {
  const handleGetSinglePassword = async () => {
    try {
      const { data } = await axiosInstance.get<IGetPasswords>(
        `/get-password/${id}`
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const query = useQuery({
    queryFn: handleGetSinglePassword,
    queryKey: ["password", id],
    enabled: !!id,
  });

  return query;
};

export default useGetSinglePasswordQuery;
