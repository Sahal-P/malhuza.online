import { MenuIcon } from "lucide-react";
import { Suspense, lazy } from "react";
const Title = lazy(() => import("./Title"));

import { useGetDocument, useSelectedDocument } from "@/hooks/useDocuments";
import Banner from "./Banner";
import Menu from "./Menu";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface NavbarProps {
  Id: string;
  isCollapsed: boolean;
  onResetWidth: () => void;
}
const TitleSkeleton = () => {
  return <Skeleton className="h-6 w-16 rounded-md" />;
};

const NavBarSkeleton = () => {
  return (
    <div className="flex items-center justify-between w-full ">
      <TitleSkeleton />
      <div className="flex items-center gap-x-2">
        <Menu.Skeleton />
      </div>
    </div>
  );
};

const Navbar = ({ Id, isCollapsed, onResetWidth }: NavbarProps) => {
  const { isLoading, isFetching } = useGetDocument({
    id: Id,
    filter_type: "ById",
  });
  const { document, setLoading } = useSelectedDocument();
  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching]);

  return (
    <>
      <nav className="bg-background dark:bg-document_bg px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            onClick={onResetWidth}
            role="button"
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        {isLoading || isFetching ? (
          <NavBarSkeleton />
        ) : (
          <div className="flex items-center justify-between w-full ">
            <Suspense fallback={<TitleSkeleton />}>
              <Title initial_data={document} />
            </Suspense>
            <div className="flex items-center gap-x-2">
              <Menu documentId={document?.id} />
            </div>
          </div>
        )}
      </nav>
      {document?.is_archived && (
        <Banner documentId={document.id} isCollapsed={isCollapsed} />
      )}
    </>
  );
};

export default Navbar;
