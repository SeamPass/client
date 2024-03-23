/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

export interface IGetUserProps {
  _id: string;
  nickname: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  is2StepEnabled: boolean;
}

const useGetUserQuery = () => {
  const handleGetUser = async () => {
    try {
      const { data } = await axiosInstance.get<IGetUserProps>(`/get-user`);

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const query = useQuery({
    queryFn: handleGetUser,
    queryKey: ["user"],
  });

  return query;
};

export default useGetUserQuery;
