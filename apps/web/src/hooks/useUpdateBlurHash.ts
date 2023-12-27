import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const useUpdateBlurHash = () => {
  return useMutation({
    mutationFn: async ({ image, id }: { image: File; id: string }) => {

      const formData = new FormData();
      formData.append("image", image);
      formData.append("id", id);

      const { status } = await axios.patch(
        "api/s3/blurhash",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return status;
    },
    onSuccess: () => {
      // Handle success
      toast.success("Updated successfully", { duration: 1000 });
    },
    onError: (error: AxiosError) => {
      // Custom error handling based on AxiosError
      if (axios.isAxiosError(error)) {
        // Access specific properties of AxiosError, e.g., error.response?.status
        toast.error(`Failed to Update: ${error.message}`, { duration: 1000 });
      } else {
        // Handle other types of errors
        toast.error("Failed to Update", { duration: 1000 });
      }
      console.log(error);
    },
  });
};

export default useUpdateBlurHash;
