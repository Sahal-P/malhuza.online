import Spinner from "@/components/common/Spinner";
import { Input } from "@/components/ui/input";
import useDocuments from "@/hooks/useDocuments";
import { Search, Trash, Undo } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FileIcon } from "lucide-react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import useDocumentRestore from "@/hooks/useArchiveRestore";
import useDeleteDocument from "@/hooks/useDeleteDocument";
import { useUser } from "./UserProvider";
import { ArchiveDocument } from "@/types/document";
import { Emoji } from "emoji-picker-react";

interface TrashBoxProps {}

const TrashBox: FC<TrashBoxProps> = () => {
  const navigate = useNavigate();
  const { paramDocumentId } = useParams();
  const { setRestored } = useUser();
  const {
    data: documents,
    isLoading,
    refetch,
  } = useDocuments<ArchiveDocument>({
    filter_type: "Archive",
  });
  const [search, setSearch] = useState<string>("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });
  const { data: restored, mutate: DocumentRestoreMutate } = useDocumentRestore(
    "Restore",
    setRestored
  );
  const { data: deleted, mutate: DocumentRemoveMutate } = useDeleteDocument();

  const onClick = (documentId: string) => {
    navigate(`/documents/${documentId}`);
  };
  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: string
  ) => {
    event.stopPropagation();
    DocumentRestoreMutate({ id: documentId, type: "Restore" });
    if (paramDocumentId === documentId) {
      // navigate(`/documents`);
    }
  };
  const onRemove = (documentId: string) => {
    DocumentRemoveMutate({ id: documentId });
  };
  useEffect(() => {

    refetch();
  }, [deleted, restored]);


  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size={"lg"} />
      </div>
    );
  }
  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document.id}
            role="button"
            onClick={() => onClick(document.id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <div className="flex pl-2">
              {document?.icon ? (
                <p className="h-4 w-4 text-muted-foreground">
                  <Emoji unified={document?.icon} size={16} />
                </p>
              ) : (
                <FileIcon className="h-4 w-4 text-muted-foreground" />
              )}

              <span className="truncate pl-2">{document.title}</span>
            </div>
            <div className="flex items-center">
              <div
                role="button"
                onClick={(e) => onRestore(e, document.id)}
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document.id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
