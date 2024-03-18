/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

export interface IAddPasswordProps {
  websiteName: string;
  websiteUrl: string;
  username: { encUsername: string; iv: string };
  password: { encPassword: string; iv: string };
}

const useEditPasswordMutation = (id: string) => {
  const handleEditPassword = async (userPasswordInfo: IAddPasswordProps) => {
    console.log(userPasswordInfo);
    try {
      const { data } = await axiosInstance.put<IAddPasswordProps>(
        `/update-password/${id}`,
        userPasswordInfo
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleEditPassword,
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useEditPasswordMutation;
