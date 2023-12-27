import useDocuments, { useSelectedDocument } from "@/hooks/useDocuments";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { SidebarDocument } from "@/types/document";
import useCreateDocument from "@/hooks/useCreateDocument";
import useDocumentArchive from "@/hooks/useArchiveRestore";
import { useUser } from "./UserProvider";
import { ARCHIVE, DEFAULT_TITLE, SIDEBAR } from "@/types/constant";

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: object[];
}

const DocumentList: FC<DocumentListProps> = ({
  data,
  parentDocumentId,
  level = 0,
}) => {
  const navigate = useNavigate();
  const { documentId } = useParams();
  const {restored} = useUser()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };
  const {titleRenamed} = useSelectedDocument()
  const {
    data: documents,
    isLoading,
    refetch,
  } = useDocuments<SidebarDocument>({parentDocument_id: parentDocumentId , level: level, filter_type: SIDEBAR });
  const onRedirect = (documentId: string) => {
    navigate(`/documents/${documentId}`);
  };

  const { data: CreatedData, mutate: createDocumentMutate } = useCreateDocument(parentDocumentId);  
  const { data: ArchivedData, mutate: documentArchiveMutate } = useDocumentArchive(ARCHIVE)

  const onCreate = (id: string) => {
    if (!id) return;
    createDocumentMutate({ title: DEFAULT_TITLE, parentDocument_id: id });
    if (!expanded[id]) {
      onExpand(id);
    }
  };
  const onArchive = (id: string) => {
    if (!id) return;
    documentArchiveMutate({ id, type: ARCHIVE });
  };

  useEffect(() => {
    refetch();    
  }, [data, ArchivedData, restored, titleRenamed]);

  if (isLoading) {
    return (
      <>
        <Item.Skeleton level={level} />
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }
  return (
    <>
      <p
        style={{ paddingLeft: level ? `${40}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages Inside
      </p>
      {documents?.map((document) => (
        <div
          key={document.id}
          style={{ paddingLeft: level ? `20px` : undefined }}
        >
          <Item
            key={document.id}
            id={document.id}
            onClick={() => onRedirect(document.id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={documentId === document.id}
            onExpand={() => onExpand(document.id)}
            expanded={expanded[document.id]}
            onCreate={onCreate}
            onArchive={onArchive}
          />
          {expanded[document.id] && (
            <>
              <DocumentList
                key={document.id}
                parentDocumentId={document.id}
                level={level + 1}
                data={CreatedData}
              />
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;