import { useMutation, useQuery } from "@tanstack/react-query";
// import { useSelectedDocument } from "./useDocuments";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";


export const useContent = ({ document_id, setContent }: { document_id?: string; setContent: Dispatch<SetStateAction<string | undefined>>}) => {
    return useQuery({
      queryKey: [document_id, "get_content"],
      enabled: true,
      queryFn: async () => {
        try {
          const response = await axios.get("http://localhost:4000/content", {params: { document_id }});
          setContent(response.data.content)
          return response

        } catch (error) {
          toast.error('Failed to get content')
          
        }
      },
      refetchOnWindowFocus: false,
    });
  };

export const useUpdateContent = (document_id?: string) => {
    // const { setDocumentTitle } = useSelectedDocument();
    return useMutation({
      mutationKey: [document_id, 'updateContent'],
      mutationFn: async (document: { document_id: string; content?: string }) => {
        const response = await axios.put(`http://localhost:4000/content/`, document);        
        return response;
      },
      onError: (error) => {
        console.log(error);
        
        toast.error("Failed to update content", {duration:1000});
      },
    });
  };
  
export const useCreateContent = (document_id?: string) => {
    // const { setDocumentTitle } = useSelectedDocument();
    return useMutation({
      mutationKey: [document_id, 'createContent'],
      mutationFn: async (document: { document_id: string; content?: string }) => {
        const response = await axios.post(`http://localhost:4000/content/`, {
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