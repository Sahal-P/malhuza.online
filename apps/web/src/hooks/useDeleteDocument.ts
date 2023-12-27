import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useDeleteDocument = (id?: string) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: [id, 'deleteDocs'],
    mutationFn: async ({ id }: { id: string; }) => {
      const { data } = await axios.delete("api/docs/", {
        params: {id}
      });
      return data;
    },
    onSuccess: () => {
      navigate(`/documents`);
      toast.success("Note deleted", {duration:1000});
    },
    onError: () => {
      toast.error("Failed to deleted note", {duration:1000});
    },
  });
};

export default useDeleteDocument;
