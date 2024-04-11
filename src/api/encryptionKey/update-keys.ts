/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

export interface IUpdateKeyProps {
  mk: string;
  iv: string;
  newSalt: string;
}

const useUpdateEncryptionKeyMutation = () => {
  const handleUpdateEncryptionKey = async (encryptionData: IUpdateKeyProps) => {
    console.log(encryptionData);
    try {
      const { data } = await axiosInstance.patch<IUpdateKeyProps>(
        `/update-keys`,
        encryptionData
      );

      console.log(data);

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleUpdateEncryptionKey,
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useUpdateEncryptionKeyMutation;
