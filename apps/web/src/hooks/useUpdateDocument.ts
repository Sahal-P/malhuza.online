import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
// import { useSelectedDocument } from "./useDocuments";
// import { DEFAULT_TITLE } from "@/types/constant";


const useUpdateDocument = (id?: string) => {
  // const { setDocumentTitle } = useSelectedDocument();
  return useMutation({
    mutationKey: [id, 'updateDocTitleIcon'],
    mutationFn: async (document: { id: string; title?: string; icon?: string | null; coverImage?: string | null;  coverImageBlurHash?: string | null; }) => {
      const response = await axios.put("api/docs/", {
        document
      }, );

      return response;
    },
    onSuccess: () => {
      // toast.success("New note created", {duration:1000});
    },
    onError: () => {
      toast.error("Failed to update the note", {duration:1000});
    },
  });
};

export default useUpdateDocument;
