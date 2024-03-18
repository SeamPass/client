/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface IGetSecretProps {
  note: {
    encNote: string;
    iv: string;
  };
  _id: string;
  user: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const useGetSingleSecretQuery = (id: string) => {
  const handleGetSingleSecret = async () => {
    try {
      const { data } = await axiosInstance.get<IGetSecretProps>(
        `/get-secret/${id}`
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const query = useQuery({
    queryFn: handleGetSingleSecret,
    queryKey: ["secret", id],
    enabled: !!id,
  });

  return query;
};

export default useGetSingleSecretQuery;
