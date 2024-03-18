/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

export interface IAddSecretProps {
  title: string;
  note: { encNote: string; iv: string };
}

const useEditSecretMutation = (id: string) => {
  const handleEditSecret = async (userSecretInfo: IAddSecretProps) => {
    console.log(userSecretInfo);
    try {
      const { data } = await axiosInstance.put<IAddSecretProps>(
        `/update-secret/${id}`,
        userSecretInfo
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleEditSecret,
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useEditSecretMutation;
