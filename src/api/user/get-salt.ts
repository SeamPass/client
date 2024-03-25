/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

const useGetSaltQuery = (email: string) => {
  console.log(email);
  const handleGetSalt = async () => {
    try {
      const { data } = await axiosInstance.get(`/get-salt/${email}`);

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const query = useQuery({
    queryFn: handleGetSalt,
    queryKey: ["salt", email],
    enabled: !!email,
  });

  return query;
};

export default useGetSaltQuery;
