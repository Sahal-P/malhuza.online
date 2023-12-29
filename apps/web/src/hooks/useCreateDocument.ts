import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useCreateDocument = (id?: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [id, 'createDocs'],
    mutationFn: async ({ title, parent_document_id, }: { title: string; parent_document_id?: string; }) => {
      const { data } = await axios.post("api/docs/", {
        title,
        parent_document_id,
      });
      navigate(`${data.id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("New note created", {duration:1000});
    },
    onError: () => {
      toast.error("Failed to create a new note", {duration:1000});
    },
  });
};

export default useCreateDocument;
