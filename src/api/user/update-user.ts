/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IUserProps {
  nickname: string;
}

const useUpdateUserMutation = () => {
  const handleUpdateUser = async (userInfo: IUserProps) => {
    try {
      const { data } = await axiosInstance.patch<IUserProps>(
        `/update-user`,
        userInfo
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleUpdateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useUpdateUserMutation;
