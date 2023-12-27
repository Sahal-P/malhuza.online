import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { useSelectedDocument } from "@/hooks/useDocuments";
import { useCoverImage } from "@/hooks/useS3FileUpload";
import useUpdateDocument from "@/hooks/useUpdateDocument";
import { cn } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import { FC } from "react";

interface CoverProps {
  url?: string | null;
  blurhash?: string | null;
  preview?: boolean;
}

const Cover: FC<CoverProps> = ({ url, blurhash, preview }) => {
  const { setTitleRename, setDocumentCoverImage, document } = useSelectedDocument();
  const coverImage = useCoverImage();
  const { mutateAsync: updateCoverImage } = useUpdateDocument();

  const onRemoveCoverImage = async () => {
    setDocumentCoverImage(null)
    const {status} = await updateCoverImage({coverImage: null, id: document.id , coverImageBlurHash: null})
    if (status === 200) {
        setTitleRename(document.id);
      }
  }
  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && (
        <Image
          src={url}
          blurhash={blurhash}
          alt="Cover"
          className="object-cover h-[35vh]"
          width={"100%"}
          height={"35vh"}
        />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemoveCoverImage}
            className="text-muted-foreground text-xs"
            variant={"outline"}
            size={"sm"}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;
