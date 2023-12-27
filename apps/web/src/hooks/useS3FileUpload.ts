import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface S3Response {
  presigned_url: string;
}

import { create } from 'zustand'

type CoverImageStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useCoverImage = create<CoverImageStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))



const useS3FileUpload = () => {
  return useMutation<S3Response, AxiosError, { file: File; id: string }>({
    mutationFn: async ({ file, id }: {file: File, id:string}) => {
      // If a file is provided, upload it to S3 first
      const {data: s3} = await axios.get("api/s3/presigned-url", {params: {"file_key": file.name}});
      const axiosWithoutInterceptor = axios.create();
      if (s3.presigned_url) {
        const {status} = await axiosWithoutInterceptor.put(s3.presigned_url, file , {headers: {"Content-Type": "multipart/form-data"}});
          if (status === 200) {
            const image = s3.presigned_url.split('?')[0]
            const {data} = await axios.patch("api/docs/", {type: "CoverImage", id, image});
            console.log('django saved',data);
            
            return data
          }
          
          
      }
      return s3
      
    },
    onSuccess: () => {
      // Handle success
      toast.success("Uploaded successfully", { duration: 1000 });
    },
    onError: (error: AxiosError) => {
        // Custom error handling based on AxiosError
        if (axios.isAxiosError(error)) {
          // Access specific properties of AxiosError, e.g., error.response?.status
          toast.error(`Failed to Upload: ${error.message}`, { duration: 1000 });
        } else {
          // Handle other types of errors
          toast.error("Failed to Upload", { duration: 1000 });
        }
        console.log(error);
        
      },
  });
};

export default useS3FileUpload;
