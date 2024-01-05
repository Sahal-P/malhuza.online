import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import useDocumentArchive from "@/hooks/useArchiveRestore";
import { useUser } from "./UserProvider";
import { ARCHIVE } from "@/types/constant";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  documentId?: string;
}

const Menu = ({ documentId }: MenuProps) => {
  const { user } = useUser();

  const { mutate: documentArchiveMutate } =
    useDocumentArchive(ARCHIVE);

  const onArchive = () => {
    if (!documentId) return
    documentArchiveMutate({ id: documentId, type: ARCHIVE });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'sm'} variant={'ghost'} aria-label="content menu" >
            <MoreHorizontal className="h-6 w-6"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 dark:bg-sidebar" align="end" alignOffset={8} forceMount>
        <DropdownMenuItem onClick={onArchive}>
            <Trash className="h-4 w-4 mr-2 text-rose-500"/>
            Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
            Last edited by: {user?.username}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-4 w-10 "/>
    )
}

export default Menu;
