import { FC } from "react";
// import { useUser } from "./UserProvider";

// import { useParams } from "react-router-dom";
import { useSelectedDocument } from "@/hooks/useDocuments";
import Cover from "./Cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense, lazy } from "react";
import Editor from "./Editor";
import { useContent, useUpdateContent } from "@/hooks/useContent";
import { useParams } from "react-router-dom";

const Toolbar = lazy(() => import("./Toolbar"));

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
  // const { user } = useUser();
  const { document, isLoading } = useSelectedDocument();
  const {documentId} = useParams()
  // const code = `
  //   # Version 1 - Simple implementation
  //   def book_list(request):
  //       books = Book.objects.all()
  //       context = {'books': books}
  //       return render(request, 'book_list.html', context)

  //   # Version 2 - Optimized implementation using select_related()
  //   def book_list(request):
  //       books = Book.objects.select_related('author').all()
  //       context = {'books': books}
  //       return render(request, 'book_list.html', context)

  //   # Version 3 - Optimized implementation using prefetch_related()
  //   def book_list(request):
  //       books = Book.objects.prefetch_related('author').all()
  //       return render(request, 'book_list.html', {'books': books})
  // `
  const { data , isFetched} = useContent({document_id: documentId})
  const {mutate: updateContent} = useUpdateContent(documentId)
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
            {isFetched && <Editor onChange={(value: string) => updateContent({document_id: document.id, user_id: document.user_id, content: value})} initialContent={data?.data?.content} />}
           
            
            {/* <Suspense fallback={<p>Loading...</p>}>
        <CodeBlock codeString={code} language="python" />
        </Suspense> */}
          </div>
        </div>
      ) : (
        <DocumentSkeleton />
      )}
    </>
  );
};

export default Document;
