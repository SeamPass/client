/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

export interface IAddSecretProps {
  title: string;
  note: { encNote: string; iv: string };
}

const useAddSecretMutation = () => {
  const handleAddSecret = async (secretInfo: IAddSecretProps) => {
    try {
      const { data } = await axiosInstance.post<IAddSecretProps>(
        `/add-secret`,
        secretInfo
      );

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleAddSecret,
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useAddSecretMutation;
