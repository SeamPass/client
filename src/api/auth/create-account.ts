/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";

interface UserPayload {
  email: string;
  nickname: string;
  hashedPassword: string;
  clientSalt: string;
}

const useCreateAccountMutation = () => {
  const handleCreateAccount = async (userDetails: UserPayload) => {
    console.log(userDetails);
    try {
      const { data } = await axiosInstance.post<UserPayload>(
        "/register-user",
        userDetails
      );
      return data;
    } catch (err: any) {
      return err?.response?.data ?? "Something went wrong";
    }
  };

  const mutation = useMutation({
    mutationFn: handleCreateAccount,
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
};

export default useCreateAccountMutation;
