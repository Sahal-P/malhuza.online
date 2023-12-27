import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useArchiveRestore = (type: string, setRestored?: any) => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async ({ id, type }: { id: string, type: string, }) => {
      const { data } = await axios.patch("api/docs/", {
        id,
        type,
      });
      return data;
    },
    onMutate: () => {

      toast.loading(`note is ${type === 'Archive' && 'archiv' || type === 'Restore' && 'restor'}ing...`);
    },
    onSuccess: (data) => {
      toast.dismiss();
      setRestored?.(`${data}: ${new Date().toLocaleTimeString()}`)
      toast.success(`note ${type === 'Archive' && 'archiv' || type === 'Restore' && 'restor'}ed`, { duration: 1000 });
      navigate('/documents')
    },
    onError: () => {
      toast.dismiss();
      toast.error(`Failed to ${type === 'Archive' && 'archiv' || type === 'Restore' && 'restor'}e note`, { duration: 1000 });
      navigate('/documents')
    },
  });
};

export default useArchiveRestore;
