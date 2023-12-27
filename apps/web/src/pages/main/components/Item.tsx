import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import React from "react";
import { useUser } from "./UserProvider";
import { Emoji } from "emoji-picker-react";

interface ItemProps {
  id?: string;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  onCreate?: (id: string) => void;
  onArchive?: (id: string) => void;
}

const Item = ({
  id,
  documentIcon,
  active,
  expanded,
  level = 0,
  onExpand,
  isSearch,
  label,
  onClick,
  icon: Icon,
  onCreate,
  onArchive,
}: ItemProps) => {
  const {user} = useUser();

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreateHandle = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!id) return;
    onCreate?.(id);
  };
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 hover:dark:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">
            <Emoji unified={documentIcon} size={18}/>
        </div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium text-muted-foreground opacity-100">
          <span className="text-xs">Ctrl +</span>k
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
            <div role="button" className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground"/>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
            <DropdownMenuItem onClick={() => onArchive?.(id)} >
              <Trash className="h-4 w-4 mr-2"/>
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <div className="text-xs text-muted-foreground p-2">Last edited by: {user?.username}</div>
          </DropdownMenuContent>
        </DropdownMenu>
          <div
            role="button"
            className={cn("opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600", level===6 ? 'hidden' : 'block')}
            onClick={onCreateHandle}
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
