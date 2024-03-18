/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface IGetSecretProps {
  id: string;
  title: string;
  note: { encNote: string; iv: string };
  createdAt: string;
  updatedAt: string;
}
export interface IGetSecret {
  data: IGetSecretProps[];
}

const useGetSecretQuery = (pageCount: number) => {
  const handleGetSecret = async () => {
    try {
      const { data } = await axiosInstance.get<IGetSecret>(
        `/get-secret?page=${pageCount}`
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const query = useQuery({
    queryFn: handleGetSecret,
    queryKey: ["secret", pageCount],
  });

  return query;
};

export default useGetSecretQuery;
