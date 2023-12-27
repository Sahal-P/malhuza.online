import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelectedDocument } from "@/hooks/useDocuments";
import useUpdateDocument from "@/hooks/useUpdateDocument";
import { DEFAULT_TITLE } from "@/types/constant";
import { Document } from "@/types/document";
import { Emoji } from "emoji-picker-react";
import { FileIcon } from "lucide-react";
import React, { useRef, useState } from "react";

interface TitleProps {
  initialData: Document;
}

const Title = ({ initialData }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialData?.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);
  const { setTitleRename, setDocumentTitle } = useSelectedDocument();
  const { mutate: update, isSuccess } = useUpdateDocument();
  const enableInput = () => {
    setTitle(initialData?.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current?.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
    if (isSuccess) {
      setDocumentTitle(title)
      setTitleRename(title);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({ id: initialData?.id, title: event.target.value || DEFAULT_TITLE });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };
  return (
    <div className="flex items-center gap-x-1 ">
      {initialData?.icon ? (
        <p className="shrink-0 h-[18px] text-muted-foreground " >
            <Emoji unified={initialData.icon} size={18}/>
        </p>
      ) : (
        <p>
          <FileIcon className="shrink-0 h-[18px] text-muted-foreground" />
        </p>
      )}
      {isEditing ? (
        <Input
          ref={inputRef}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant={"ghost"}
          size={"sm"}
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};



export default Title;
