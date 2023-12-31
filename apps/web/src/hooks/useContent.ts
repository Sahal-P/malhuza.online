import { useMutation, useQuery } from "@tanstack/react-query";
// import { useSelectedDocument } from "./useDocuments";
import axios from "axios";
import { toast } from "sonner";


export const useContent = ({ document_id }: { document_id?: string; }) => {
    // const { setDocument, setDocumentDefault } = useSelectedDocument();
    return useQuery({
      queryKey: [document_id, "get_content"],
      enabled: true,
      queryFn: async () => {
        try {
          const response = await axios.get("http://localhost:4000/content", {
            params: { document_id },
          });
          // if (response && response.data) {
          // console.log(response.data);
          return response;
          // } else {
          //   throw new Error("Invalid response format");
          // }
        } catch (error) {
          console.error(error, "error");
          throw new Error("Failed to fetch data");
        }
      },
      refetchOnWindowFocus: false,
    });
  };

export const useUpdateContent = (document_id?: string) => {
    // const { setDocumentTitle } = useSelectedDocument();
    return useMutation({
      mutationKey: [document_id, 'updateContent'],
      mutationFn: async (document: { document_id: string; user_id?: string; content?: string }) => {
        const response = await axios.put(`http://localhost:4000/content/${document.document_id}`, {
          document
        }, );
        console.log(response);
        
        return response;
      },
      onSuccess: () => {
        toast.success("content updated", {duration:1000});
      },
      onError: () => {
        toast.error("Failed to update content", {duration:1000});
      },
    });
  };
  
