import { useQuery } from "@tanstack/react-query";
// import { useSelectedDocument } from "./useDocuments";
import axios from "axios";


export const useContent = ({ document_id }: { document_id: string; }) => {
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