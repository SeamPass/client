/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

export interface IChangePasswordProps {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  newSalt: string;
}

const useChangePasswordMutation = () => {
  const handleChangePassword = async (userInfo: IChangePasswordProps) => {
    try {
      const { data } = await axiosInstance.post<IChangePasswordProps>(
        `/change-password`,
        userInfo
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  //   const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleChangePassword,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["user"] });
    // },
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useChangePasswordMutation;
