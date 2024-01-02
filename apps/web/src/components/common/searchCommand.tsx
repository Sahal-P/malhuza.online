import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useDocuments from "@/hooks/useDocuments";
import { useSearch } from "@/hooks/useSearch";
import { useUser } from "@/pages/main/components/UserProvider";
import { SidebarDocument } from "@/types/document";
import { Emoji } from "emoji-picker-react";
import { File } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchCommand = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { data: documents, refetch } = useDocuments<SidebarDocument>({});
  const [isMounted, setIsMounted] = useState(false);
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);
  
  useEffect(() => {
    refetch();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === "K" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, [toggle]);

  const onSelect = (id: string) => {
    navigate(`/documents/${id}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }
  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.username}'s Notes...`} />
      <CommandList className="dark:bg-document_bg scrollbar-thin scrollbar-thumb-secondary">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((document) => (
            <CommandItem
              key={document.id}
              value={`${document.title}`}
              title={document.title}
              onSelect={() => onSelect(document.id)}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">
                  <Emoji unified={document.icon} size={18} />
                </p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
