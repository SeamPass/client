/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

export interface IAddProps {
  email: string;
  password: string;
}

const useUnlockAccountMutation = () => {
  const handleUnlockAccount = async (userInfo: IAddProps) => {
    console.log(userInfo);
    try {
      const { data } = await axiosInstance.post<IAddProps>(
        `/unlock-account`,
        userInfo
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleUnlockAccount,
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useUnlockAccountMutation;
