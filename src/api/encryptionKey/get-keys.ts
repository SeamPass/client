/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

const useGetKeysQuery = () => {
  const handleKeys = async () => {
    try {
      const { data } = await axiosInstance.get(`/retrieve-keys`);

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const query = useQuery({
    queryFn: handleKeys,
    queryKey: ["keys"],
  });

  return query;
};

export default useGetKeysQuery;
