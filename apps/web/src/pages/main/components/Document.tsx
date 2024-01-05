import { FC, useEffect, useState } from "react";
// import { useUser } from "./UserProvider";

// import { useParams } from "react-router-dom";
import { useSelectedDocument } from "@/hooks/useDocuments";
import Cover from "./Cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense, lazy } from "react";
// import Editor from "./Editor";
import { useContent, useUpdateContent } from "@/hooks/useContent";
import { useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";


const Toolbar = lazy(() => import("./Toolbar"));
const Editor = lazy(() => import("./Editor"));

interface DocumentProps {}

const ToolBarSkeleton = () => {
  return (
    <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
      <Skeleton className=" mt-6 rounded-md w-[30%] h-6 " />
      <Skeleton className=" mt-6 rounded-md w-[80%] h-6 " />
    </div>
  );
};

export const DocumentSkeleton = () => {
  return (
    <div className="pb-40 p-3">
      <Skeleton className="rounded-md w-full h-[35vh] group bg-muted" />
      <ToolBarSkeleton />
    </div>
  );
};

const Document: FC<DocumentProps> = () => {
  const { document, isLoading } = useSelectedDocument();
  const { documentId } = useParams();
 const [content, setContent] = useState<string | undefined>(undefined)
  const { mutate: updateContent } = useUpdateContent(documentId);
  const { isFetched } = useContent({ document_id: documentId, setContent });

  const updateDebounce = useDebounce(content)

  useEffect(() => {
    if (isFetched) {
      updateContent({document_id: documentId ?? document.id, content})
    }    
  }, [updateDebounce])
  return (
    <>
      {!isLoading ? (
        <div className="pb-40 ">
          <Cover
            url={document?.cover_image}
            blurhash={document?.cover_image_blurhash}
          />
          <div className="md:max-w-3xl lg:max-w-4xl mx-auto ">
            <Suspense fallback={<ToolBarSkeleton />}>
              <Toolbar initial_data={document} />
            </Suspense>
            {isFetched && (
              <Suspense fallback={<ToolBarSkeleton />}>
                <Editor
                onChange={(value: string) => {
                  setContent(value)
                }}
                initialContent={content}
              />
              </Suspense>
              
            )}
          </div>
        </div>
      ) : (
        <DocumentSkeleton />
      )}
    </>
  );
};

export default Document;
