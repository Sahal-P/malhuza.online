import IconPicker from "@/components/common/IconPicker";
import { Button } from "@/components/ui/button";
import { Document } from "@/types/document";
import { ImageIcon, Smile, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import React, { ElementRef, FC, useRef, useState } from "react";
import useUpdateDocument from "@/hooks/useUpdateDocument";
import { Emoji } from "emoji-picker-react";
import { DEFAULT_TITLE } from "@/types/constant";
import { useSelectedDocument } from "@/hooks/useDocuments";
import { useCoverImage } from "@/hooks/useS3FileUpload";
// import encodeImageToBlurhash, { readFileAsDataUrl } from "@/utils/encodeBlurHash";

interface ToolbarProps {
  initialData: Document;
  preview?: boolean;
}

const Toolbar: FC<ToolbarProps> = ({ initialData, preview }) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEdititng, setIsEdititng] = useState(false);
  const [title, setTitle] = useState(initialData.title);
  const { setTitleRename, setDocumentTitle, setDocumentIcon } =
    useSelectedDocument();
  const coverImage = useCoverImage()
  const {
    mutate: update,
    isSuccess,
    mutateAsync: updateAsync,
  } = useUpdateDocument();
  
  // const handleAddCoverClick = () => {
  //   // Trigger the file input when the button is clicked
  //   inputFileRef.current?.click();
  // };

  

  const enableInput = () => {
    if (preview) return;
    setIsEdititng(true);
    setTimeout(() => {
      setTitle(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEdititng(false);
    if (isSuccess) {
      setTitleRename(title);
      setDocumentTitle(title || DEFAULT_TITLE);
    }
  };

  const onInput = (value: string) => {
    setTitle(value);
    update({ id: initialData?.id, title: value || DEFAULT_TITLE });
    // update
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = async (icon: string) => {
    setDocumentIcon(icon);
    const updated = await updateAsync({ id: initialData?.id, icon: icon });
    if (updated.status === 200) {
      setTitleRename(icon);
    }
  };

  const onRemoveIcon = async () => {
    setDocumentIcon(null);
    const updated = await updateAsync({ id: initialData?.id, icon: null });
    if (updated.status === 200) {
      setTitleRename(initialData?.id);
    }
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect} >
            <p className="text-6xl hover:opacity-75 transition">
              <Emoji unified={initialData.icon} size={60} />
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant={"outline"}
            size={"icon"}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-0  group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect} >
            <Button
              className="text-muted-foreground text-xs"
              variant={"outline"}
              size={"sm"}
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEdititng && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={title}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  )
};

export default Toolbar;
