/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

export interface IStoreKeyProps {
  userId: string | undefined;
  sgek: string;
  iv: string;
}

const useEncryptionKeyMutation = () => {
  const handleEncryptionKey = async (encryptionData: IStoreKeyProps) => {
    try {
      const { data } = await axiosInstance.post<IStoreKeyProps>(
        `/store-sgek`,
        encryptionData
      );

      console.log(data);

      return data;
    } catch (err: any) {
      return err.response.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleEncryptionKey,
    onError: () => {
      console.log("error");
    },
  });

  return mutation;
};

export default useEncryptionKeyMutation;
