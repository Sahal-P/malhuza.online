import { Document } from "@/types/document";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { create } from "zustand";


type SelectedDocument = {
  document: Document;
  isLoading: boolean;
  titleRenamed: string;
  getDocument: () => Document;
  setDocument: (newDocument: Document | undefined) => void;
  setLoading: (loading: boolean) => void;
  setDocumentDefault: () => void;
  setDocumentTitle: (title: string) => void;
  setDocumentCoverImage: (coverImage: string | null) => void;
  setDocumentIcon: (title: string | null) => void;
  setTitleRename: (icon: string) => void;
};

const defaultDocument = {
  id: "",
  title: "",
  user_id: "",
  icon: "",
  parent_document_id: "",
  created_at: "",
  is_archived: false,
  is_published: false,
};

export const useSelectedDocument = create<SelectedDocument>((set, get) => ({
  document: defaultDocument,
  isLoading: false,
  titleRenamed: "",
  getDocument: () => get().document,
  setDocument: (document) => set({ document }),
  setLoading: (isLoading) => set({isLoading}),
  setDocumentDefault: () => set({ document: defaultDocument }),
  setDocumentTitle: (title) =>
    set((state) => ({ document: { ...state?.document, title } })),
  setDocumentCoverImage: (cover_image) =>
    set((state) => ({ document: { ...state.document, cover_image } })),
  setDocumentIcon: (icon) =>
    set((state) => ({ document: { ...state.document, icon } })),
  setTitleRename: (title) => set({ titleRenamed: title }),
}));


const useDocuments = <DocumentType>({
  parent_document_id,
  level,
  filter_type = null,
}: {
  parent_document_id?: string;
  level?: number;
  filter_type?: string | null;
}) => {
  return useQuery({
    queryKey: [parent_document_id, "Documents", level],
    enabled: true,
    queryFn: async () => {
      try {
        const { data } = await axios.get<DocumentType[]>("api/docs/", {
          params: {
            parent_document_id: parent_document_id,
            filter_type: filter_type,
          },
        });
        // if (response && response.data) {
        // console.log(response.data);
        return data;
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

export const useGetDocument = ({
  id,
  filter_type = null,
}: {
  id: string;
  filter_type?: string | null;
}) => {
  const { setDocument, setDocumentDefault } = useSelectedDocument();
  return useQuery({
    queryKey: [id, "get_document"],
    enabled: true,
    queryFn: async () => {
      try {
        setDocumentDefault()
        const { data } = await axios.get<Document>("api/docs/", {
          params: { id, filter_type },
        });
        // if (response && response.data) {
        // console.log(response.data);
        setDocument(data);
        return data;
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

export default useDocuments;
