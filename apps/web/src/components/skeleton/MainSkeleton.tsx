import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

interface MainSkeletonProps {}

const ItemSkeleton = ({ main }: { main?: boolean }) => {
  if (main) {
    return (
      <div
        style={{
          paddingLeft: "12px",
        }}
        className="flex flex-col gap-x-2 pt-[30px] ml-8"
      >
        <Skeleton className="h-8 w-[80%] mb-8" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
    );
  }
  return (
    <div
      style={{
        paddingLeft: "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-[10%]" />
      <Skeleton className="h-4 w-[60%]" />
    </div>
  );
};

export const ContentSkeleton = () => {
  return (
    <main className="flex-1 h-full overflow-y-auto bg-[#ffffff] dark:bg-document_bg">
      {/* <div className="w-full h-full  flex justify-center items-center z-[9999999999]">
<Spinner size={"lg"}/>
</div> */}
      <div className="">
        <ItemSkeleton main={true} />
      </div>
    </main>
  );
};

const MainSkeleton: FC<MainSkeletonProps> = () => {
  return (
    <div className="h-screen flex dark:bg-[#1F1F1F] ">
      <>
        <aside className="group/sidebar h-full bg-secondary overflow-y-auto font-mplus font-medium relative flex w-60 flex-col z-[99999] bg-[#fbfbfa] text-[#9a9995] dark:bg-sidebar dark:text-[#898989]">
          <div className="mt-2">
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
          </div>
          <div className="mt-4">
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
          </div>
        </aside>
      </>
      <ContentSkeleton />
    </div>
  );
};

export default MainSkeleton;
