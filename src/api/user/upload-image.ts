/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IUserProps {
  avatar: File;
}

const useUploadImageMutation = () => {
  const handleUploadImage = async ({ avatar }: IUserProps) => {
    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const { data } = await axiosInstance.post<IUserProps>(
        `/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    } catch (err: any) {
      return err.response?.data ?? "Something went wrong";
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleUploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Error during image upload:", error);
    },
  });

  return mutation;
};

export default useUploadImageMutation;
