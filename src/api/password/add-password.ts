/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

export interface IAddPasswordProps {
  websiteName: string;
  websiteUrl: string;
  username: string;
  password: string;
  usernameIv: string;
  passwordIv: string;
}

const useAddUserPasswordMutation = () => {
  const handleAddUserPassword = async (userPasswordInfo: IAddPasswordProps) => {
    try {
      const { data } = await axiosInstance.post<IAddPasswordProps>(
        `/add-password`,
        userPasswordInfo
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleAddUserPassword,
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useAddUserPasswordMutation;
